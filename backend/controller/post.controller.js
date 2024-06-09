import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/posts.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { getLocalPath, getMongoosePaginationOptions, getStaticFilePath, removeLocalFile } from "../utils/helper.js";
import { MAXIMUM_POST_IMAGE_COUNT } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { Bookmark } from "../models/bookmark.model.js";
import { uploadImage } from "../utils/cloudinary.js";

const postCommonAggregation = (req) => {
  return [
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "postId",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "postId",
        as: "isLiked",
        pipeline: [
          {
            $match: {
              likedBy: new mongoose.Types.ObjectId(req.user?._id),
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "bookmarks",
        localField: "_id",
        foreignField: "postId",
        as: "isBookmarked",
        pipeline: [
          {
            $match: {
              bookmarkedBy: new mongoose.Types.ObjectId(req.user?._id),
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "profiles",
        localField: "author",
        foreignField: "owner",
        as: "author",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "account",
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
          { $addFields: { account: { $first: "$account" } } },
        ],
      },
    },
    {
      $addFields: {
        author: { $first: "$author" },
        likes: { $size: "$likes" },
        comments: { $size: "$comments" },
        isLiked: {
          $cond: {
            if: {
              $gte: [
                {
                  // if the isLiked key has document in it
                  $size: "$isLiked",
                },
                1,
              ],
            },
            then: true,
            else: false,
          },
        },
        isBookmarked: {
          $cond: {
            if: {
              $gte: [
                {
                  // if the isBookmarked key has document in it
                  $size: "$isBookmarked",
                },
                1,
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },
  ];
};

const createPost = asyncHandler(async (req, res) => {

  const { content, tags } = req.body;

  const images =
    req.files?.images && req.files.images?.length
      ? await Promise.all(req.files.images.map(async (image) => {
          const imageUrl = getStaticFilePath(req, image.filename);
          const imageLocalPath = getLocalPath(image.filename);
          const url = await uploadImage(imageLocalPath, image.filename)
          removeLocalFile(imageLocalPath);
          return { url: url, localPath: imageLocalPath };
        }))
      : [];
  const author = req.user._id;
  const post = await Post.create({
    content,
    tags: tags || [],
    author,
    images,
  });

  if (!post) {
    throw new ApiError(500, "Error while creating a post");
  }

  const createdPost = await Post.aggregate([
    {
      $match: {
        _id: post._id,
      },
    },
    ...postCommonAggregation(req),
  ]);

  return res
    .status(201)
    .json(new ApiResponse(201, createdPost[0], "Post created successfully"));
});

const updatePost = asyncHandler(async (req, res) => {
  const { content, tags } = req.body;
  const { postId } = req.params;
  const post = await Post.findOne({
    _id: new mongoose.Types.ObjectId(postId),
    author: req.user?._id,
  });

  if (!post) {
    throw new ApiError(404, "Post does not exist");
  }

  /**
   * @type {{ url: string; localPath: string; }[]}
   */
  let images =
    // If user has uploaded new images then we have to create an object with new url and local path in the array format
    req.files?.images && req.files.images?.length
      ? req.files.images.map((image) => {
          const imageUrl = getStaticFilePath(req, image.filename);
          const imageLocalPath = getLocalPath(image.filename);
          return { url: imageUrl, localPath: imageLocalPath };
        })
      : []; // if there are no new images uploaded we want to keep an empty array

  const existedImages = post.images.length; // total images already present in the post
  const newImages = images.length; // Newly uploaded images
  const totalImages = existedImages + newImages;

  if (totalImages > MAXIMUM_POST_IMAGE_COUNT) {
    // We want user to only add at max 6 images
    // If the existing images + new images count exceeds 6
    // We want to throw an error

    // Before throwing an error we need to do some cleanup

    // remove the  newly uploaded images by multer as there is not updation happening
    images?.map((img) => removeLocalFile(img.localPath));

    throw new ApiError(
      400,
      "Maximum " +
      MAXIMUM_POST_IMAGE_COUNT +
        " images are allowed for a post. There are already " +
        existedImages +
        " images attached to the post."
    );
  }

  // If above checks are passed. We need to merge the existing images and newly uploaded images
  images = [...post.images, ...images];
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $set: {
        content,
        tags,
        images,
      },
    },
    {
      new: true,
    }
  );

  const aggregatedPost = await Post.aggregate([
    {
      $match: {
        _id: updatedPost._id,
      },
    },
    ...postCommonAggregation(req),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, aggregatedPost[0], "Post updated successfully"));
});

const removePostImage = asyncHandler(async (req, res) => {
  const { postId, imageId } = req.params;

  const post = await Post.findOne({
    _id: new mongoose.Types.ObjectId(postId),
    author: req.user?._id,
  });

  // check for post existence
  if (!post) {
    throw new ApiError(404, "Post does not exist");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $pull: {
        // pull an item from images with _id equals to imageId
        images: {
          _id: new mongoose.Types.ObjectId(imageId),
        },
      },
    },
    { new: true }
  );

  // retrieve the file object which is being removed
  const removedImage = post.images?.find((image) => {
    return image._id.toString() === imageId;
  });

  if (removedImage) {
    // remove the file from file system as well
    removeLocalFile(removedImage.localPath);
  }

  const aggregatedPost = await Post.aggregate([
    {
      $match: {
        _id: updatedPost._id,
      },
    },
    ...postCommonAggregation(req),
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, aggregatedPost[0], "Post image removed successfully")
    );
});

const getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const postAggregation = Post.aggregate([...postCommonAggregation(req)]);

  const posts = await Post.aggregatePaginate(
    postAggregation,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalPosts",
        docs: "posts",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

const getPostsByUsername = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { username } = req.params;

  const user = await User.findOne({
    username: username.toLowerCase(),
  });

  if (!user) {
    throw new ApiError(
      404,
      "User with username '" + username + "' does not exist"
    );
  }

  const userId = user._id;

  const postAggregation = Post.aggregate([
    {
      $match: {
        author: new mongoose.Types.ObjectId(userId),
      },
    },
    ...postCommonAggregation(req),
  ]);

  const posts = await Post.aggregatePaginate(
    postAggregation,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalPosts",
        docs: "posts",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "User's posts fetched successfully"));
});

const getMyPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const postAggregation = Post.aggregate([
    {
      $match: {
        author: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    ...postCommonAggregation(req),
  ]);

  const posts = await Post.aggregatePaginate(
    postAggregation,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalPosts",
        docs: "posts",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "My posts fetched successfully"));
});

const getBookMarkedPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const postAggregation = Bookmark.aggregate([
    {
      $match: {
        bookmarkedBy: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "postId",
        foreignField: "_id",
        as: "post",
        pipeline: postCommonAggregation(req), // after lookup we need to structure the posts same as other post apis
      },
    },
    {
      $addFields: {
        post: { $first: "$post" },
      },
    },
    {
      $project: {
        _id: 0,
        post: 1,
      },
    },
    {
      $replaceRoot: {
        newRoot: "$post",
      },
    },
  ]);

  const posts = await Bookmark.aggregatePaginate(
    postAggregation,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalBookmarkedPosts",
        docs: "bookmarkedPosts",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Bookmarked posts fetched successfully"));
});

const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(postId),
      },
    },
    ...postCommonAggregation(req),
  ]);

  if (!post[0]) {
    throw new ApiError(404, "Post does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post[0], "Post fetched successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findOneAndDelete({
    _id: postId,
    author: req.user._id,
  });

  if (!post) {
    throw new ApiError(404, "Post does not exist");
  }

  const postImages = [...(post.images || [])];

  postImages.map((image) => {
    // remove images associated with the post that is being deleted
    removeLocalFile(image.localPath);
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

const getPostsByTag = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { tag } = req.params;

  const postAggregation = Post.aggregate([
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
    ...postCommonAggregation(req),
  ]);

  const posts = await Post.aggregatePaginate(
    postAggregation,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalPosts",
        docs: "posts",
      },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, posts, `Posts with tag #${tag} fetched successfully`)
    );
});



export {
  createPost,
  deletePost,
  getAllPosts,
  getBookMarkedPosts,
  getMyPosts,
  getPostById,
  getPostsByUsername,
  removePostImage,
  updatePost,
  getPostsByTag,
};
