import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { Post } from "../models/posts.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const likeDislikePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
    
  // Check for post existence
  if (!post) {
    throw new ApiError(404, "Post does not exist");
  }

  // See if user has already liked the post
  const isAlreadyLiked = await Like.findOne({
    postId,
    likedBy: req.user?._id,
  });

  if (isAlreadyLiked) {
    // if already liked, dislike it by removing the record from the DB
    await Like.findOneAndDelete({
      postId,
      likedBy: req.user?._id,
    });
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          isLiked: false,
        },
        "Unliked successfully"
      )
    );
  } else {
    // if not liked, like it by adding the record from the DB
    await Like.create({
      postId,
      likedBy: req.user?._id,
    });
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          isLiked: true,
        },
        "Liked successfully"
      )
    );
  }
});

const likeDislikeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);

  // Check for comment existence
  if (!comment) {
    throw new ApiError(404, "Comment does not exist");
  }

  // See if user has already liked the comment
  const isAlreadyLiked = await Like.findOne({
    commentId,
    likedBy: req.user?._id,
  });

  if (isAlreadyLiked) {
    // if already liked, dislike it by removing the record from the DB
    await Like.findOneAndDelete({
      commentId,
      likedBy: req.user?._id,
    });
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          isLiked: false,
        },
        "Unliked successfully"
      )
    );
  } else {
    // if not liked, like it by adding the record from the DB
    await Like.create({
      commentId,
      likedBy: req.user?._id,
    });
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          isLiked: true,
        },
        "Liked successfully"
      )
    );
  }
});

export { likeDislikePost, likeDislikeComment };