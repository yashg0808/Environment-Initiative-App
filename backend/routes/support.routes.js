import { Router } from "express";
import {
  supportInitiative,
  getSupportersListByInitiativeId,
} from "../controller/support.controller.js";
import {
  verifyJWT,
  getLoggedInUserOrIgnore,
} from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
import { supportValidator } from "../validators/support.validator.js";

const router = Router();

router
  .route("/:initiativeId")
  .post(
    verifyJWT,
    mongoIdPathVariableValidator("initiativeId"),
    supportValidator,
    validate,
    supportInitiative
  );

router
  .route("/:initiativeId/supporters")
  .get(
    getLoggedInUserOrIgnore,
    mongoIdPathVariableValidator("initiativeId"),
    validate,
    getSupportersListByInitiativeId
  );

export default router;
