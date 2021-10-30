import express from "express";
import { addUser, updateVerifiedUser } from "../models/userModel/userModel.js";
import {
  newUserValidation,
  pinValidation,
} from "../middlewares/validationMiddleware.js";
import { hashPassword } from "../helpers/bcryptHelper.js";
import { getRandomOTP } from "../helpers/otpHelper.js";
import { createPin } from "../models/pinModel/pinModel.js";
import {
  sendEmailVerificationLink,
  sendEmailVerificationSuccess,
} from "../helpers/nodemailerHelper.js";
import { checkPinAndDelete } from "../models/pinModel/pinModel.js";

const Router = express.Router();

Router.post("/", newUserValidation, async (req, res) => {
  try {
    const { password, email } = req.body;
    const encriptedPass = hashPassword(password);

    req.body.password = encriptedPass;
    const otp = getRandomOTP(6);
    const result = await addUser(req.body);
    const data = await createPin({ email, otp });

    if (result && data) {
      sendEmailVerificationLink({ email, otp });
      return res.json({
        status: "success",
        message: `Your account has been created.Please verify your account. An email has been sent to ${email} with verification link.`,
      });
    }

    res.json({
      status: "failed",
      message: `Your account could not be created. Please try again later.`,
    });
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

Router.post("/email-verification", pinValidation, async (req, res) => {
  try {
    const { email } = req.body;

    const result = await checkPinAndDelete(req.body);
    if (result) {
      await updateVerifiedUser({ email });
      sendEmailVerificationSuccess(email);

      return res.json({
        status: "success",
      });
    }
    res.status(404).json({
      status: "error",
      message: "Invalid Link.",
    });
  } catch (error) {
    res.status(501).json({
      status: "error",
    });
    console.log(error);
  }
});

export default Router;
