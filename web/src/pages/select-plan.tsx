import { PageProps, graphql } from 'gatsby';
import React from 'react';
import SelectPlanPage from '../components/Pages/SelectPlanPage';

const Page: React.FC<PageProps> = (props) => <SelectPlanPage {...props} />;

export default Page;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
