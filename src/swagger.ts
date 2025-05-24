import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BNB Price Tracker API',
      version: '1.0.0',
      description: 'An API to fetch and simulate BNB price data from Chainlink',
    },
    servers: [
      {
        url: `${process.env.FRONTEND_URL || 'http://localhost'}:${process.env.PORT || 3002}/api`, // Adjust for prod if needed
      },
    ],
  },
  apis: ['./src/api/**/*.ts'], // Look for JSDoc comments in your routes
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);