const options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Chat Express API with Swagger",
         version: "1.0.0",
         description: "",
         contact: {
            name: "Possibility of user registration and login, Ability to send messages to users",
            url: "arif.com",
            email: "info@gmail.com",
         },
      },
      servers: [
         {
            url: "http://localhost:3000/",
         },
      ],
      paths: {
         "/register": {
            post: {
               tags: ["user"],
               summary: "Create user",
               description: "This can only be done by the logged in user",
               operationId: "createUser",
               requestBody: {
                  description: "Created user object",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/userController" },
                     },
                  },
               },
            },
         },
         "/login": {
            post: {
               tags: ["user"],
               summary: "Login user",
               responses: {
                  200: "description: successful operation",
                  400: "description: Invalid username/password supplied",
               },
            },
         },
      },
   },
   apis: ["./routes/*.js"],
};

module.exports = options;
