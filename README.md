# BNB Price Tracker
Real time BNB price tracker using on-chain data for the most accurate price.

# Setup Guide

1 -> Create a .env file at the root of the project.

2 -> Define a `BNB_RPC_URL` environment variable pointing to your preferred BNB Smart Chain (BSC) RPC endpoint. If you don't. The API will default to use a public Binance RPC.

3 -> Define a `DOMAIN_URL` that will be used to expose access to the API. If you don't, it will default to localhost.

4 -> Define a `WHITELISTED_ORIGIN` var that CORS restricts requests to the defined origin. If you don't, it will default to allow all origins.

4 Run
```bash
npm install
```

5 Run
```bash
npx ts-node src/index.tsnpx ts-node src/index.ts
```
