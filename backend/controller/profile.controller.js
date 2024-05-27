import mongoose from "mongoose";
import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getLocalPath, getStaticFilePath, removeLocalFile } from "../utils/helper.js";

const getUserProfile = async (userId, req) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }
    let profile = await Profile.aggregate([
        {
            $match: {
              owner: new mongoose.Types.ObjectId(userId),
            },
        },
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
                    username: 1,
                    email: 1,
                    isEmailVerified: 1,
                  },
                },
              ],
            },
        },
        {
            $lookup: {
              from: "follows",
              localField: "owner",
              foreignField: "followerId",
              as: "following", // users that are followed by current user
            },
        },
        {
            $lookup: {
              from: "follows",
              localField: "owner",
              foreignField: "followeeId",
              as: "followedBy", // users that are following the current user
            },
        },
        {
            $addFields: {
              account: { $first: "$account" },
              followersCount: { $size: "$followedBy" },
              followingCount: { $size: "$following" },
            },
        },
        {
            $project: {
              followedBy: 0,
              following: 0,
            },
        },
    ]);
    let isFollowing = false;
    if (req.user?._id && req.user?._id?.toString() !== userId.toString()) {
        // Check if there is a logged in user and logged in user is NOT same as the profile that is being loaded
        // In such case we will check if the logged in user follows the loaded profile user
        const followInstance = await Follow.findOne({
          followerId: req.user?._id, // logged in user. If this is null `isFollowing` will be false
          followeeId: userId,
        });
        isFollowing = followInstance ? true : false;
    }
    const userProfile = profile[0];
    if (!userProfile) {
        throw new ApiError(404, "User profile does not exist");
    }
    return { ...userProfile, isFollowing };
}

export const getMyProfile = asyncHandler(async (req, res) => {
    let profile = await Profile.findOne({
        owner: req.user._id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "User profile fetched successfully"));
});

export const updateProfile = asyncHandler(async (req, res) => {
    const { name, bio, interests, phoneNumber, location  } = req.body;
    const profile = await Profile.findOneAndUpdate(
        {
            owner: req.user._id,
        },
        {
            $set: {
                name,
                bio,
                interests,
                phoneNumber,
                location
            },
        },
        { new: true }
    );
    return res
        .status(200)
        .json(new ApiResponse(200, profile, "User profile updated successfully"));
});


// Public route
export const getProfileByUserName = asyncHandler(async (req, res) => {
    const { username } = req.params;
  
    const user = await User.findOne({ username });
  
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }
  
    const userProfile = await getUserProfile(user._id, req);
  
    return res
      .status(200)
      .json(
        new ApiResponse(200, userProfile, "User profile fetched successfully")
      );
});

export const updateCoverImage = asyncHandler(async (req, res) => {
    // Check if user has uploaded a cover image
    if (!req.file?.filename) {
      throw new ApiError(400, "Cover image is required");
    }
    const coverImageUrl = getStaticFilePath(req, req.file?.filename);
    const coverImageLocalPath = getLocalPath(req.file?.filename);
    const profile = await Profile.findOne({
      owner: req.user._id,
    });
    let updatedProfile = await Profile.findOneAndUpdate(
      {
        owner: req.user._id,
      },
      {
        $set: {
          coverImage: {
            url: coverImageUrl,
            localPath: coverImageLocalPath,
          },
        },
      },
      { new: true }
    );
  
    // remove the old cover image
    removeLocalFile(profile.coverImage.localPath);
    updatedProfile = await getUserProfile(req.user._id, req);
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedProfile, "Cover image updated successfully")
      );
  });