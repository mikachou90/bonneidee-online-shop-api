export const categoriesDocs = {
  "/categories": {
    post: {
      tags: ["Admin"],
      summary: "Create new category",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Category",
            },
          },
        },
      },
      responses: {
        200: {
          description: "return the new category",
        },
      },
    },
    get: {
      summary: "List categories",
      description: "get categories list",
      tags: ["Categories"],
      responses: {
        200: {
          description: "return the categories",
        },
      },
    },
  },
  "/categories/{categoryId}": {
    delete: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Delete category",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "categoryId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Category deleted",
        },
      },
    },
    get: {
      summary: "Get the category",
      description: "get the category",
      tags: ["Categories"],
      parameters: [
        {
          in: "path",
          name: "categoryId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "return the category",
        },
      },
    },
    patch: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Update category",
      tags: ["Admin"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Category",
            },
          },
        },
      },
      responses: {
        200: {
          description: "return the new category data",
        },
      },
    },
  },
};
