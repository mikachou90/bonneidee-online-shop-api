import { Schema, model } from "mongoose";

const categorySchema = Schema({
  name: { type: String, index: true, required: true, unique: true },
  description: { type: String },
});

export default model("Category", categorySchema);

export const categorySchemaDoc = {
  Category: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        description: "The category name",
      },
      description: {
        type: "string",
        description: "The category description",
      },
    },
  },
};
