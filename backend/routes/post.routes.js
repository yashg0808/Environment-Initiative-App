import { Router } from "express";
import { getLoggedInUserOrIgnore, verifyJWT } from "../middlewares/auth.middleware.js";
import { createPost, deletePost, getAllPosts, getMyPosts, getPostById, getPostsByTag, getPostsByUsername, removePostImage, updatePost } from "../controller/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createPostValidator, tagPathVariableValidator, updatePostValidator, usernamePathVariableValidator } from "../validators/post.validator.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
import { MAXIMUM_POST_IMAGE_COUNT } from "../constants.js";


const router = Router();

router.route("/")
    .get(getLoggedInUserOrIgnore, getAllPosts)
    .post(verifyJWT,(req,res,next)=>{
        console.log("Inside Post Route")
        console.log("Req Body:",req.body)
        console.log("Req Files:",req.files)
        next()
    } ,upload.fields([{ name: "images", maxCount: MAXIMUM_POST_IMAGE_COUNT }]), createPostValidator(), validate, createPost)


router.route("/get/my").get(verifyJWT, getMyPosts);

router
    .route("/get/u/:username")
    .get(
        getLoggedInUserOrIgnore,
        usernamePathVariableValidator(),
        validate,
        getPostsByUsername
    );

router
    .route("/get/t/:tag")
    .get(
        getLoggedInUserOrIgnore,
        tagPathVariableValidator(),
        validate,
        getPostsByTag
    );

router
    .route("/:postId")
    .get(
        getLoggedInUserOrIgnore,
        mongoIdPathVariableValidator("postId"),
        validate,
        getPostById
    )
    .patch(
        verifyJWT,
        upload.fields([
            { name: "images", maxCount: MAXIMUM_POST_IMAGE_COUNT },
        ]),
        mongoIdPathVariableValidator("postId"),
        updatePostValidator(),
        validate,
        updatePost
    )
    .delete(verifyJWT, mongoIdPathVariableValidator("postId"), validate, deletePost);

router
    .route("/remove/image/:postId/:imageId")
    .patch(
        verifyJWT,
        mongoIdPathVariableValidator("postId"),
        mongoIdPathVariableValidator("imageId"),
        validate,
        removePostImage
    );

export default router;