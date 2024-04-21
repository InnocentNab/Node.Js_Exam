import user from "../database/schema/UserSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const maxage = 1 * 60 * 60;

export const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: maxage });
};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = { email: "", password: "" };
  if (err.message.includes("user validation failed")) {
    console.log(err);
  }
};

export const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const oldUser = await user.findOne({ email });
  if (oldUser) {
    return res.status(400).send({
      message: "Email already exist",
    });
  }
  try {
    const User = await user.create({
      first_name,
      last_name,
      email,
      password,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token);
    console.log(token);
    res.status(201).json({
      message: "User Created",
      data: User,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("User not created");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await user.login(email, password);
    const token = createToken(user._id);
    res.status(200).send({
      user: User._id,
      token,
    });
  } catch (error) {
    res.status(400).send({});
  }
};
