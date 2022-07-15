import { PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import React from 'react';
import StoriesPage from '../components/Pages/StoriesPage';

const Page: React.FC<PageProps> = (props) => <StoriesPage {...props} />;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;

export default Page;
