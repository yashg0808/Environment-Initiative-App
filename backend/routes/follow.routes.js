import { Router } from "express";
import {
  followUnFollowUser,
  getFollowersListByUserName,
  getFollowingListByUserName,
} from "../controller/follow.controller.js";
import {
  getLoggedInUserOrIgnore,
  verifyJWT,
} from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";

const router = Router();

router
  .route("/:toBeFollowedUserId")
  .post(verifyJWT, mongoIdPathVariableValidator("toBeFollowedUserId"), validate, followUnFollowUser);

router
  .route("/list/followers/:username")
  .get(getLoggedInUserOrIgnore, getFollowersListByUserName);

router
  .route("/list/following/:username")
  .get(getLoggedInUserOrIgnore, getFollowingListByUserName);

export default router;