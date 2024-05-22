import express from "express";
import user from "../database/schema/UserSchema.js";
import * as userController from "../controllers/userController.js";
import dotenv from "dotenv";
import requireAuth from "../authentication/authentication.js";
import { CreateValidation, LoginValidation } from "../validation/validate.js";
dotenv.config();

const UserRouter = express.Router();

UserRouter.post("/user/register", CreateValidation, userController.register);
UserRouter.post(
  "/user/login",
  LoginValidation,
  requireAuth,
  userController.login
);
export default UserRouter;
