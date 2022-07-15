import { PageProps, graphql } from 'gatsby';
import React from 'react';
import ResetPasswordPage from '../components/Pages/ResetPasswordPage';

const Page: React.FC<PageProps> = (props) => <ResetPasswordPage {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
