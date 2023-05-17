import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    //console.log(req.headers);
    let token = req.headers?.authorization;
    //console.log(token);
    if (!token) throw new Error("No existe el token el header usa Bearer");

    token = token.split(" ")[1];//separa el format Bearer del token
    //Validate token
    const {uid} = jwt.verify(token, process.env.JWT_SECRET);
    
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);

    //genera los mensajes de error del token
    const tokenVerificationError = {
      "Invalid signature": "La firma del JWT no es valida",
      "jwt expired": "JWT expirado",
      "Invalid token": "Token no valido",
      "No Bearer": "Utiliza formato Bearer",
    };
    return res.status(401).send({error: tokenVerificationError[error.message]});
  }
};
