import cors from 'cors';
import dotenv from 'dotenv';
import bnbRouter from './bnb/routes';
import { swaggerSpec } from '../swagger';
import swaggerUi from 'swagger-ui-express';
import express, { NextFunction, Request, Response } from 'express';




dotenv.config();

export const app = express();

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      const allowedOrigin = process.env.WHITELISTED_ORIGIN;
  
      if (!allowedOrigin) return callback(null, true);
      if (!origin) return callback(new Error('CORS: Origin header required'), false);
      if (origin === allowedOrigin) return callback(null, true);
  
      return callback(new Error('CORS: Origin not allowed'), false);
    },
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions));


app.use('/api', bnbRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message?.startsWith('CORS')) {
      res.status(403).json({ error: err.message });
      return;
    }
    next(err);
  });