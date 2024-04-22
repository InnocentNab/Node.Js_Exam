import blog from "../database/schema/blogSchema.js";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const getAll = async (req, res) => {
  const post = await blog.find({});
  res.status(200).send({
    AllPost: post,
  });
};

export const Create = async (req, res) => {
  const { title, description, author, body } = req.body;
  const oldPost = await blog.findOne({});
  if (oldPost.title === req.body.title) {
    return res.status(400).send("Post Exists");
  }
  // const read_time = math.celi(body.length / averagewordsperminutes);
  const newPost = await blog.create({ title, description, author, body });
  res.status(201).send({
    message: "Post Created Successfully",
    data: newPost,
  });
};

export const Edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;

    if (!["draft", "published", "archived", "deleted"].includes(state)) {
      return res.status(400).json({ message: "Invalid state" });
    }

    const updatedBlogPost = await blog.findByIdAndUpdate(
      id,
      { state },
      { new: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json(updatedBlogPost);
  } catch (error) {
    console.error("Error updating blog post state:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Delete = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.state = null;
    await blog.save();

    res.status(200).json({ message: "Blog state deleted successfully", blog });
  } catch (error) {
    console.error("Error deleting blog state:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
