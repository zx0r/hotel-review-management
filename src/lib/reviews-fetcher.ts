import { PlatformReviewData, LiveReviewSummary } from './types/reviews';

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

export const DIRECT_REVIEW_LINKS = {
  google:
    'https://www.google.com/maps/place/Sujet+Marina+Hotel+Da+Nang+By+Haviland/@16.0793157,108.2230923,19z/data=!4m11!3m10!1s0x314219389f667657:0x84d56c065e4f42ab!5m2!4m1!1i2!8m2!3d16.0793158!4d108.2235571!9m1!1b1!16s%2Fg%2F11z3mp45j9?entry=ttu',
  tripadvisor:
    'https://www.tripadvisor.com/UserReviewEdit-g25231262-d34369075-Sujet_Marina_Da_Nang_Hotel_by_Haviland-Hai_Chau_Da_Nang.html',
  booking:
    'https://www.booking.com/hotel/vn/sujet-marina-da-nang-by-haviland.html#tab-reviews',
  agoda:
    'https://www.agoda.com/sujet-marina-da-nang-hotel-by-haviland/hotel/da-nang-vn.html#reviews',
  tripcom:
    'https://www.trip.com/hotels/da-nang-hotel-detail-134108126/sujet-marina-hotel-da-nang-by-haviland/',
  hostelworld:
    'https://www.hostelworld.com/hotels/p/338586/sujet-marina-da-nang-hotel-by-haviland/',
  hotelscom:
    'https://www.hotels.com/ho4104681184/',
};

// 1. Live Fetcher for Booking.com (Live JSON-LD schema extraction)
async function fetchBookingLive(): Promise<{ rating: number; reviews: number; badge: string }> {
  try {
    const url = 'https://www.booking.com/hotel/vn/sujet-marina-da-nang-by-haviland.html';
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const html = await res.text();
      const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
      if (jsonLdMatches) {
        for (const block of jsonLdMatches) {
          try {
            const content = block.replace(/<\/?script[^>]*>/gi, '');
            const data = JSON.parse(content);
            if (data.aggregateRating) {
              return {
                rating: parseFloat(data.aggregateRating.ratingValue),
                reviews: parseInt(data.aggregateRating.reviewCount, 10),
                badge: 'Exceptional',
              };
            }
          } catch {
            // continue
          }
        }
      }
    }
  } catch (err) {
    console.error('Error fetching live Booking.com data:', err);
  }
  return { rating: 9.6, reviews: 55, badge: 'Exceptional 9.6' };
}

// 2. Live Fetcher for Agoda (Live JSON extraction)
async function fetchAgodaLive(): Promise<{ rating: number; reviews: number; badge: string }> {
  try {
    const url = 'https://www.agoda.com/sujet-marina-da-nang-hotel-by-haviland/hotel/da-nang-vn.html';
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const html = await res.text();
      const matchScore = html.match(/"formattedRating"\s*:\s*"([\d.]+)"/) || html.match(/"rating"\s*:\s*([\d.]+)/);
      const matchReviews = html.match(/"reviewCount"\s*:\s*(\d+)/) || html.match(/"totalReviewCount"\s*:\s*(\d+)/);
      if (matchScore) {
        return {
          rating: parseFloat(matchScore[1]),
          reviews: matchReviews ? parseInt(matchReviews[1], 10) : 80,
          badge: 'Exceptional',
        };
      }
    }
  } catch (err) {
    console.error('Error fetching live Agoda data:', err);
  }
  return { rating: 9.1, reviews: 80, badge: 'Exceptional 9.1' };
}

// 3. Live Fetcher for TripAdvisor
async function fetchTripAdvisorLive(): Promise<{ rating: number; reviews: number }> {
  try {
    const url =
      'https://www.tripadvisor.com/Hotel_Review-g25231262-d34369075-Reviews-Sujet_Marina_Da_Nang_Hotel_by_Haviland-Hai_Chau_Da_Nang.html';
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const html = await res.text();
      const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
      if (jsonLdMatches) {
        for (const block of jsonLdMatches) {
          try {
            const content = block.replace(/<\/?script[^>]*>/gi, '');
            const data = JSON.parse(content);
            if (data.aggregateRating) {
              return {
                rating: parseFloat(data.aggregateRating.ratingValue),
                reviews: parseInt(data.aggregateRating.reviewCount, 10),
              };
            }
          } catch {
            // continue
          }
        }
      }
    }
  } catch (err) {
    console.error('Error fetching live TripAdvisor data:', err);
  }
  return { rating: 5.0, reviews: 1 };
}

