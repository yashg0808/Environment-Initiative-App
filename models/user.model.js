import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import { USER_TEMPORARY_TOKEN_EXPIRY } from "../constants.js";
import { Profile } from "./profile.model.js";
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        avatar: {
            type: {
                url: String,
                localPath: String
            },
            default: {
                url: `https://via.placeholder.com/200x200.png`,
                localPath: "",
            },
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpiry: {
            type: Date,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpiry: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.post("save", async function (user, next) {
    const profile = await Profile.findOne({ owner: user._id });
    if (!profile) { // setup profile for the user
        await Profile.create({ owner: user._id, name: user.username });
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateTemporaryToken = function () { // For email verification, forgot password etc.
    //for email verification unHashedToken should go into the user's mail
    const unHashedToken = crypto.randomBytes(20).toString("hex");
    // This should stay in the DB to compare at the time of verification
    const hashedToken = crypto
      .createHash("sha256")
      .update(unHashedToken)
      .digest("hex");
    // This is the expiry time for the token (20 minutes)
    const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;
    return { unHashedToken, hashedToken, tokenExpiry };
  };

export const User = mongoose.model("User", userSchema);