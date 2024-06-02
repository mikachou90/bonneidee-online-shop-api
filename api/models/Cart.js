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
      color: {
        type: Schema.Types.ObjectId,
        ref: "Color",
        required: true,
      },
    },
  ],
});

export default model("Cart", cartSchema);

export const cartSchemaDoc = {
  Cart: {
    type: "object",
    required: ["productId", "quantity", "colorId"],
    properties: {
      productId: {
        type: "string",
        description: "The product id",
      },
      quantity: {
        type: "integer",
        description: "The quantity of the product",
      },
      colorId: {
        type: "string",
        description: "The color id of the product",
      },
    },
  },
};
