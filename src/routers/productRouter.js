import express from "express";
import { getProductByFilter } from "../models/productModel/productModel.js";

const Router = express.Router();

// fetch products by categories
Router.get("/:categories", async (req, res) => {
  try {
    const result = await getProductByFilter(req.params);
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

//fetch single product by slug
Router.get("/get/:slug", async (req, res) => {
  try {
    const result = await getProductByFilter(req.params);
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
