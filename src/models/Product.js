import { Schema, model } from "mongoose";

const productSchema = Schema({
  name: { type: String, index: true, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: false },
  price: { type: Number, index: true, required: true },
  colors: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: "Color",
  },
  category: {
    index: true,
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
});

export default model("Product", productSchema);

export const productSchemaDoc = {
  Product: {
    type: "object",
    required: ["name", "description", "price", "category"],
    properties: {
      name: {
        type: "string",
        description: "The product name",
      },
      description: {
        type: "string",
        description: "The product description",
      },
      picture: {
        type: "string",
        description: "The product picture",
      },
      price: {
        type: "number",
        description: "The product price",
      },
      colors: {
        type: "array",
        items: {
          type: "string",
        },
        description: "The product colors",
      },
      category: {
        type: "string",
        description: "The product category",
      },
    },
  },
};
