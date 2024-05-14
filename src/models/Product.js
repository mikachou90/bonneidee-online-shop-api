import { Schema, model } from "mongoose";

const productSchema = Schema({
  name: String,
});

export default model("products", productSchema);
