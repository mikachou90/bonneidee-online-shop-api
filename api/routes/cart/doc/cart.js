export const cartDocs = {
  "/cart": {
    post: {
      tags: ["Cart"],
      summary: "Create or update new user Cart",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Cart",
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: "return the new cart",
        },
      },
    },
    delete: {
      summary: "Empty user cart",
      security: [
        {
          bearerAuth: [],
        },
      ],
      description: "Empty new cart",
      tags: ["Cart"],
      responses: {
        200: {
          description: "return the empty cart",
        },
      },
    },
    get: {
      summary: "Get the user cart",
      produces: ["application/json"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      description: "get the user cart data",
      tags: ["Cart"],
      responses: {
        200: {
          description: "return the cart",
        },
      },
    },
    patch: {
      summary: "Update the user cart",
      security: [
        {
          bearerAuth: [],
        },
      ],
      description: "update the user cart data",
      tags: ["Cart"],
      requestBody: {
        description: "a valid basic cart.",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Cart",
            },
          },
        },
      },
      responses: {
        200: {
          description: "return the cart",
        },
      },
    },
  },
};
