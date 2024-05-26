export const productsDocs = {
  "/products": {
    post: {
      tags: ["Admin"],
      summary: "Create new product",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Product",
            },
          },
        },
      },
      responses: {
        200: {
          description: "return the new product",
        },
      },
    },
    get: {
      summary: "List products",
      description: "get products list",
      tags: ["Products"],
      responses: {
        200: {
          description: "return the products",
        },
      },
    },
  },
  "/products/{productId}": {
    delete: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Delete product",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "productId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "product deleted",
        },
      },
    },
    get: {
      summary: "Get the product",
      description: "get the product",
      tags: ["Products"],
      parameters: [
        {
          in: "path",
          name: "productId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "return the product",
        },
      },
    },
    patch: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Update product",
      tags: ["Admin"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Product",
            },
          },
        },
      },
      responses: {
        200: {
          description: "return the new product data",
        },
      },
    },
  },
};
