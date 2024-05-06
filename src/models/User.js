import { Schema, model } from "mongoose";

const userSchema = Schema({
  firstName: String,
  lastName: String,
});

export default model("User", userSchema);
