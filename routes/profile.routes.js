import { Router } from "express";
import { getLoggedInUserOrIgnore, verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { upload } from "../middlewares/multer.middleware.js";
import { updateProfile } from "../controller/profile.controller.js";
import { updateSocialProfileValidator } from "../validators/profile.validator.js";

const router = Router();

// This will be a public route
// router.route("/u/:username").get(
//     getLoggedInUserOrIgnore, // hover over the middleware to know more
//     getProfileByUserNameValidator(),
//     validate,
// );

router.use(verifyJWT);
router.route("/")
    .get()
    .patch(updateSocialProfileValidator(),validate, updateProfile);
router.route("/my-initiatives").get()
router.route("/cover-image").patch(upload.single("coverImage"));
export default router;
