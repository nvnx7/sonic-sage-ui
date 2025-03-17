export type Market = {
  id: number;
  publicKey: string;
  price: number;
  priceFeedId: string;
  createdAt: number;
  resolveFrom: number;
  resolveTo: number;
  subsidyAmount: number; // In whole token units, not with decimals
  currentBalance: number;
  numOutcome0: number;
  numOutcome1: number;
  numOutcome0Held: number;
  numOutcome1Held: number;
  priceOutcome0: number;
  priceOutcome1: number;
  isResolved: boolean;
  outcome: number | null;
};
