import { body, param } from "express-validator";

const createInitiativeValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Initiative title is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Initiative description is required"),
    body("location").trim().notEmpty().withMessage("Location is required"),
    body("goals")
      .isArray({ min: 1 })
      .withMessage("At least one goal is required"),
    body("tags").optional().isArray().withMessage("Tags field must be an array"),
    body("status")
      .optional()
      .isIn(['planned', 'in-progress', 'completed'])
      .withMessage("Invalid status"),
    body("images").optional().isArray().withMessage("Images field must be an array"),
    body("videos").optional().isArray().withMessage("Videos field must be an array"),
  ];
};

const updateInitiativeValidator = () => {
  return [
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("description").optional().trim().notEmpty().withMessage("Description cannot be empty"),
    body("location").optional().trim().notEmpty().withMessage("Location cannot be empty"),
    body("goals").optional().isArray().withMessage("Goals field must be an array"),
    body("tags").optional().isArray().withMessage("Tags field must be an array"),
    body("status")
      .optional()
      .isIn(['planned', 'in-progress', 'completed'])
      .withMessage("Invalid status"),
    body("images").optional().isArray().withMessage("Images field must be an array"),
    body("videos").optional().isArray().withMessage("Videos field must be an array"),
  ];
};

const tagPathVariableValidator = () => {
  return [param("tag").notEmpty().withMessage("Tag is required")];
};

export {
  createInitiativeValidator,
  updateInitiativeValidator,
  tagPathVariableValidator,
};
