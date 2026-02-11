import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assets Library API",
      version: "1.0.0",
      description: "API documentation for Assets Library Backend",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Asset: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "MacBook Pro" },
            description: { type: "string", example: "Developer laptop" },
            mac: { type: "string", example: "AA:BB:CC:DD:EE:FF" },
            link: { type: "string", example: "https://apple.com" },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateAssetRequest: {
          type: "object",
          required: ["title", "description", "mac", "link"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            mac: { type: "string" },
            link: { type: "string" },
          },
        },
      },
    },

    /* Optional: Apply globally */
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to route files
};

const swaggerSpec = swaggerJsDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Asset:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Laptop Dell
 *         description:
 *           type: string
 *           example: Office laptop
 *         mac:
 *           type: string
 *           example: AA:BB:CC:DD:EE:FF
 *         link:
 *           type: string
 *           example: https://example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
