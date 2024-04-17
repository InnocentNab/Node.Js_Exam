import express from "express";
import dotenv from "dotenv";
import { connect } from "./database/db.connect.js";
import UserRouter from "./routes/user.route.js";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3333;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Blog");
});

app.use("/", UserRouter);

app.all("*", (req, res) => {
  res.status(400).send({
    message: "Invalid Route, please goto a valid Route",
  });
});

connect().then(() => {
  console.log("Connected to Mongo_DB");

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});
