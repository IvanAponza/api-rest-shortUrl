import {Router} from "express";
import { infoUser, login, refreshToken, register } from "../controllers/authController.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validateResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";

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

//Ruta protegida de ejemplo
router.get('/protected', requireToken, infoUser);
router.get('/refresh', refreshToken);

export default router;
