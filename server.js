import dotenv from "dotenv";
import mongoClient from "./src/config/db.js";
dotenv.config();

mongoClient();
