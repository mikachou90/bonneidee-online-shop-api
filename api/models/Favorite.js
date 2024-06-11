import { Schema, model } from "mongoose";

const favoriteSchema = Schema({
  userId: { type: String, required: true, unique: true },
  products: {
    index: true,
    required: true,
    type: Array,
    items: { type: Schema.Types.ObjectId, ref: "Product" },
    default: [],
  },
  created_at: { type: Date, default: Date.now, required: true },
});

export default model("Favorite", favoriteSchema);

export const favoriteSchemaDoc = {
  Favorite: {
    type: "object",
    required: ["userId", "products"],
    properties: {
      userId: {
        type: "string",
        description: "The user id",
      },
      products: {
        type: "array",
        description: "The products ids",
        items: {
          type: "string",
        },
      },
    },
  },
};
