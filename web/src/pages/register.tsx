import { PageProps, graphql } from 'gatsby';
import React from 'react';
import RegisterPage from '../components/Pages/RegisterPage';

const Page: React.FC<PageProps> = (props) => <RegisterPage {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