// 4. Live Fetcher for Google Maps
async function fetchGoogleLive(): Promise<{ rating: number; reviews: number }> {
  const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
  const googlePlaceId = process.env.GOOGLE_PLACE_ID;

  if (googleApiKey && googlePlaceId) {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=rating,user_ratings_total&key=${googleApiKey}`,
        { next: { revalidate: 3600 } }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          return {
            rating: data.result.rating,
            reviews: data.result.user_ratings_total,
          };
        }
      }
    } catch (err) {
      console.error('Error fetching live Google Places API:', err);
    }
  }

  try {
    const res = await fetch(DIRECT_REVIEW_LINKS.google, {
      headers: { 'User-Agent': USER_AGENT },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const text = await res.text();
      const match = text.match(/\[null,null,([1-5]\.\d),(\d+)/);
      if (match) {
        return {
          rating: parseFloat(match[1]),
          reviews: parseInt(match[2], 10),
        };
      }
    }
  } catch (err) {
    console.error('Error fetching Google Maps live page:', err);
  }

  return { rating: 4.9, reviews: 83 };
}

// 5. Master live reviews fetcher
export async function fetchLiveReviews(hotelSlug = 'sujet-marina'): Promise<LiveReviewSummary> {
  const [googleData, bookingData, agodaData, tripadvisorData] = await Promise.all([
    fetchGoogleLive(),
    fetchBookingLive(),
    fetchAgodaLive(),
    fetchTripAdvisorLive(),
  ]);

  const platforms: PlatformReviewData[] = [
    {
      id: 'google',
      name: 'Google Reviews',
      badgeLabel: 'Most Popular',
      ratingScore: googleData.rating,
      maxScore: 5.0,
      ratingFormatted: `${googleData.rating.toFixed(1)} ★`,
      totalReviews: googleData.reviews,
      totalReviewsFormatted: `${googleData.reviews} reviews`,
      directReviewUrl: DIRECT_REVIEW_LINKS.google,
      brandColor: '#4285F4',
      brandBg: '#E8F0FE',
      isPrimary: true,
    },
    {
      id: 'booking',
      name: 'Booking.com',
      badgeLabel: `Exceptional ${bookingData.rating.toFixed(1)}`,
      ratingScore: bookingData.rating,
      maxScore: 10.0,
      ratingFormatted: `${bookingData.rating.toFixed(1)} / 10`,
      totalReviews: bookingData.reviews,
      totalReviewsFormatted: `${bookingData.reviews} reviews`,
      directReviewUrl: DIRECT_REVIEW_LINKS.booking,
      brandColor: '#003580',
      brandBg: '#E5EDF6',
    },
    {
      id: 'agoda',
      name: 'Agoda',
      badgeLabel: `Exceptional ${agodaData.rating.toFixed(1)}`,
      ratingScore: agodaData.rating,
      maxScore: 10.0,
      ratingFormatted: `${agodaData.rating.toFixed(1)} / 10`,
      totalReviews: agodaData.reviews,
      totalReviewsFormatted: `${agodaData.reviews} reviews`,
      directReviewUrl: DIRECT_REVIEW_LINKS.agoda,
      brandColor: '#2B6CB0',
      brandBg: '#EBF4FF',
    },
    {
      id: 'tripadvisor',
      name: 'Tripadvisor',
      badgeLabel: 'Direct Review Form',
      ratingScore: tripadvisorData.rating,
      maxScore: 5.0,
      ratingFormatted: `${tripadvisorData.rating.toFixed(1)} ★`,
      totalReviews: tripadvisorData.reviews,
      totalReviewsFormatted: `${tripadvisorData.reviews} ${tripadvisorData.reviews === 1 ? 'review' : 'reviews'}`,
      directReviewUrl: DIRECT_REVIEW_LINKS.tripadvisor,
      brandColor: '#00AA6C',
      brandBg: '#E6F7F0',
    },
    {
      id: 'tripcom',
      name: 'Trip.com',
      badgeLabel: 'Amazing 9.7',
      ratingScore: 9.7,
      maxScore: 10.0,
      ratingFormatted: '9.7 / 10',
      totalReviews: 71,
      totalReviewsFormatted: '71 reviews',
      directReviewUrl: DIRECT_REVIEW_LINKS.tripcom,
      brandColor: '#FF5533',
      brandBg: '#FFF0ED',
    },
    {
      id: 'hostelworld',
      name: 'Hostelworld',
      badgeLabel: 'Superb 9.5',
      ratingScore: 9.5,
      maxScore: 10.0,
      ratingFormatted: '9.5 / 10',
      totalReviews: 7,
      totalReviewsFormatted: '7 reviews',
      directReviewUrl: DIRECT_REVIEW_LINKS.hostelworld,
      brandColor: '#FF6600',
      brandBg: '#FFF3E8',
    },
    {
      id: 'hotelscom',
      name: 'Hotels.com',
      badgeLabel: 'Exceptional 10/10',
      ratingScore: 10.0,
      maxScore: 10.0,
      ratingFormatted: '10 / 10',
      totalReviews: 1,
      totalReviewsFormatted: '1 review',
      directReviewUrl: DIRECT_REVIEW_LINKS.hotelscom,
      brandColor: '#D50000',
      brandBg: '#FFF0F0',
    },
  ];

  // Primary flagship rating is 4.9 ★ (Google Maps & Official Haviland rating)
  const overallRating = googleData.rating || 4.9;

  return {
    hotelId: hotelSlug,
    hotelName: 'Sujet Marina Hotel Da Nang By Haviland',
    overallRating,
    maxRating: 5.0,
    totalAggregateReviews: googleData.reviews,
    totalReviewsFormatted: `${googleData.reviews} Google Reviews`,
    lastUpdated: new Date().toISOString(),
    platforms,
  };
}
