import express from "express";
import { findPinByFilter } from "../models/pinModel/pinModel.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const result = await findPinByFilter(req.body);
    if (result) {
      return res.json({
        status: "success",
      });
    }
    res.json({
      status: "error",
    });
  } catch (error) {
    res.status(501).json({
      status: "error",
      message: error.message,
    });
  }
});

export default Router;
