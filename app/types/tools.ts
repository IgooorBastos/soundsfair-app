// Types for Tools Suite

export type Asset = 'BTC' | 'SP500' | 'GOLD' | 'MSCI_WORLD';

export type Frequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

export interface PriceData {
  date: string;
  price: number;
}

export interface DCAInput {
  amount: number;
  frequency: Frequency;
  startDate: string;
  endDate: string;
  assets: Asset[];
  customTicker?: string;
}

export interface DCAResult {
  asset: Asset;
  totalInvested: number;
  units: number;
  currentValue: number;
  roi: number;
  cagr: number;
  drawdown: number;
  volatility: number;
  transactions: Transaction[];
}

export interface Transaction {
  date: string;
  invested: number;
  price: number;
  units: number;
  cumulativeUnits: number;
  portfolioValue: number;
}

export interface DCACalculation {
  results: DCAResult[];
  chartData: ChartDataPoint[];
  shareId?: string;
}

export interface ChartDataPoint {
  date: string;
  [key: string]: number | string; // Dynamic keys for each asset
}

export interface HalvingData {
  currentBlock: number;
  nextHalvingBlock: number;
  blocksRemaining: number;
  estimatedDate: string;
  currentReward: number;
  nextReward: number;
  progress: number;
}

export interface FeeEstimate {
  slow: {
    satPerVbyte: number;
    totalSats: number;
    usdEquivalent: number;
    estimatedTime: string;
  };
  medium: {
    satPerVbyte: number;
    totalSats: number;
    usdEquivalent: number;
    estimatedTime: string;
  };
  fast: {
    satPerVbyte: number;
    totalSats: number;
    usdEquivalent: number;
    estimatedTime: string;
  };
}

export interface ConversionRate {
  btc: number;
  usd: number;
  eur: number;
  gbp: number;
  brl: number;
  usdt: number;
  usdc: number;
  sats: number;
}
