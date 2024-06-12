import { checkSchema } from "express-validator";

export const supportValidator = checkSchema({
  amount: {
    in: ["body"],
    isFloat: {
      options: { min: 1 },
      errorMessage: "Amount should be a positive number",
    },
    toFloat: true,
  },
});
