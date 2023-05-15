import { User } from "../models/User.js";

export const register = async (req, res) => {
  //console.log(req.body)
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();

    //JWT token

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  return res.json({ ok: "login" });
};
