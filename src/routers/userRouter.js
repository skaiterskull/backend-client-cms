import express from "express";
import {
  addUser,
  updateVerifiedUser,
  getUser,
  updateUserByFilter,
} from "../models/userModel/userModel.js";
import {
  newUserValidation,
  pinValidation,
  loginDataValidation,
  resetPassDataValidation,
  updateUserPasswordValidation,
} from "../middlewares/validationMiddleware.js";
import { hashPassword, verifyPassword } from "../helpers/bcryptHelper.js";
import { getRandomOTP } from "../helpers/otpHelper.js";
import { createPin, deletePin } from "../models/pinModel/pinModel.js";
import {
  sendEmailVerificationLink,
  sendEmailVerificationSuccess,
  sendEmailResetPassLink,
  sendEmailUpdatePassSuccess,
} from "../helpers/nodemailerHelper.js";
import { checkPinAndDelete, checkPin } from "../models/pinModel/pinModel.js";
import { getJwts } from "../helpers/jwtHelper.js";

const Router = express.Router();

Router.get("/:email", resetPassDataValidation, async (req, res) => {
  try {
    const { email } = req.params;
    const result = await getUser({ email });
    if (result) {
      const otp = getRandomOTP(15);
      const result = await createPin({ email, otp });
      if (result) {
        sendEmailResetPassLink({ email, otp });
      }
    }
    res.json({
      status: "ok",
    });
  } catch (error) {
    res.status(501).json({
      status: "error",
    });
    console.log(error);
  }
});

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

Router.post("/login", loginDataValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await getUser({ email });
    if (result?._id) {
      const isVerified = verifyPassword(password, result.password);
      if (isVerified) {
        const obj = {
          _id: result._id,
          email,
        };
        const token = await getJwts(obj);

        result.password = undefined;
        result.__v = undefined;
        result.role = undefined;
        result.refreshJWT = undefined;
        result.updatedAt = undefined;
        result.isEmailConfirmed = undefined;

        return res.json({
          status: "success",
          message: "Login successfully.",
          result,
          token,
        });
      } else {
        return res.json({
          status: "error",
          message: "Incorrect Password !",
        });
      }
    }

    return res.json({
      status: "error",
      message: "Account is not exist.",
    });
  } catch (error) {
    res.status(501).json({
      status: "error",
      message: "Internal server error.",
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

Router.put("/", updateUserPasswordValidation, async (req, res) => {
  try {
    const { otp, email, password } = req.body;
    const data = await checkPin({ email, otp });

    if (data) {
      const encryptedPass = hashPassword(password);
      const result = await updateUserByFilter(
        { email },
        { password: encryptedPass }
      );
      if (result) {
        await deletePin({ email, otp });
        sendEmailUpdatePassSuccess(email);
        return res.json({
          status: "success",
          message: "Password has been updated.",
        });
      }
    }
    res.json({
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
