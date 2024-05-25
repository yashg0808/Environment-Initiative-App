import { body } from "express-validator";

export const createPostValidator = () => {
  return [
    body("content").trim().notEmpty().withMessage("Post content is required"),
    body("tags")
      .optional()
      .isArray()
      .withMessage("Tags field must be an array"),
  ];
};

export const usernamePathVariableValidator = () => {
    return [
      param("username").toLowerCase().notEmpty().withMessage("Invalid username"),
    ];
  };
  
