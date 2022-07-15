import React from 'react';
import { Helmet } from 'react-helmet';

import colors from '../../../constants/colors';
import { ScrollToTop } from '../../Elements';
import { Footer, Header, PageWrapper } from '../../Layout';
import HotelDetailPageContent from './HotelDetailPageContent';
import { GalleryImage } from '../../../types/common';

export interface Room {
  ratePlanCode: string;
  code: string;
  name: string;
  description: string;
  nightlyRate: {
    price: string;
    date: string;
  }[];
  tax: {
    percent: string;
    amount: string;
  };
  total: {
    amount: string;
    includesBookingFee: boolean;
  };
  bookingFee: string;
  gatewayFee: string;
  gateway: string;
  inDate: string;
  outDate: string;
  adults: string;
  children: string;
}
export interface Hotel {
  id: number;
  name: string;
  description: string;
  images: GalleryImage[];
  address: {
    street_address: string;
    extended_address: string;
    city: string;
    state: string;
    postal_code: string;
    country_name: string;
  };
  longitude: number;
  latitude: number;
  amenities: { name: string }[];
  rating?: number;
  rooms: Room[];
}

const HotelDetailPage: React.FC<{ hotel?: Hotel; loading: boolean }> = ({ hotel, loading }) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={'Hotel'} />
      </Helmet>
      <ScrollToTop />
      <Header withoutBottomBorder />
      <PageWrapper backgroundColor={colors.white}>
        <HotelDetailPageContent hotel={hotel} loading={loading} />
      </PageWrapper>
      <Footer />
    </>
  );
};

export default HotelDetailPage;
