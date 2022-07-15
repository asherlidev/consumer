import { PageProps, graphql } from 'gatsby';
import React from 'react';
import OfferPaymentSuccess from '../components/Pages/OfferPaymentSuccess';

const Page: React.FC<PageProps> = (props) => <OfferPaymentSuccess {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
