import { PageProps, graphql } from 'gatsby';
import React from 'react';
import ForgotPasswordConfirmationPage from '../components/Pages/ForgotPasswordConfirmationPage';

const Page: React.FC<PageProps> = (props) => <ForgotPasswordConfirmationPage {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
