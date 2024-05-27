import blog from "../database/schema/blogSchema.js";
import dotenv from "dotenv";
dotenv.config();
import RedisClient from "../integration/redis.js";
// const JWT_SECRET = process.env.JWT_SECRET;

export const getAll = async (req, res) => {
  // check cache
  const cachekey = "/blog";
  // get data from database
  const data = await RedisClient.get(cachekey);
  if (data) {
    console.log("returning data from cache");
    return res.status(200).send({
      data: JSON.parse(data),
      error: false,
    });
  }
  console.log("returning data from database");
  const post = await blog.find({});
  // set cache
  await RedisClient.setEx(cachekey, 10 * 60, JSON.stringify(post));
  res.status(200).send({
    AllPost: post,
  });
};

export const Create = async (req, res) => {
  await blog.create(req.body);
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
