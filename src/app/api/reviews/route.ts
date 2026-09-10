import { NextResponse } from 'next/server';
import { fetchLiveReviews } from '@/lib/reviews-fetcher';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 minutes cache

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hotel = searchParams.get('hotel') || 'sujet-marina';
    const data = await fetchLiveReviews(hotel);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch live reviews' },
      { status: 500 }
    );
  }
}
