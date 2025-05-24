import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bnbRouter from './bnb/routes';
import { swaggerSpec } from '../swagger';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';




dotenv.config();

export const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 6,              
});
app.use('/api/bnb-price', limiter);

app.use('/api/bnb-price', bnbRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

