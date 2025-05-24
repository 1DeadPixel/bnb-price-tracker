import cors from 'cors';
import dotenv from 'dotenv';
import bnbRouter from './bnb/routes';
import { swaggerSpec } from '../swagger';
import swaggerUi from 'swagger-ui-express';
import express, { Request, Response, NextFunction, RequestHandler } from 'express';




dotenv.config();

export const app = express();

const corsValidator: RequestHandler = (req, res, next) => {
    const allowedOrigin = process.env.WHITELISTED_ORIGIN;
    const requestOrigin = req.headers.origin;
  
    if (req.method === 'OPTIONS') {
      if (allowedOrigin && requestOrigin === allowedOrigin) {
        return next();
      }
      res.status(403).json({ error: 'CORS: Origin not allowed (preflight)' });
      return;
    }
  
    if (allowedOrigin) {
      if (!requestOrigin) {
        res.status(403).json({ error: 'CORS: Origin header is required' });
        return;
      }
      if (requestOrigin !== allowedOrigin) {
        res.status(403).json({ error: 'CORS: Origin not allowed' });
        return;
      }
    }
  
    next();
  };
  
  app.use(corsValidator);
  
  
  
  app.use(cors({
    origin: allowedOrigin => allowedOrigin || '*',
    optionsSuccessStatus: 200,
  }));

app.use('/api', bnbRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

