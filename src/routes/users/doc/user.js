export const userDocs = {
  "/user": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Get simple user data",
      description: "get user from auth0",
      tags: ["User"],
      responses: {
        200: {
          description: "Returns some user data.",
        },
      },
    },
  },
  "/user/info": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Get user data",
      description: "get user from auth0",
      tags: ["User"],
      responses: {
        200: {
          description: "Returns user data.",
        },
      },
    },
  },
};
