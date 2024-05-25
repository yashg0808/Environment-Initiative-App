import { Router } from "express";
import { changeCurrentPassword, forgotPasswordRequest, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, resendEmailVerification, resetForgottenPassword, updateUserAvatar, verifyEmail } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { userChangeCurrentPasswordValidator, userForgotPasswordValidator, userLoginValidator, userRegisterValidator, userResetForgottenPasswordValidator } from "../validators/user.validator.js";
import { validate } from "../validators/validate.js";

const router = Router();

// Unsecured routes
router.route("/register").post(userRegisterValidator(),validate, registerUser);
router.route("/login").post(userLoginValidator(),validate, loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/forgot-password").post(userForgotPasswordValidator(),validate,forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(userResetForgottenPasswordValidator(), validate, resetForgottenPassword);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT,userChangeCurrentPasswordValidator(), validate,changeCurrentPassword);
router.route("/resend-email-verification").post(verifyJWT, resendEmailVerification);

export default router;