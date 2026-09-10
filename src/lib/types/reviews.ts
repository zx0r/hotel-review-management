export type PlatformId = 'google' | 'tripadvisor' | 'booking' | 'agoda' | 'tripcom' | 'hostelworld' | 'hotelscom';


export interface PlatformReviewData {
  id: PlatformId;
  name: string;
  badgeLabel: string;
  ratingScore: number;
  maxScore: number;
  ratingFormatted: string;
  totalReviews: number;
  totalReviewsFormatted: string;
  directReviewUrl: string;
  brandColor: string;
  brandBg: string;
  isPrimary?: boolean;
}

export interface LiveReviewSummary {
  hotelId: string;
  hotelName: string;
  overallRating: number;
  maxRating: number;
  totalAggregateReviews: number;
  totalReviewsFormatted: string;
  lastUpdated: string;
  platforms: PlatformReviewData[];
}
