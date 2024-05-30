import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { bookmarkUnBookmarkPost } from "../controller/bookmark.controller.js";
import { validate } from "../validators/validate.js";
import { getBookMarkedPosts } from "../controller/post.controller.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getBookMarkedPosts); // getBookMarkedPosts controller is present in posts controller due to utility function dependency

router
  .route("/:postId")
  .post(mongoIdPathVariableValidator("postId"), validate, bookmarkUnBookmarkPost);

export default router;