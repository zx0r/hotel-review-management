export type ReviewPlatformId = 'google' | 'tripadvisor' | 'booking' | 'agoda';

export interface ReviewPlatformLink {
  id: ReviewPlatformId;
  name: string;
  badgeLabel: string;
  ratingScore: string;
  totalReviews: string;
  description: string;
  directReviewUrl: string;
  brandColor: string;
  brandBg: string;
  isPrimary?: boolean;
}

export interface HotelSocialProof {
  overallRating: number;
  maxRating: number;
  reviewCount: number;
  starCount: number;
  headline: string;
  subheadline: string;
  ratingPillText: string;
}

export interface HotelPrivateFeedback {
  enabled: boolean;
  title: string;
  description: string;
  conciergePhone: string;
  conciergeEmail: string;
  workingHours: string;
}

export interface HotelConfig {
  id: string;
  slug: string;
  name: string;
  brandGroup: string;
  locationLabel: string;
  tagline: string;
  location: {
    city: string;
    country: string;
    address: string;
    googleMapsUrl: string;
  };
  branding: {
    officialWebsiteUrl: string;
    heroImageUrl: string;
    heroImageAlt: string;
    watermarkText: string;
    gallery: string[];
  };
  socialProof: HotelSocialProof;
  platforms: ReviewPlatformLink[];
  privateFeedback: HotelPrivateFeedback;
}

export const HOTELS: Record<string, HotelConfig> = {
  'sujet-marina': {
    id: 'sujet-marina',
    slug: 'sujet-marina',
    name: 'Sujet Marina Hotel Da Nang',
    brandGroup: 'Haviland House',
    locationLabel: '22 Bạch Đằng, Hải Châu, Đà Nẵng',
    tagline: 'Boutique Luxury Hospitality on Da Nang Coastline',
    location: {
      city: 'Da Nang',
      country: 'Vietnam',
      address: '22 Bạch Đằng, Thạch Thang, Hải Châu, Đà Nẵng, Vietnam',
      googleMapsUrl:
        'https://www.google.com/maps/place/Sujet+Marina+Hotel+Da+Nang+By+Haviland/@16.0793157,108.2230923,19z/data=!4m11!3m10!1s0x314219389f667657:0x84d56c065e4f42ab!5m2!4m1!1i2!8m2!3d16.0793158!4d108.2235571!9m1!1b1!16s%2Fg%2F11z3mp45j9?entry=ttu',
    },
    branding: {
      officialWebsiteUrl: 'https://havilandhouse.com/sujet-marina-da-nang-hotel-by-haviland-smd',
      heroImageUrl:
        'https://havi-web.s3.ap-southeast-1.amazonaws.com/2026_07_18/sujet-5-toa-nha-2-11zon-1784341667946.webp',
      heroImageAlt: 'Sujet Marina Hotel Da Nang By Haviland — Official Building & Suites',
      watermarkText: 'HAVILAND',
      gallery: [
        'https://havi-web.s3.ap-southeast-1.amazonaws.com/2026_07_18/sujet-5-toa-nha-2-11zon-1784341667946.webp',
        'https://havi-web.s3.ap-southeast-1.amazonaws.com/2026_08_06/sujet-5-sanh-4-1786011003784.jpg',
        'https://havi-web.s3.ap-southeast-1.amazonaws.com/2026_08_06/sujet-marina-p1-7-1786011771173.jpg',
        'https://havi-web.s3.ap-southeast-1.amazonaws.com/2026_08_12/sujet-marina-buffet-3-1786510409317.jpg',
      ],
    },
    socialProof: {
      overallRating: 4.9,
      maxRating: 5.0,
      reviewCount: 219,
      starCount: 5,
      headline: 'How was your stay with us?',
      subheadline: 'Your authentic feedback inspires our hospitality. Tap below to leave a review on your preferred platform.',
      ratingPillText: 'Rated 4.9 / 5.0 Exceptional Rating',
    },
    platforms: [
      {
        id: 'google',
        name: 'Google Reviews',
        badgeLabel: 'Most Popular',
        ratingScore: '4.9 ★',
        totalReviews: '83 reviews',
        description: 'Direct review submission on Google Maps.',
        directReviewUrl:
          'https://www.google.com/maps/place/Sujet+Marina+Hotel+Da+Nang+By+Haviland/@16.0793157,108.2230923,19z/data=!4m11!3m10!1s0x314219389f667657:0x84d56c065e4f42ab!5m2!4m1!1i2!8m2!3d16.0793158!4d108.2235571!9m1!1b1!16s%2Fg%2F11z3mp45j9?entry=ttu',
        brandColor: '#4285F4',
        brandBg: '#E8F0FE',
        isPrimary: true,
      },
      {
        id: 'booking',
        name: 'Booking.com',
        badgeLabel: 'Exceptional 9.6',
        ratingScore: '9.6 / 10',
        totalReviews: '55 reviews',
        description: 'Review your stay on Booking.com for verified guests.',
        directReviewUrl:
          'https://www.booking.com/hotel/vn/sujet-marina-da-nang-by-haviland.html#tab-reviews',
        brandColor: '#003580',
        brandBg: '#E5EDF6',
      },
      {
        id: 'agoda',
        name: 'Agoda',
        badgeLabel: 'Exceptional 9.1',
        ratingScore: '9.1 / 10',
        totalReviews: '80 reviews',
        description: 'Rate rooms and amenities on your Agoda account.',
        directReviewUrl:
          'https://www.agoda.com/sujet-marina-da-nang-hotel-by-haviland/hotel/da-nang-vn.html#reviews',
        brandColor: '#2B6CB0',
        brandBg: '#EBF4FF',
      },
      {
        id: 'tripadvisor',
        name: 'Tripadvisor',
        badgeLabel: 'Direct Review Form',
        ratingScore: '5.0 ★',
        totalReviews: '1 review',
        description: 'Directly opens the verified review submission form on TripAdvisor.',
        directReviewUrl:
          'https://www.tripadvisor.com/UserReviewEdit-g25231262-d34369075-Sujet_Marina_Da_Nang_Hotel_by_Haviland-Hai_Chau_Da_Nang.html',
        brandColor: '#00AA6C',
        brandBg: '#E6F7F0',
      },
    ],
    privateFeedback: {
      enabled: true,
      title: 'Need Immediate Concierge Assistance?',
      description: 'If any detail of your stay was less than perfect, our General Management and Concierge team are on standby 24/7 to make it right immediately.',
      conciergePhone: '+84 888 814 778',
      conciergeEmail: 'concierge@havilandhouse.com',
      workingHours: 'Available 24/7 for In-House Guests',
    },
  },
};

export const DEFAULT_HOTEL_ID = 'sujet-marina';

export function getHotelConfig(slug?: string): HotelConfig {
  if (slug && HOTELS[slug]) {
    return HOTELS[slug];
  }
  return HOTELS[DEFAULT_HOTEL_ID];
}
