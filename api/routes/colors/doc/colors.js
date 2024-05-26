export const colorsDocs = {
  "/colors": {
    post: {
      tags: ["Admin"],
      summary: "Create new color",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Color",
            },
          },
        },
      },
      responses: {
        200: {
          description: "return the new color",
        },
      },
    },
    get: {
      summary: "List colors",
      description: "get colors list",
      tags: ["Colors"],
      responses: {
        200: {
          description: "return the colors",
        },
      },
    },
  },
  "/colors/{colorId}": {
    delete: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Delete color",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "colorId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "color deleted",
        },
      },
    },
    get: {
      summary: "Get the color",
      description: "get the color",
      tags: ["Colors"],
      parameters: [
        {
          in: "path",
          name: "colorId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "return the color",
        },
      },
    },
    patch: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Update color",
      tags: ["Admin"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Color",
            },
          },
        },
      },
      responses: {
        200: {
          description: "return the new color data",
        },
      },
    },
  },
};
