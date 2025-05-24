import { PriceData } from "../interfaces/PriceData";
import { OracleService } from "../oracle/OracleService";
import { BNB_PRICE_ORACLE_ADDRESS } from "./constants";

export class BNBPriceService {
    constructor(
        private readonly rpcUrl: string = "https://bsc-dataseed1.binance.org",
    ){}

    public async getBNBPrice(): Promise<PriceData> {
       const oracleService = new OracleService(this.rpcUrl, BNB_PRICE_ORACLE_ADDRESS);
       return await oracleService.getPrice();
    }

    /**
     * Simulates a price change for BNB between a delta percentage %
     * @param basePrice - The base price to simulate from.
     * @param percentDelta - The percentage delta to simulate.
     * @returns A simulated price change.
     */
    public static simulate(basePrice: number, percentDelta: number): number {
        const percentChange = Math.random() * percentDelta;
        const direction = Math.random() < 0.5 ? -1 : 1;
        const delta = basePrice * percentChange * direction;
        const simulatedPrice = basePrice + delta;
        return parseFloat(simulatedPrice.toFixed(2));
    }
    
}