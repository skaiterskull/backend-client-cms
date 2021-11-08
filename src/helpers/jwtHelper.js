import jwt from "jsonwebtoken";
import { addAccessJwt } from "../models/sessionModel/sessionModel.js";
import { addRefreshJwt } from "../models/userModel/userModel.js";

export const createAccessJwt = async ({ _id, email }) => {
  const token = jwt.sign({ email }, process.env.SECRET_ACCESS_JWT, {
    expiresIn: "15m",
  });

  const obj = {
    type: "accessJwt",
    userId: _id,
    token,
  };

  await addAccessJwt(obj);
  return token;
};

export const createRefreshJwt = async ({ _id, email }) => {
  const token = jwt.sign({ email }, process.env.SECRET_REFRESH_JWT, {
    expiresIn: "30d",
  });
  await addRefreshJwt({ _id, refreshJWT: token });
  return token;
};

export const getJwts = async (obj) => {
  const accessJwt = await createAccessJwt(obj);
  const refreshJwt = await createRefreshJwt(obj);

  return { accessJwt, refreshJwt };
};

export const verifyAccessJwt = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_ACCESS_JWT);
  } catch (error) {
    return error.message;
  }
};

export const verifyRefreshJwt = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_REFRESH_JWT);
  } catch (error) {
    return error.message;
  }
};
