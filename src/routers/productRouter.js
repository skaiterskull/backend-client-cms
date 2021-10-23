import express from "express";
import { getCategoryByFilter } from "../models/productModel/productModel.js";

const Router = express.Router();

Router.get("/:categories?", async (req, res) => {
  try {
    const result = await getCategoryByFilter(req.params);
    if (result) {
      res.json({
        status: "success",
        result,
      });
    }
  } catch (error) {
    res.status(501).json({
      status: "Error",
      message: error.message,
    });
  }
});

export default Router;
