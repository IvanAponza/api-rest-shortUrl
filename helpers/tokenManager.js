import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expiresIn = 60 * 15; //expire in 15 minutes

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30; //expire in 30 days
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });
    //almacena refresh token en cookie segura
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, //hace que no pueda ser accedida -->vive intercambio
      secure: !(process.env.MODO === "developer"), //vive https true ! false
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};

export const tokenVerificationError = {
  "Invalid signature": "La firma del JWT no es valida",
  "jwt expired": "JWT expirado",
  "Invalid token": "Token no valido",
  "No Bearer": "Utiliza formato Bearer",
  "jwt malformed": "JWT formato no valido",
};
