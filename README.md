# BNB Price Tracker
Real time BNB price tracker using on-chain data for the most accurate price.

# Setup Guide

1 -> Create a .env file at the root of the project.

2 -> Define a `BNB_RPC_URL` environment variable pointing to your preferred BNB Smart Chain (BSC) RPC endpoint. If you don't. The API will default to use a public Binance RPC.

3 -> Define a `FRONTEND_URL` that CORS will use to restrict access to the API. If you don't define this variable, it will default to localhost and all origins will be accepted.

4 Run
```bash
npm install
```

5 Run
```bash
npx ts-node src/index.tsnpx ts-node src/index.ts
```
