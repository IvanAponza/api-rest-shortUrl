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

     //Generar token JWT
     const { token, expiresIn } = generateToken(user.id);
     generateRefreshToken(user.id, res); //genera refresh token JWT

    //Confirst the correo electrónico

    return res.status(201).json({ token, expiresIn });
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
    const { token, expiresIn } = generateToken(req.uid); //genera new token segur
    return res.json({ token, expiresIn }); //envia new token a la vista
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
