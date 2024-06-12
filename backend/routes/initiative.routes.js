import { Router } from "express";
import {
  getLoggedInUserOrIgnore,
  verifyJWT,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createInitiative,
  deleteInitiative,
  getAllInitiatives,
  getMyInitiatives,
  getInitiativeById,
  getInitiativesByTag,
  updateInitiative,
  removeInitiativeImage,
} from "../controller/initiative.controller.js";
import {
  createInitiativeValidator,
  tagPathVariableValidator,
  updateInitiativeValidator,
} from "../validators/initiative.validator.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
import { MAXIMUM_INITIATIVE_IMAGE_COUNT } from "../constants.js";

const router = Router();

router
  .route("/")
  .get(getLoggedInUserOrIgnore, getAllInitiatives)
  .post(
    verifyJWT,
    upload.fields([
      { name: "images", maxCount: MAXIMUM_INITIATIVE_IMAGE_COUNT },
    ]),
    createInitiativeValidator(),
    validate,
    createInitiative
  );

router
  .route("/get/my")
  .get(verifyJWT, getMyInitiatives);

router
  .route("/get/t/:tag")
  .get(
    getLoggedInUserOrIgnore,
    tagPathVariableValidator(),
    validate,
    getInitiativesByTag
  );

router
  .route("/:initiativeId")
  .get(
    getLoggedInUserOrIgnore,
    mongoIdPathVariableValidator("initiativeId"),
    validate,
    getInitiativeById
  )
  .patch(
    verifyJWT,
    upload.fields([
      { name: "images", maxCount: MAXIMUM_INITIATIVE_IMAGE_COUNT },
    ]),
    mongoIdPathVariableValidator("initiativeId"),
    updateInitiativeValidator(),
    validate,
    updateInitiative
  )
  .delete(
    verifyJWT,
    mongoIdPathVariableValidator("initiativeId"),
    validate,
    deleteInitiative
  );

router
  .route("/remove/image/:initiativeId/:imageId")
  .patch(
    verifyJWT,
    mongoIdPathVariableValidator("initiativeId"),
    mongoIdPathVariableValidator("imageId"),
    validate,
    removeInitiativeImage
  );


export default router;
