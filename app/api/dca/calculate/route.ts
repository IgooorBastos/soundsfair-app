import { NextRequest, NextResponse } from 'next/server';
import { calculateDCA, generateChartData, generateShareableId } from '@/app/lib/dca-calculator';
import type { DCAInput, Asset } from '@/app/types/tools';

interface PricePoint {
  date: string;
  price: number;
}

async function fetchPricesForAsset(
  asset: Asset,
  startDate: string,
  endDate: string
): Promise<PricePoint[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const response = await fetch(
    `${baseUrl}/api/prices?asset=${asset}&from=${startDate}&to=${endDate}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch prices for ${asset}`);
  }

  const result = await response.json();
  return result.data;
}

export async function POST(request: NextRequest) {
  try {
    const body: DCAInput = await request.json();

    // Validate input
    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!body.frequency || !['daily', 'weekly', 'biweekly', 'monthly'].includes(body.frequency)) {
      return NextResponse.json(
        { error: 'Invalid frequency' },
        { status: 400 }
      );
    }

    if (!body.startDate || !body.endDate) {
      return NextResponse.json(
        { error: 'Start date and end date are required' },
        { status: 400 }
      );
    }

    if (new Date(body.startDate) >= new Date(body.endDate)) {
      return NextResponse.json(
        { error: 'Start date must be before end date' },
        { status: 400 }
      );
    }

    if (!body.assets || body.assets.length === 0) {
      return NextResponse.json(
        { error: 'At least one asset is required' },
        { status: 400 }
      );
    }

    // Fetch price data for all requested assets
    const priceDataMap = new Map<Asset, PricePoint[]>();

    await Promise.all(
      body.assets.map(async (asset) => {
        try {
          const prices = await fetchPricesForAsset(asset, body.startDate, body.endDate);
          priceDataMap.set(asset, prices);
        } catch (error) {
          console.error(`Failed to fetch prices for ${asset}:`, error);
          // Continue with other assets even if one fails
        }
      })
    );

    if (priceDataMap.size === 0) {
      return NextResponse.json(
        { error: 'Failed to fetch price data for any asset' },
        { status: 500 }
      );
    }

    // Calculate DCA results
    const results = calculateDCA(body, priceDataMap);

    if (results.length === 0) {
      return NextResponse.json(
        { error: 'No results calculated. Check your inputs.' },
        { status: 400 }
      );
    }

    // Generate chart data
    const chartData = generateChartData(results);

    // Generate shareable ID
    const shareId = generateShareableId();

    // TODO: Store calculation in database for sharing (future implementation)
    // await storeCalculation(shareId, { input: body, results, chartData });

    return NextResponse.json({
      success: true,
      results,
      chartData,
      shareId,
      metadata: {
        assetsCalculated: results.map(r => r.asset),
        totalAssetsRequested: body.assets.length,
        calculationDate: new Date().toISOString(),
        startDate: body.startDate,
        endDate: body.endDate
      }
    });

  } catch (error) {
    console.error('DCA Calculation Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to calculate DCA',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint for retrieving shared calculations
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shareId = searchParams.get('id');

  if (!shareId) {
    return NextResponse.json(
      { error: 'Share ID is required' },
      { status: 400 }
    );
  }

  // TODO: Retrieve from database
  // const calculation = await getCalculationByShareId(shareId);

  // For now, return not implemented
  return NextResponse.json(
    {
      error: 'Share feature not yet implemented',
      message: 'Database integration required for sharing functionality'
    },
    { status: 501 }
  );
}
