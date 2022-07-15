import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { Router } from '@reach/router';
import { useQuery } from '@apollo/client';

import HotelsPage from '../components/Pages/HotelsPage';
import HotelSearchResults from '../components/Pages/HotelsSearch/HotelSearchResults';
import HotelsSearch from '../components/Pages/HotelsSearch';
import HotelDetailsPage from '../components/Pages/HotelDetailPage';
import { getHotelById } from '../utils/gqlQueries';

export interface SearchHotel {
  id: number;
  name: string;
  description: string;
  image: string;
  address: {
    street_address: string;
    extended_address?: string;
    city: string;
    state: string;
    postal_code: string;
    country_name: string;
  };
  longitude: number;
  latitude: number;
}

const Page: React.FC<PageProps> = () => (
  <Router basepath="/hotels">
    <HotelsPage path="/" />
    <HotelsSearch path="/search" />
    <HotelDetail path="/:id" />
  </Router>
);

const HotelDetail: React.FC<{ path?: string; id?: string }> = ({ id }) => {
  const parsedId = id ? parseInt(id.split('--')[1]) : 0;

  const { data, loading } = useQuery(getHotelById(parsedId));

  return <HotelDetailsPage hotel={data?.hotel} loading={loading} />;
};

export const query = graphql`
  {
    ...LocaleQuery
  }
`;

export default Page;
