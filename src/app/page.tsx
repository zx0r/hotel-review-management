import React from 'react';
import type { Metadata } from 'next';
import { getHotelConfig } from '@/config/hotels';
import { fetchLiveReviews } from '@/lib/reviews-fetcher';
import { ReviewInteractiveView } from './review/ReviewInteractiveView';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Leave a Review | Sujet Marina Hotel Da Nang By Haviland',
  description:
    'Select your rating and choose your favorite verified review platform: Google, Tripadvisor, Booking.com, or Agoda.',
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  const hotel = getHotelConfig('sujet-marina');
  const liveReviews = await fetchLiveReviews('sujet-marina');

  return <ReviewInteractiveView hotel={hotel} liveReviews={liveReviews} />;
}
