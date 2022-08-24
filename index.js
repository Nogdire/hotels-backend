import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/authRoute.js";
import hotelsRoute from "./routes/hotelsRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/user", userRoute);

async function start() {
  try {
    await mongoose.connect(process.env.DATA_BASE);

    app.listen(process.env.PORT || 4444, () => console.log("Server started"));
  } catch (e) {
    console.log(e);
  }
}

start();
