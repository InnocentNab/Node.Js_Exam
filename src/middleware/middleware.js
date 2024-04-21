import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createToken } from "../controllers/userController.js";
import user from "../database/schema/UserSchema.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const requireAuth = (req, res, next) => {
  //   const token = jwt;
  const token = createToken(user._id);

  //   console.log(token);
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(400).send("Not Authorized");
    console.log();
  }
};

export default requireAuth;
