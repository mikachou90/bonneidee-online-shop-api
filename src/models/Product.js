import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: String,
  description: String,
  picture: String,
});

export default model("User", userSchema);
