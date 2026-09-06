// Typed proof-data model. The proof surface renders whatever it is handed.
// When live evidence exists, pass a real PrismProof instead of DEMO_PROOF.
// No markup changes required to go from demo → testnet → mainnet.
export type PrismProof = {
  environment: "demo" | "testnet" | "mainnet";
  network: string;
  asset: string;
  account?: string;
  monBalance?: string;
  amount?: string;
  status?: string;
  requestId?: string;
  txHash?: string;
  confirmedAt?: string;
  indexedAt?: string;
  providers: {
    alchemy?: boolean; // live chain access / RPC
    envio?: boolean; // indexed history + proof
  };
};

export const DEMO_PROOF: PrismProof = {
  environment: "demo",
  network: "Monad",
  asset: "USDC",
  account: "0x…",
  monBalance: "0",
  amount: "$20.00",
  status: "Confirmed",
  txHash: "0x…",
  providers: { alchemy: true, envio: true },
};
