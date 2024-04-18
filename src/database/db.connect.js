import mongoose from "mongoose";

// export const connect = async (MONGODB_URI) => {
//   // const MONGODB_URI = process.env.MONGODB_URI;

//   if (MONGODB_URI) {
//     return await mongoose.connect(MONGODB_URI);
//   }
// };

export const connect = async (MONGODB_URI) => {
  try {
    await mongoose.connect(MONGODB_URI).then(console.log("MongoDB connected"));
  } catch (error) {
    console.log(error.message);
  }
};
// export const mongoose = require ("mongoose");
