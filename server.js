import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoClient from "./src/config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
mongoClient();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded());
app.use(express.json());

import categoryRouter from "./src/routers/categoryRouter.js";
import productRouter from "./src/routers/productRouter.js";
import userRouter from "./src/routers/userRouter.js";
import sessionRouter from "./src/routers/sessionRouter.js";
import paymentOptRouter from "./src/routers/paymentOptRouter.js";
import orderRouter from "./src/routers/orderRouter.js";
import { userAuth } from "./src/middlewares/authenticationMiddleware.js";

app.use("/api/v2/category", categoryRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/user", userRouter);
app.use("/api/v2/session", sessionRouter);
app.use("/api/v2/paymentOpt", userAuth, paymentOptRouter);
app.use("/api/v2/order", userAuth, orderRouter);

app.use("/", (req, res) => {
  res.send("You have reached the end of the router list");
});

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Server is running at http://localhost:${PORT}`);
});
