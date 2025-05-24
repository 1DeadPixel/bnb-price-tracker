import { ethers } from "ethers";
import { BNB_ORACLE_ABI } from "./constants";
import { PriceData } from "../interfaces/PriceData";

export class OracleService {
    private provider: ethers.JsonRpcProvider;
    private contract: ethers.Contract;

    constructor(private readonly rpcUrl: string, private readonly contractAddress: string) {
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
        this.contract = new ethers.Contract(contractAddress, BNB_ORACLE_ABI, this.provider);
    }


    public async getPrice(): Promise<PriceData> {
        const [[, answer, , updatedAt], decimals] = await Promise.all([this.contract.latestRoundData(), this.contract.decimals()])
        return {
            price: Number(answer) / Math.pow(10, Number(decimals)),
            lastUpdated: new Date(Number(updatedAt) * 1000).toISOString(),
            up: null,
        }
    }
}