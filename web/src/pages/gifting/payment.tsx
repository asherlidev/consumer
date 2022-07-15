import { PageProps, graphql } from 'gatsby';
import React from 'react';
import GiftingPaymentPage from '../../components/Pages/gifting/GiftingPaymentPage';

const Page: React.FC<PageProps> = (props) => <GiftingPaymentPage {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
