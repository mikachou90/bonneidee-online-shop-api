import { Schema, model } from "mongoose";

const orderSchema = Schema({
  creationDate: { type: Date, required: true, default: Date.now },
  status: {
    type: String,
    required: true,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["credit card", "paypal", "cash"],
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["paid", "unpaid", "pending"],
    default: "unpaid",
  },
  shippingAddress: {
    type: String,
    required: true,
  },
});

export default model("Order", orderSchema);

export const orderSchemaDoc = {
  Order: {
    type: "object",
    required: ["creationDate", "status", "paymentMethod", "paymentStatus"],
    properties: {
      creationDate: {
        type: "string",
        format: "date-time",
        description: "The creation date of the order",
      },
      status: {
        type: "string",
        description: "The status of the order",
        enum: ["pending", "shipped", "delivered"],
      },
      paymentMethod: {
        type: "string",
        description: "The payment method of the order",
        enum: ["credit card", "paypal", "cash"],
      },
      paymentStatus: {
        type: "string",
        description: "The payment status of the order",
        enum: ["paid", "unpaid", "pending"],
      },
    },
  },
};
