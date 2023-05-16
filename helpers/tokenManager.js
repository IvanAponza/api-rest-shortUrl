import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expiresIn = 60 * 15; //expire in 15 minutes

  try {
    const token = jwt.sign({uid}, process.env.JWT_REFRESH_TOKEN, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};
