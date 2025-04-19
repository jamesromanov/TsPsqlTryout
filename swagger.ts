import swaggerJsDoc from "swagger-jsdoc";
const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books api!",
      version: "1.0,0",
      description: "This is simple book crud using ts!",
    },
    components: {
      schemas: {
        Books: {
          type: "object",
          required: ["title", "author_id", "published_year"],
          properties: {
            title: {
              type: "string",
              description: "This is a title of a book!",
            },
            author_id: {
              type: "number",
              description: "This is a author of a book!",
            },
            published_year: {
              type: "string",
              description: "This is a published year of a book!",
            },
          },
          example: {
            title: "Some good book",
            published_year: "1969-12-31T18:00:00.000Z",
            author_id: 1,
          },
        },
      },
    },
    tags: [{ name: "Books", description: "This is a books rest api!" }],
  },
  apis: ["./swagger", "./routes/*.ts"],
});

export default swaggerSpec;
