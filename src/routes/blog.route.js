import express from "express";
// import blog from "../database/schema/blogSchema.js";
import blog from "../database/schema/blogSchema.js";
import { Create, Edit, getAll, Delete } from "../controllers/blogController.js";
import requireAuth from "../authentication/authentication.js";
const blogRouter = express.Router();

blogRouter.get("/blog", getAll);
blogRouter.post("/blog", requireAuth, Create);
blogRouter.put("/blog", requireAuth, Edit);
blogRouter.delete("/blog", requireAuth, Delete);

export default blogRouter;
