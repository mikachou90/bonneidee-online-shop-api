import { Schema, model } from "mongoose";

const cartSchema = Schema({
  userId: { type: String, required: true, unique: true },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: { type: Number, required: true },
    },
  ],
});

export default model("Cart", cartSchema);
