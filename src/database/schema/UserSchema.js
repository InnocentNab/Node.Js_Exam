import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_no: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("user", UserSchema);

export default user;
