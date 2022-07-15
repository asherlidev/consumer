import { PageProps, graphql } from 'gatsby';
import React from 'react';
import NotFoundPage from '../components/Pages/NotFoundPage';

const Page: React.FC<PageProps> = () => <NotFoundPage />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
