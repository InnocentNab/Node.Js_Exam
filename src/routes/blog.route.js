import express from "express";
// import blog from "../database/schema/blogSchema.js";
import blog from "../database/schema/blogSchema.js";
import { Create, Edit, getAll, Delete } from "../controllers/blogController.js";
import requireAuth from "../middleware/middleware.js";
const blogRouter = express.Router();

blogRouter.get("/blog", getAll);
blogRouter.post("/blog/create", requireAuth, Create);
blogRouter.put("/blog/create", requireAuth, Edit);
blogRouter.delete("/blog/create", requireAuth, Delete);

export default blogRouter;
