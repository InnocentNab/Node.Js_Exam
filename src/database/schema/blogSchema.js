import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  tags: [{ type: String }],
  state: {
    type: String,
    enum: ["draft", "published", "archived", "deleted"],
    default: "draft",
  },
  author: {
    type: String,
    required: true,
  },

  read_count: {
    type: Number,
    default: 0,
  },

  reading_time: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: true,
  },
});

const blog = mongoose.model("blog", BlogSchema);

export default blog;
