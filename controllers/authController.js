import {
  generateRefreshToken,
  generateToken,
} from "../helpers/tokenManager.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  //console.log(req.body)
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();

    //JWT token

    //Confirst the correo electrónico

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe el usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe el usuario" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "Contraseña incorrecta" });

    //Generar token JWT
    const { token, expiresIn } = generateToken(user.id);

    //genera refresh token JWT
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean(); //devuelve obj simple lean
    return res.json({ email: user.email, uid: user.id });
  } catch (error) {
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const refreshToken = (req, res) => {
  try {

    const refreshTokenCookie = req.cookies.refreshToken;

    if (!refreshTokenCookie) throw new Error("No existe el token");

    //Verifica refreshToken
    const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    const { token, expiresIn } = generateToken(uid); //genera nuevo token de segur
    return res.json({ token, expiresIn }); //envia new token a la vista


  } catch (error) {
    console.log(error);
    const tokenVerificationError = {
      "Invalid signature": "La firma del JWT no es valida",
      "jwt expired": "JWT expirado",
      "Invalid token": "Token no valido",
      "No Bearer": "Utiliza formato Bearer",
      "jwt malformed": "JWT formato no valido",
    };
    return res.status(401).send({error: tokenVerificationError[error.message]});
  }
};
