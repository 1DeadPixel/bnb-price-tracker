import { apiRateLimiter } from '../utils';
import { Router, Request, Response } from 'express';
import { PriceData } from '../../modules/interfaces/PriceData';
import { BNBPriceService } from '../../modules/bnb/PriceService';

import dotenv from 'dotenv';

dotenv.config();

const bnbRouter = Router();

let cachedAt = 0;
const CACHE_DURATION_MS = 5000;
let cachedPriceData: PriceData | null = null;
let priceService = new BNBPriceService(process.env.BNB_RPC_URL || "");

/**
 * @openapi
 * /bnb-price:
 *   get:
 *     summary: Get a simulated BNB price based on Chainlink oracle data.
 *     responses:
 *       200:
 *         description: Simulated BNB price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                   example: 598.21
 *                 lastUpdated:
 *                   type: string
 *                   format: date-time
 *                 up:
 *                   type: boolean
 *                   example: true
 */
bnbRouter.get('/bnb-price', apiRateLimiter, async (req: Request, res: Response) => {
  try {
    const now = Date.now();

    if (now - cachedAt >= CACHE_DURATION_MS) {
      
      const priceData = await priceService.getBNBPrice();
      // Simulate a price change between -2 and 2 %
      const simulatedPrice = BNBPriceService.simulate(priceData.price, 0.02);

      cachedPriceData = {
        price: priceData.price,
        lastUpdated: priceData.lastUpdated,
        up: simulatedPrice > priceData.price,
      };
      
    }
    res.json(cachedPriceData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch BNB price' });
    console.error(err);
  }
});

export default bnbRouter;

