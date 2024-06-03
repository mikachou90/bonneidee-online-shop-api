export const ordersDocs = {
  "/orders": {
    get: {
      summary: "List orders",
      description: "get orders list",
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Orders"],
      responses: {
        200: {
          description: "return the orders",
        },
      },
    },
    post: {
      summary: "Create order",
      description: "Create a new order",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                cartId: {
                  type: "string",
                  description: "The cart id to create the order",
                  required: true,
                },
                shippingAddress: {
                  type: "string",
                  description: "The shipping address to create the order",
                  required: true,
                },
                paymentMethod: {
                  type: "string",
                  description: "The payment method to create the order",
                  required: true,
                },
                shippingName: {
                  type: "string",
                  description: "The shipping name to create the order",
                  required: true,
                },
                shippingContactNumber: {
                  type: "number",
                  description:
                    "The shipping contact number to create the order",
                  required: true,
                },
              },
            },
          },
        },
        required: true,
      },
      tags: ["Orders"],
      responses: {
        200: {
          description: "return the new order",
        },
        400: {
          description: "Cart not found",
        },
      },
    },
  },
  "/orders/{orderId}": {
    get: {
      summary: "Get order by id",
      description: "Get order by id",
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Orders"],
      parameters: [
        {
          in: "path",
          name: "orderId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "return the order",
        },
        404: {
          description: "Order not found",
        },
      },
    },
    patch: {
      summary: "Update order",
      description: "Update order",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                cartId: {
                  type: "string",
                  description: "The cart id to update the order",
                },
                shippingAddress: {
                  type: "string",
                  description: "The shipping address to update the order",
                },
                paymentMethod: {
                  type: "string",
                  description: "The payment method to update the order",
                },
                status: {
                  type: "string",
                  description: "The status to update the order",
                },
                paymentStatus: {
                  type: "string",
                  description: "The payment status to update the order",
                },
              },
            },
          },
        },
        required: true,
      },
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "orderId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "return the updated order",
        },
        404: {
          description: "Order not found",
        },
      },
    },
  },
};
