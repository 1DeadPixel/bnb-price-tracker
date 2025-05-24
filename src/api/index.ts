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
  
      if (allowedOrigin) {
        if (!origin) {
          return callback(new Error('CORS: Origin header is required'), false);
        }
  
        if (origin === allowedOrigin) {
          return callback(null, true); // ✅ allowed
        }

        return callback(new Error('CORS: Origin not allowed'), false);
      }
  
      return callback(null, true);
    },
    optionsSuccessStatus: 200
  }));

app.use('/api', bnbRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

