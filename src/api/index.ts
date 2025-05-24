import cors from 'cors';
import dotenv from 'dotenv';
import bnbRouter from './bnb/routes';
import { swaggerSpec } from '../swagger';
import swaggerUi from 'swagger-ui-express';
import express, { Request, Response, NextFunction } from 'express';




dotenv.config();

export const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    const allowedOrigin = process.env.WHITELISTED_ORIGIN;
    const requestOrigin = req.headers.origin;
  
    if (allowedOrigin && requestOrigin !== allowedOrigin) {
      res.status(403).json({ error: 'Origin not allowed by server policy.' });
      return;
    }
  
    next();
  });
  
  app.use(cors({
    origin: allowedOrigin => allowedOrigin || '*',
    optionsSuccessStatus: 200,
  }));

app.use('/api', bnbRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

