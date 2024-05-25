import mongoose, { Schema } from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        coverImage: {
            type: {
              url: String,
              localPath: String,
            },
            default: {
              url: `https://via.placeholder.com/800x450.png`,
              localPath: "",
            },
        },
        name: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        interests:{
            type: [String],
            default: [],
        },
        phoneNumber: {
            type: String,
            default: "",
        },
        location: {
            type: String,
            default: "",
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);