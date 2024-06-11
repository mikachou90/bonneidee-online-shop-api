export const cartDocs = {
  "/cart": {
    post: {
      tags: ["Cart"],
      summary: "Add product to cart",
      description:
        "Add product to cart. If the cart does not exist, it will be created.",
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
                productId: {
                  type: "string",
                  description: "The product id",
                  required: true,
                },
                quantity: {
                  type: "integer",
                  description: "The quantity of the product",
                  required: true,
                },
                colorIds: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description: "The color ids of the product",
                  required: true,
                },
              },
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: "return the new cart",
        },
        400: {
          description:
            "Product already exists in cart OR Color not found for this product OR Product not found",
        },
      },
    },
    delete: {
      summary: "Remove product to cart",
      security: [
        {
          bearerAuth: [],
        },
      ],
      description:
        "Remove a product to cart. If no product is sent, the cart will be emptied.",
      requestBody: {
        description: "Product id to remove from the cart",
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                productId: {
                  type: "string",
                  description: "The product id to remove from the cart",
                },
              },
            },
          },
        },
      },
      tags: ["Cart"],
      responses: {
        200: {
          description: "return the updated cart",
        },
        400: {
          description: "Product not found in cart",
        },
        404: {
          description: "Cart not found",
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
      description:
        "get the user cart. If the cart does not exist, it will be created, with no products.",
      tags: ["Cart"],
      responses: {
        200: {
          description: "Return the user cart",
        },
        404: {
          description: "Cart not found",
        },
      },
    },
    patch: {
      summary: "Update product to cart",
      security: [
        {
          bearerAuth: [],
        },
      ],
      description:
        "Update the user cart data. If the quantity of one product is 0, the product will be removed from the cart.",
      tags: ["Cart"],
      requestBody: {
        description:
          "Products list with Product id, quantity and/or color to update in the cart",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "The product id",
                    required: true,
                  },
                  quantity: {
                    type: "integer",
                    description: "The quantity of the product",
                  },
                  colorId: {
                    type: "string",
                    description: "The color id of the product",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "return the updated cart",
        },
        400: {
          description: "Color not found for this product",
        },
        404: {
          description:
            "Cart not found OR Product not found in cart OR Product not found",
        },
      },
    },
  },
};
