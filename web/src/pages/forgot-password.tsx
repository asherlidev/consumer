import { PageProps, graphql } from 'gatsby';
import React from 'react';
import ForgotPasswordPage from '../components/Pages/ForgotPasswordPage';

const Page: React.FC<PageProps> = (props) => <ForgotPasswordPage {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
