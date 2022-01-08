import express from "express";
import { addOrder, getOrderByFilter } from "../models/orderModel/orderModel.js";
import {
  fetchOrderValidation,
  orderValidation,
} from "../middlewares/orderValidationMiddleware.js";

const Router = express.Router();

Router.get("/:email", fetchOrderValidation, async (req, res) => {
  try {
    const { email } = req.params;

    const result = await getOrderByFilter(email);
    if (result.length) {
      return res.json({ status: "success", message: "Order/s found", result });
    }
    res.json({
      status: "error",
      message: "No order/s found",
      result,
    });
  } catch (error) {
    res.status(501).json({
      status: "error",
      message: error.message,
    });
  }
});

Router.post("/", orderValidation, async (req, res) => {
  try {
    const result = await addOrder(req.body);
    if (result._id) {
      res.json({
        status: "success",
        result,
      });
    }
  } catch (error) {
    res.status(501).json({
      status: "error",
      message: error.message,
    });
  }
});

export default Router;
