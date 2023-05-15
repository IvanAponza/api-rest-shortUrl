import {Router} from "express";
import { login, register } from "../controllers/authController.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validateResultExpress.js";

const router = Router();

router.post(
  "/register",
  [
    //Validation the data
    body("email", "Formato email incorrecto").trim().isEmail().normalizeEmail(),
    body("password", "Minimo 5 caracteres").trim().isLength({ min: 5 }),
    body("password", "Password incorrecto").custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("No coinciden las contraseñas");
      }
      return value;
    }),
  ],
  validationResultExpress,
  register
);

router.post(
  "/login",
  [
    //Validation the data
    body("email", "Formato email incorrecto").trim().isEmail().normalizeEmail(),
    body("password", "Minimo 5 caracteres").trim().isLength({ min: 5 }),
  ],
  validationResultExpress,
  login
);

export default router;
