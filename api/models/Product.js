import { Schema, model } from "mongoose";

const productSchema = Schema({
  name: { type: String, index: true, required: true },
  price: { type: Number, index: true, required: true },
  description: { type: String },
  picture: { type: String },
  colors: {
    index: true,
    required: true,
    type: Array,
    items: { type: Schema.Types.ObjectId, ref: "Color" },
    default: [],
  },
  category: {
    index: true,
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  sizeDescription: { type: String },
  maxColors: { type: Number, default: 1, required: true, min: 1 },
});

export default model("Product", productSchema);

export const productSchemaDoc = {
  Product: {
    type: "object",
    required: ["name", "price"],
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
        description: "The product colors ids",
      },
      category: {
        type: "string",
        description: "The product category id",
      },
      sizeDescription: {
        type: "string",
        description: "The product size description",
      },
      maxColors: {
        type: "number",
        description: "The product max colors. Minimum 1.",
      },
    },
  },
};
