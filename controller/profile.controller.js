import { Profile } from "../models/profile.model.js";

const getMyProfile = asyncHandler(async (req, res) => {
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
