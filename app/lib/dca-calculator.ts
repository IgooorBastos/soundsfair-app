import { addDays, addWeeks, addMonths, differenceInDays, parseISO, format } from 'date-fns';
import type { DCAInput, DCAResult, Transaction, Frequency, Asset } from '../types/tools';

interface PricePoint {
  date: string;
  price: number;
}

export function calculateDCA(
  input: DCAInput,
  priceData: Map<Asset, PricePoint[]>
): DCAResult[] {
  const results: DCAResult[] = [];

  for (const asset of input.assets) {
    const prices = priceData.get(asset);
    if (!prices || prices.length === 0) {
      continue;
    }

    const transactions = generateTransactions(
      input.amount,
      input.frequency,
      input.startDate,
      input.endDate,
      prices
    );

    if (transactions.length === 0) {
      continue;
    }

    const result = calculateMetrics(asset, transactions, prices);
    results.push(result);
  }

  return results;
}

function generateTransactions(
  amount: number,
  frequency: Frequency,
  startDate: string,
  endDate: string,
  prices: PricePoint[]
): Transaction[] {
  const transactions: Transaction[] = [];
  const priceMap = new Map(prices.map(p => [p.date, p.price]));

  let currentDate = parseISO(startDate);
  const end = parseISO(endDate);
  let cumulativeUnits = 0;

  while (currentDate <= end) {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const price = findClosestPrice(dateStr, prices);

    if (price) {
      const units = amount / price;
      cumulativeUnits += units;
      const portfolioValue = cumulativeUnits * price;

      transactions.push({
        date: dateStr,
        invested: amount,
        price: price,
        units: units,
        cumulativeUnits: cumulativeUnits,
        portfolioValue: portfolioValue
      });
    }

    // Move to next purchase date based on frequency
    switch (frequency) {
      case 'daily':
        currentDate = addDays(currentDate, 1);
        break;
      case 'weekly':
        currentDate = addWeeks(currentDate, 1);
        break;
      case 'biweekly':
        currentDate = addWeeks(currentDate, 2);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, 1);
        break;
    }
  }

  return transactions;
}

function findClosestPrice(date: string, prices: PricePoint[]): number | null {
  // Find exact match first
  const exact = prices.find(p => p.date === date);
  if (exact) return exact.price;

  // Find closest date (within 7 days)
  const targetDate = parseISO(date);
  let closestPrice: PricePoint | null = null;
  let minDiff = Infinity;

  for (const price of prices) {
    const priceDate = parseISO(price.date);
    const diff = Math.abs(differenceInDays(targetDate, priceDate));

    if (diff < minDiff && diff <= 7) {
      minDiff = diff;
      closestPrice = price;
    }
  }

  return closestPrice ? closestPrice.price : null;
}

function calculateMetrics(
  asset: Asset,
  transactions: Transaction[],
  prices: PricePoint[]
): DCAResult {
  const totalInvested = transactions.reduce((sum, t) => sum + t.invested, 0);
  const finalTransaction = transactions[transactions.length - 1];
  const units = finalTransaction.cumulativeUnits;

  // Get current/final price
  const finalPrice = prices[prices.length - 1].price;
  const currentValue = units * finalPrice;

  // Calculate ROI
  const roi = ((currentValue - totalInvested) / totalInvested) * 100;

  // Calculate CAGR (Compound Annual Growth Rate)
  const firstDate = parseISO(transactions[0].date);
  const lastDate = parseISO(transactions[transactions.length - 1].date);
  const years = differenceInDays(lastDate, firstDate) / 365.25;

  const cagr = years > 0
    ? (Math.pow(currentValue / totalInvested, 1 / years) - 1) * 100
    : 0;

  // Calculate drawdown (maximum peak-to-trough decline)
  const drawdown = calculateDrawdown(transactions);

  // Calculate volatility (standard deviation of returns)
  const volatility = calculateVolatility(transactions);

  return {
    asset,
    totalInvested,
    units,
    currentValue,
    roi,
    cagr,
    drawdown,
    volatility,
    transactions
  };
}

function calculateDrawdown(transactions: Transaction[]): number {
  let maxDrawdown = 0;
  let peak = -Infinity;

  for (const transaction of transactions) {
    const value = transaction.portfolioValue;

    if (value > peak) {
      peak = value;
    }

    const drawdown = ((peak - value) / peak) * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  return maxDrawdown;
}

function calculateVolatility(transactions: Transaction[]): number {
  if (transactions.length < 2) return 0;

  // Calculate period returns
  const returns: number[] = [];
  for (let i = 1; i < transactions.length; i++) {
    const prevValue = transactions[i - 1].portfolioValue;
    const currValue = transactions[i].portfolioValue;
    const periodReturn = (currValue - prevValue) / prevValue;
    returns.push(periodReturn);
  }

  // Calculate standard deviation
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);

  // Annualize volatility
  return stdDev * Math.sqrt(252) * 100; // 252 trading days per year
}

export function generateChartData(results: DCAResult[]): any[] {
  if (results.length === 0) return [];

  // Get all unique dates from all assets
  const dateSet = new Set<string>();
  results.forEach(result => {
    result.transactions.forEach(t => dateSet.add(t.date));
  });

  const sortedDates = Array.from(dateSet).sort();

  // Create chart data points
  const chartData = sortedDates.map(date => {
    const point: any = { date };

    results.forEach(result => {
      const transaction = result.transactions.find(t => t.date === date);
      if (transaction) {
        // Normalize to index 100 at start
        const firstValue = result.transactions[0].invested;
        const normalizedValue = (transaction.portfolioValue / firstValue) * 100;
        point[result.asset] = normalizedValue;
      }
    });

    return point;
  });

  return chartData;
}

export function generateShareableId(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}
