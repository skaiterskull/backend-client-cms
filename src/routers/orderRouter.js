import express from "express";
import { addOrder } from "../models/orderModel/orderModel.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const result = await addOrder(req.body);
    if (result) {
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
