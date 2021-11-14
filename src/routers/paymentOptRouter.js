import express from "express";
import { getPaymentOptions } from "../models/paymentOptModel/paymentOptModel.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const result = await getPaymentOptions();
    if (result) {
      return res.json({
        status: "success",
        message: "Payment option has been fetched",
        result,
      });
    }
    return res.json({
      status: "error",
      message: "Data not found",
      result: "Data is not there",
    });
  } catch (error) {
    res.status(501).json({
      status: "error",
      message: error.message,
    });
  }
});

export default Router;
