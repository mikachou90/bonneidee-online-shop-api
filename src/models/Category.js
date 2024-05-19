import { Schema, model } from "mongoose";

const categorySchema = Schema({
  name: { type: String, index: true, required: true },
  description: { type: String, required: true },
});

export default model("Category", categorySchema);
