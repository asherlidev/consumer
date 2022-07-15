import { PageProps, graphql } from 'gatsby';
import React from 'react';
import GiftingPaymentSuccessfulPage from '../../components/Pages/gifting/GiftingPaymentSuccessfulPage';

const Page: React.FC<PageProps> = (props) => <GiftingPaymentSuccessfulPage {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
