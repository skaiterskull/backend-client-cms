import express from "express";
import { getCategory } from "../models/categoryModel/categoryModel.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const result = await getCategory();
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
