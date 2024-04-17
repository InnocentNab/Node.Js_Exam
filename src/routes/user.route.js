import express from "express";
import user from "../database/schema/UserSchema.js";
import bcrypt from "bcrypt";

// const app = express();

const UserRouter = express.Router();
// app.use(express.json());

UserRouter.post("/user/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  console.log(email);

  const oldUser = await user.findOne({ email });
  console.log(oldUser);
  // const oldUser = user
  //   .findOne({ email })
  //   .then(() => {
  //     console.log("Found users");
  //   })
  //   .catch((error) => {
  //     console.error("Error finding users:", error);
  //   });

  if (oldUser) {
    return res.status(400).send({
      Message: "Username or Email already exist",
    });
  }

  const newUser = await user.create({ first_name, last_name, email, password });

  // newUser.save();
  res.status(201).send({
    message: "User Created Successfully",
    data: newUser,
  });
});

export default UserRouter;
