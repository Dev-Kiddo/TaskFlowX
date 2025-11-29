import { body, validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

export const registerValidator = [
  body("name").isEmpty().withMessage("Name is required").trim(),
  body("email").isEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
  body("password").isEmpty().withMessage("Password is required").isLength(4).withMessage("Password must be at least 6 characters"),
];

export const validate = function (req, res, next) {
  const errors = validationResult(req);

  console.log("errors:", errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
