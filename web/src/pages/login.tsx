import { PageProps, graphql } from 'gatsby';
import React from 'react';
import LoginPage from '../components/Pages/LoginPage';

const Page: React.FC<PageProps> = (props) => <LoginPage {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
