import { body, param } from "express-validator";

export const updateProfileValidator = () => {
    return [
        body("name").optional().trim().notEmpty().withMessage("Name is required"),
        body("bio").optional().trim().notEmpty().withMessage("Bio is required"),
        body("location").optional().trim().notEmpty().withMessage("Location is required"),
        body("phoneNumber").optional().trim().notEmpty().withMessage("Phone number is required").isNumeric().withMessage("Phone number is invalid.").isLength({ min: 10, max: 10 }).withMessage("Phone number is invalid. It must be 10 digits long."),
    ];
};

export const getProfileByUserNameValidator = () => {
    return [
      param("username").trim().notEmpty().withMessage("Username is required"),
    ];
};