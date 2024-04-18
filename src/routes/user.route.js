import express from "express";
import user from "../database/schema/UserSchema.js";
import bcrypt from "bcrypt";

const UserRouter = express.Router();

UserRouter.post("/user/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const oldUser = await user.findOne({ email });
  if (req.body === null) {
    res.send("Input Details");
  }

  if (oldUser) {
    return res.status(400).send({
      Message: "Email already exist",
    });
  }
  const saltRounds = 10;
  
  bcrypt
  .hash(password, saltRounds)
  .then((hash) => {
      const newUser = await user.create({ first_name, last_name, email, hash });
      console.log("Hash ", hash);
    })
    .catch((err) => console.error(err.message));


  res.status(201).send({
    message: "User Created Successfully",
    data: newUser,
  });
});

UserRouter.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const User = await user.findOne({ email, password });

  if (!User) {
    return res.status(401).json({ message: "Incorrect Email or Password" });
  }

  res.status(200).send("Welcome to my Blog");
});
export default UserRouter;
