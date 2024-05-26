import { Schema, model } from "mongoose";

const colorSchema = Schema({
  name: { type: String, index: true, required: true },
  hex: { type: String, required: false },
  description: { type: String, required: false },
});

export default model("Color", colorSchema);

export const colorSchemaDoc = {
  Color: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        description: "The color name",
      },
      hex: {
        type: "string",
        description: "The color hexadecimal code",
      },
      description: {
        type: "string",
        description: "The color description",
      },
    },
  },
};
