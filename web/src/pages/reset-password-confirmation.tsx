import { PageProps, graphql } from 'gatsby';
import React from 'react';
import ResetPasswordConfirmationPage from '../components/Pages/ResetPasswordConfirmationPage';

const Page: React.FC<PageProps> = (props) => <ResetPasswordConfirmationPage {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
