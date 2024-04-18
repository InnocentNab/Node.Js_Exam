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
  tags: {},
  state: {},
  author: {
    type: String,
    required: true,
  },

  read_count: {
    type: String,
  },

  reading_time: {
    type: Date,
    default: Date.now,
  },
  body: {},
});

const blog = mongoose.model("blog", BlogSchema);

export default blog;
