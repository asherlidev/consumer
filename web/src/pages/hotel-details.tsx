import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Router } from '@reach/router';
import { useQuery } from '@apollo/client';

import HotelDetailsPage from '../components/Pages/HotelDetailPage';
import { getHotelById } from '../utils/gqlQueries';

const Page: React.FC = () => (
  <Router basepath="/hotels">
    <HotelDetail path="/:id" />
  </Router>
);

const HotelDetail: React.FC<{ path?: string; id?: string }> = ({ id }) => {
  const parsedId = id ? parseInt(id.split('--')[1]) : 0;

  const { data, loading } = useQuery(getHotelById(parsedId));

  return <HotelDetailsPage hotel={data?.hotel} loading={loading} />;
};

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
