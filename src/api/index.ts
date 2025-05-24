import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bnbRouter from './bnb/routes';
import { swaggerSpec } from '../swagger';
import swaggerUi from 'swagger-ui-express';




dotenv.config();

export const app = express();

app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigin = process.env.WHITELISTED_ORIGIN;

      // If env var is not set → allow all origins
      if (!allowedOrigin) {
        return callback(null, true);
      }
      // No origin header (e.g., curl, Postman)
      if (!origin) {
        return callback(null, false);
      }
  
      // If env var is set → enforce it
      if (allowedOrigin && origin === allowedOrigin) {
        return callback(null, true);
      }
  
      return callback(new Error('Not allowed by CORS'));
    }
  }));


app.use('/api', bnbRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

