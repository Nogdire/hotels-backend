import { body } from "express-validator";

export const reserveValidation = [
  body("first_name", "Min length - 3 characters").isLength({ min: 3 }),
  body("last_name", "Min length - 3 characters").isLength({ min: 3 }),
  body("info_1", "Min length - 3 characters").isLength({ min: 3 }),
  body("info_2", "Min length - 3 characters").isLength({ min: 3 }),
  body("country", "Min length - 3 characters").isLength({ min: 3 }),
  body("email", "Invalid email").isEmail(),
  body("phone", "Invalid phone number").isMobilePhone(),
  body("comment", "Min length - 10 characters").isLength({ min: 10 }),
];
