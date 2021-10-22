import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoClient from "./src/config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
mongoClient();

app.use(cors());
app.use(morgan("tiny"));

import categoryRouter from "./src/routers/categoryRouter.js";

app.use("/api/v2/category", categoryRouter);

app.use("/", (req, res) => {
  res.send("You have reached the end of the router list");
});

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Server is running at http://localhost:${PORT}`);
});
