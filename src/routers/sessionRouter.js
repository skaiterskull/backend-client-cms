import express from "express";
import { verifyRefreshJwt, createAccessJwt } from "../helpers/jwtHelper.js";
import { getUser } from "../models/userModel/userModel.js";

const Router = express.Router();

export default Router;

Router.get("/", async (req, res) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    const isJwtValid = verifyRefreshJwt(authorization);

    if (isJwtValid?.email) {
      const result = await getUser({ email: isJwtValid.email });
      if (result?._id) {
        const token = await createAccessJwt(result);
        if (token) {
          return res.json({
            token,
          });
        }
      }
    }

    res.status(403).json({
      status: "error",
      message: "unauthorized",
    });
  } catch (error) {
    res.status(501).json({
      status: "error",
    });
    console.log(error);
  }
});
