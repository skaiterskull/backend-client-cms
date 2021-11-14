import {
  getSession,
  deleteSession,
} from "../models/sessionModel/sessionModel.js";
import { getUserById } from "../models/userModel/userModel.js";
import { verifyAccessJwt } from "../helpers/jwtHelper.js";

export const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const isJwtValid = verifyAccessJwt(authorization);

      if (isJwtValid === "jwt expired") {
        await deleteSession(authorization);

        return res.json({
          status: "error",
          message: "JWT expired",
        });
      }

      if (isJwtValid?.email) {
        const session = await getSession({ token: authorization });

        if (session?._id) {
          const user = await getUserById(session.userId);
          if (user?.role === "user") {
            req.user = user;
            return next();
          }
        }
      }
    }

    return res.status(401).json({
      status: "error",
      message: "Unauthenticated.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
