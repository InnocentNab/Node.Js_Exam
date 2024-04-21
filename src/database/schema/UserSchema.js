import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
    required: [true, "Please enter your Email"],
    unique: true,
  },
  phone_no: {
    type: Number,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  country: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.post("save", async function (doc, next) {
  console.log("New user created");
  next();
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect mail");
};
const user = mongoose.model("user", UserSchema);

export default user;
