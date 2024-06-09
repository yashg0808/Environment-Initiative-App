import mongoose from "mongoose";
import { Initiative } from "../models/initiative.model.js";

const createInitiative = asyncHandler(async (req, res) => {
  const { title, description, location, goals, tags, status } = req.body;

  const images =
    req.files?.images && req.files.images?.length
      ? req.files.images.map((image) => {
          const imageUrl = getStaticFilePath(req, image.filename);
          const imageLocalPath = getLocalPath(image.filename);
          return { url: imageUrl, localPath: imageLocalPath };
        })
      : [];

  const createdBy = req.user._id;
  console.log(createdBy);

  const initiative = await Initiative.create({
    title,
    description,
    location,
    goals,
    tags: tags||[],
    status,
  });

  if (!Initiative) {
    throw new ApiError(500, "Error while creating an initiative.");
  }
  console.log(initiative);

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
