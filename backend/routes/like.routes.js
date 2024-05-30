import { Router } from "express";
import {
  likeDislikeComment,
  likeDislikePost,
} from "../controller/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";

const router = Router();

router
  .route("/post/:postId")
  .post(verifyJWT, mongoIdPathVariableValidator("postId"), validate, likeDislikePost);

router
  .route("/comment/:commentId")
  .post(
    verifyJWT,
    mongoIdPathVariableValidator("commentId"),
    validate,
    likeDislikeComment
  );

export default router;