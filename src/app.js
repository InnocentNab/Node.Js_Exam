import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connect } from "./database/db.connect.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3333;
const MONGODB_URI = process.env.MONGO_DB_URI;

import UserRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Blog");
});

app.use("/", UserRouter);
app.use("/", blogRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.all("*", (req, res) => {
  res.status(400).send({
    message: "Invalid Route, please goto a valid Route",
  });
});

connect(MONGODB_URI).then(() => {
  // console.log("Connected to Mongo_DB");

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});
