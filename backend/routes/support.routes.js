import { Router } from "express";
import {
  supportInitiative,
  getSupportersListByInitiativeId,
} from "../controller/supporterController.js";
import {
  verifyJWT,
  getLoggedInUserOrIgnore,
} from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
import { supportValidator } from "../validators/support.validators.js";

const router = Router();

router
  .route("/:initiativeId/support")
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
