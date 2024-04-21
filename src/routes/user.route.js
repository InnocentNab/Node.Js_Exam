import express from "express";
import user from "../database/schema/UserSchema.js";
import * as userController from "../controllers/userController.js";
import dotenv from "dotenv";
import requireAuth from "../middleware/middleware.js";
dotenv.config();

const UserRouter = express.Router();

UserRouter.post("/user/register", userController.register);
UserRouter.post("/user/login", requireAuth, userController.login);
export default UserRouter;
