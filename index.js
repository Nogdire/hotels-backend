import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/authRoute.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ngm2rmg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );

    app.listen(process.env.PORT || 4444, () => console.log("Server started"));
  } catch (e) {
    console.log(e);
  }
}

start();
