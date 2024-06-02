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
      colors: {
        type: "array",
        required: true,
        items: {
          type: Schema.Types.ObjectId,
          ref: "Color",
        },
      },
    },
  ],
  creationDate: { type: Date, required: true, default: Date.now },
  orderId: { type: Schema.Types.ObjectId, ref: "Order" },
});

export default model("Cart", cartSchema);

export const cartSchemaDoc = {
  Cart: {
    type: "object",
    required: ["userId", "products"],
    properties: {
      userId: {
        type: "string",
        description: "The user id",
      },
      products: {
        type: "array",
        items: {
          type: "object",
          required: ["product", "quantity", "colors"],
          properties: {
            product: {
              type: "string",
              description: "The product id",
            },
            quantity: {
              type: "integer",
              description: "The quantity of the product",
            },
            colors: {
              type: "array",
              description:
                "The color ids of the product. First is the main color",
              items: {
                type: "string",
              },
            },
          },
        },
      },
      creationDate: {
        type: "string",
        description: "The creation date",
      },
      orderId: {
        type: "string",
        description: "The order id",
      },
    },
  },
};
