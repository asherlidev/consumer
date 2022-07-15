import { PageProps, graphql } from 'gatsby';
import React from 'react';
import OfferCheckout from '../components/Pages/OfferCheckout';

const Page: React.FC<PageProps> = (props) => <OfferCheckout {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
