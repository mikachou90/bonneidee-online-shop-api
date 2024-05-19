import { Schema, model } from "mongoose";

const colorSchema = Schema({
  name: { type: String, index: true, required: true },
  hex: { type: String, required: false },
  description: { type: String, required: false },
});

export default model("Color", colorSchema);
