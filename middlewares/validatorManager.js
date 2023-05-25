import { validationResult, body, param } from "express-validator";
import axios from "axios";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const bodyRegisterValidator = [
  //Validation the data
  body("email", "Formato email incorrecto").trim().isEmail().normalizeEmail(),
  body("password", "Minimo 5 caracteres").trim().isLength({ min: 5 }),
  body("password", "Password incorrecto").custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error("No coinciden las contraseñas");
    }
    return value;
  }),
  validationResultExpress,
];

export const bodyLoginValidator = [
  //Validation the data
  body("email", "Formato email incorrecto").trim().isEmail().normalizeEmail(),
  body("password", "Minimo 5 caracteres").trim().isLength({ min: 5 }),
  validationResultExpress,
];

export const bodyLinkValidator = [
  body("longLink", "formato link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startsWith("https://")) {
          value = "https://" + value;
        }
        await axios.get(value);
        return value;
      } catch (error) {
        // console.log(error);
        throw new Error("not found longlink 404");
      }
    }),
  validationResultExpress,
];

export const paramLinkValidator = [
  param("id", "Formato no válido (expressValidator)")
    .trim()
    .notEmpty()
    .escape(),
  validationResultExpress,
];
