import { NextRequest, NextResponse } from 'next/server';

// Cache for 24h for historical prices, 5min for recent prices
const CACHE_DURATION_HISTORICAL = 24 * 60 * 60; // 24 hours in seconds
const CACHE_DURATION_RECENT = 5 * 60; // 5 minutes in seconds

interface PriceCache {
  data: any;
  timestamp: number;
}

const cache = new Map<string, PriceCache>();

function getCacheKey(asset: string, from: string, to: string): string {
  return `${asset}-${from}-${to}`;
}

function isCacheValid(cacheEntry: PriceCache, isHistorical: boolean): boolean {
  const now = Date.now();
  const maxAge = isHistorical ? CACHE_DURATION_HISTORICAL * 1000 : CACHE_DURATION_RECENT * 1000;
  return (now - cacheEntry.timestamp) < maxAge;
}

async function fetchBitcoinPrice(from: string, to: string): Promise<any[]> {
  const fromTimestamp = Math.floor(new Date(from).getTime() / 1000);
  const toTimestamp = Math.floor(new Date(to).getTime() / 1000);

  try {
    // CoinGecko API - market_chart/range endpoint
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${fromTimestamp}&to=${toTimestamp}`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!response.ok) {
      throw new Error('CoinGecko API failed');
    }

    const data = await response.json();

    // Transform to our format
    return data.prices.map(([timestamp, price]: [number, number]) => ({
      date: new Date(timestamp).toISOString().split('T')[0],
      price: price
    }));
  } catch (error) {
    console.error('CoinGecko error, trying CoinCap fallback:', error);

    // Fallback to CoinCap
    return fetchBitcoinPriceCoinCap(from, to);
  }
}

async function fetchBitcoinPriceCoinCap(from: string, to: string): Promise<any[]> {
  const fromDate = new Date(from).getTime();
  const toDate = new Date(to).getTime();

  const response = await fetch(
    `https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${fromDate}&end=${toDate}`
  );

  if (!response.ok) {
    throw new Error('CoinCap API also failed');
  }

  const data = await response.json();

  return data.data.map((item: any) => ({
    date: new Date(item.time).toISOString().split('T')[0],
    price: parseFloat(item.priceUsd)
  }));
}

async function fetchSP500Price(from: string, to: string): Promise<any[]> {
  // Using Alpha Vantage (requires API key) or Yahoo Finance alternative
  // For now, returning mock data structure - you'll need to implement with actual API

  // TODO: Implement Alpha Vantage or similar service
  // For MVP, could use a CSV of historical S&P 500 data

  return [
    { date: from, price: 4000 },
    { date: to, price: 4500 }
  ];
}

async function fetchGoldPrice(from: string, to: string): Promise<any[]> {
  // Gold API or similar service
  // TODO: Implement real gold price API

  return [
    { date: from, price: 1800 },
    { date: to, price: 1950 }
  ];
}

async function fetchMSCIWorldPrice(from: string, to: string): Promise<any[]> {
  // MSCI World index data
  // TODO: Implement real MSCI World API

  return [
    { date: from, price: 2800 },
    { date: to, price: 3100 }
  ];
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const asset = searchParams.get('asset');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!asset || !from || !to) {
      return NextResponse.json(
        { error: 'Missing required parameters: asset, from, to' },
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = getCacheKey(asset, from, to);
    const cachedEntry = cache.get(cacheKey);

    const isHistorical = new Date(to) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Older than 7 days

    if (cachedEntry && isCacheValid(cachedEntry, isHistorical)) {
      return NextResponse.json({
        data: cachedEntry.data,
        cached: true,
        timestamp: cachedEntry.timestamp
      });
    }

    // Fetch fresh data
    let priceData: any[];

    switch (asset.toUpperCase()) {
      case 'BTC':
      case 'BITCOIN':
        priceData = await fetchBitcoinPrice(from, to);
        break;
      case 'SP500':
      case 'S&P500':
        priceData = await fetchSP500Price(from, to);
        break;
      case 'GOLD':
        priceData = await fetchGoldPrice(from, to);
        break;
      case 'MSCI_WORLD':
      case 'MSCI':
        priceData = await fetchMSCIWorldPrice(from, to);
        break;
      default:
        return NextResponse.json(
          { error: `Unsupported asset: ${asset}` },
          { status: 400 }
        );
    }

    // Update cache
    cache.set(cacheKey, {
      data: priceData,
      timestamp: Date.now()
    });

    return NextResponse.json({
      data: priceData,
      cached: false,
      asset: asset,
      from: from,
      to: to,
      count: priceData.length
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch price data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
