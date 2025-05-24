import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bnbRouter from './bnb/routes';
import { swaggerSpec } from '../swagger';
import swaggerUi from 'swagger-ui-express';




dotenv.config();

export const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));


app.use('/api', bnbRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

