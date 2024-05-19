import { Schema, model } from "mongoose";

const productSchema = Schema({
  name: { type: String, index: true, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: false },
  price: { type: Number, index: true, required: true },
  category: {
    index: true,
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
});

export default model("Product", productSchema);
