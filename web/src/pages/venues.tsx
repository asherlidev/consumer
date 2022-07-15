import React from 'react';
import { Router } from '@reach/router';
import { PageProps, graphql } from 'gatsby';

import VenuesPage from '../components/Pages/VenuesPage';
import VenueDetailPage from '../components/Pages/VenueDetailPage';

const Page: React.FC<PageProps> = () => (
  <Router basepath="/venues">
    <VenuesPage path="/" />
    <VenueDetailPage path="/:slug" />
  </Router>
);

export const query = graphql`
  {
    ...LocaleQuery
  }
`;

export default Page;
