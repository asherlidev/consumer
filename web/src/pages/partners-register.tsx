import { PageProps, graphql } from 'gatsby';
import React from 'react';
import PartnersRegisterPage from '../components/Pages/PartnersRegisterPage';

const Page: React.FC<PageProps> = (props) => <PartnersRegisterPage {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
