export const favoritesDocs = {
  "/favorites": {
    post: {
      tags: ["Favorites"],
      summary: "Create or Update new favorite",
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
                productIds: {
                  type: "array",
                  items: {
                    type: "string",
                    description: "The product id",
                  },
                },
              },
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: "return the new favorites",
        },
      },
    },
    get: {
      summary: "List favorites",
      security: [
        {
          bearerAuth: [],
        },
      ],
      description: "get favorites list",
      tags: ["Favorites"],
      responses: {
        200: {
          description: "return the favorites",
        },
      },
    },
    delete: {
      summary: "Delete favorite",
      description: "delete favorite",
      tags: ["Favorites"],
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
                productIds: {
                  type: "array",
                  items: {
                    type: "string",
                    description: "The product id",
                  },
                },
              },
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: "return the updated favorite",
        },
      },
    },
  },
};
