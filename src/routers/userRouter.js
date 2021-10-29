import express from "express";
import { addUser } from "../models/userModel/userModel.js";
import { newUserValidation } from "../middlewares/validationMiddleware.js";
import { hashPassword } from "../helpers/bcryptHelper.js";

const Router = express.Router();

Router.post("/", newUserValidation, async (req, res) => {
  try {
    const { password } = req.body;
    const encriptedPass = hashPassword(password);

    req.body.password = encriptedPass;

    console.log(req.body);

    const result = await addUser(req.body);

    if (result) {
      return res.json({
        status: "success",
        message: `Your account has been created.Please verify your account. An email has been sent to ${req.body.email} with verification link.`,
      });
    }
  } catch (error) {
    if (error.message.includes("E11000")) {
      return res.json({
        status: "error",
        message: "Email already exist",
      });
    }

    res.status(501).json({
      status: "error",
      message: "Internal server error",
    });
    console.log(error);
  }
});

export default Router;
