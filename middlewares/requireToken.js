import jwt from "jsonwebtoken";
import { tokenVerificationError } from "../helpers/tokenManager.js";

export const requireToken = (req, res, next) => {
  try {
    //console.log(req.headers);
    let token = req.headers?.authorization;
    //console.log(token);
    if (!token) throw new Error("No existe el token el header usa Bearer");

    token = token.split(" ")[1]; //separa el format Bearer del token
    //Validate token
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ error: tokenVerificationError[error.message] });
  }
};
