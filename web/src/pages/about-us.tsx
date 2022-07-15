import { PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import React from 'react';
import AboutUsPage from '../components/Pages/AboutUsPage';

const Page: React.FC<PageProps> = (props) => <AboutUsPage {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
