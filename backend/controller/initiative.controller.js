import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Initiative } from "../models/initiative.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { getLocalPath, getMongoosePaginationOptions, getStaticFilePath, removeLocalFile } from "../utils/helper.js";
import { MAXIMUM_INITIATIVE_IMAGE_COUNT } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadImage } from "../utils/cloudinary.js";

const initiativeCommonAggregation = (req) => {
  return [
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "creator",
        pipeline: [
          {
            $project: {
              avatar: 1,
              email: 1,
              username: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        creator: { $first: "$creator" },
      },
    },
  ];
};

const createInitiative = asyncHandler(async (req, res) => {
  const { title, description, location, goals, tags, status } = req.body;

  const images =
    req.files?.images && req.files.images.length
      ? await Promise.all(req.files.images.map(async (image) => {
          const imageUrl = getStaticFilePath(req, image.filename);
          const imageLocalPath = getLocalPath(image.filename);
          const url = await uploadImage(imageLocalPath, image.filename);
          removeLocalFile(imageLocalPath);
          return { url: url, description: image.filename };
        }))
      : [];

  const videos =
    req.files?.videos && req.files.videos.length
      ? req.files.videos.map((video) => ({
          url: getStaticFilePath(req, video.filename),
          description: video.filename,
        }))
      : [];

  const createdBy = req.user._id;

  const initiative = await Initiative.create({
    title,
    description,
    location,
    goals,
    tags: tags || [],
    status,
    createdBy,
    images,
    videos,
  });

  if (!initiative) {
    throw new ApiError(500, "Error while creating an initiative");
  }

  const createdInitiative = await Initiative.aggregate([
    {
      $match: {
        _id: initiative._id,
      },
    },
    ...initiativeCommonAggregation(req),
  ]);

  return res
    .status(201)
    .json(new ApiResponse(201, createdInitiative[0], "Initiative created successfully"));
});

const updateInitiative = asyncHandler(async (req, res) => {
  const { title, description, location, goals, tags, status } = req.body;
  const { initiativeId } = req.params;

  const initiative = await Initiative.findOne({
    _id: new mongoose.Types.ObjectId(initiativeId),
    createdBy: req.user._id,
  });

  if (!initiative) {
    throw new ApiError(404, "Initiative does not exist");
  }

  let images =
    req.files?.images && req.files.images.length
      ? await Promise.all(req.files.images.map(async (image) => {
          const imageUrl = getStaticFilePath(req, image.filename);
          const imageLocalPath = getLocalPath(image.filename);
          const url = await uploadImage(imageLocalPath, image.filename);
          removeLocalFile(imageLocalPath);
          return { url: url, description: image.filename };
        }))
      : [];

  const existedImages = initiative.images.length;
  const newImages = images.length;
  const totalImages = existedImages + newImages;

  if (totalImages > MAXIMUM_INITIATIVE_IMAGE_COUNT) {
    images.map((img) => removeLocalFile(img.localPath));
    throw new ApiError(
      400,
      `Maximum ${MAXIMUM_INITIATIVE_IMAGE_COUNT} images are allowed for an initiative. There are already ${existedImages} images attached to the initiative.`
    );
  }

  images = [...initiative.images, ...images];

  const updatedInitiative = await Initiative.findByIdAndUpdate(
    initiativeId,
    {
      $set: {
        title,
        description,
        location,
        goals,
        tags,
        status,
        images,
      },
    },
    { new: true }
  );

  const aggregatedInitiative = await Initiative.aggregate([
    {
      $match: {
        _id: updatedInitiative._id,
      },
    },
    ...initiativeCommonAggregation(req),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, aggregatedInitiative[0], "Initiative updated successfully"));
});

const removeInitiativeImage = asyncHandler(async (req, res) => {
  const { initiativeId, imageId } = req.params;

  const initiative = await Initiative.findOne({
    _id: new mongoose.Types.ObjectId(initiativeId),
    createdBy: req.user._id,
  });

  if (!initiative) {
    throw new ApiError(404, "Initiative does not exist");
  }

  const updatedInitiative = await Initiative.findByIdAndUpdate(
    initiativeId,
    {
      $pull: {
        images: {
          _id: new mongoose.Types.ObjectId(imageId),
        },
      },
    },
    { new: true }
  );

  const removedImage = initiative.images.find((image) => image._id.toString() === imageId);
  if (removedImage) {
    removeLocalFile(removedImage.localPath);
  }

  const aggregatedInitiative = await Initiative.aggregate([
    {
      $match: {
        _id: updatedInitiative._id,
      },
    },
    ...initiativeCommonAggregation(req),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, aggregatedInitiative[0], "Initiative image removed successfully"));
});

const getAllInitiatives = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const initiativeAggregation = Initiative.aggregate([...initiativeCommonAggregation(req)]);

  const initiatives = await Initiative.aggregatePaginate(
    initiativeAggregation,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalInitiatives",
        docs: "initiatives",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, initiatives, "Initiatives fetched successfully"));
});

const getMyInitiatives = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const initiativeAggregation = Initiative.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    ...initiativeCommonAggregation(req),
  ]);

  const initiatives = await Initiative.aggregatePaginate(
    initiativeAggregation,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalInitiatives",
        docs: "initiatives",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, initiatives, "My initiatives fetched successfully"));
});

const getInitiativeById = asyncHandler(async (req, res) => {
  const { initiativeId } = req.params;
  const initiative = await Initiative.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(initiativeId),
      },
    },
    ...initiativeCommonAggregation(req),
  ]);

  if (!initiative[0]) {
    throw new ApiError(404, "Initiative does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, initiative[0], "Initiative fetched successfully"));
});

const deleteInitiative = asyncHandler(async (req, res) => {
  const { initiativeId } = req.params;

  const initiative = await Initiative.findOneAndDelete({
    _id: initiativeId,
    createdBy: req.user._id,
  });

  if (!initiative) {
    throw new ApiError(404, "Initiative does not exist");
  }

  initiative.images.map((image) => {
    removeLocalFile(image.localPath);
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Initiative deleted successfully"));
});

const getInitiativesByTag = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { tag } = req.params;

  const initiativeAggregation = Initiative.aggregate([
    {
      $redact: {
        $cond: {
          if: {
            $in: [tag, "$tags"],
          },
          then: "$$KEEP",
          else: "$$PRUNE",
        },
      },
    },
    ...initiativeCommonAggregation(req),
  ]);

  const initiatives = await Initiative.aggregatePaginate(
    initiativeAggregation,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalInitiatives",
        docs: "initiatives",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, initiatives, `Initiatives with tag #${tag} fetched successfully`));
});

export {
  createInitiative,
  deleteInitiative,
  getAllInitiatives,
  getMyInitiatives,
  getInitiativeById,
  removeInitiativeImage,
  updateInitiative,
  getInitiativesByTag,
};
