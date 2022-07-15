import { graphql, PageProps } from 'gatsby';
import React from 'react';

import { TermsPageQuery } from '../../graphql-types';
import StrapiPage from '../components/Layout/StrapiPage';

const Page: React.FC<PageProps<TermsPageQuery>> = ({ data }) => {
  const { title, body } = data.allStrapiPage.edges[0].node;
  return <StrapiPage title={title as string} body={body as string} />;
};

export default Page;

export const termsPageQuery = graphql`
  query TermsPage {
    allStrapiPage(filter: { name: { eq: "Terms of Use" } }) {
      ...PageFragment
    }
    ...LocaleQuery
  }
`;
