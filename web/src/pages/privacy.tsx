import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { PrivacyPageQuery } from '../../graphql-types';
import StrapiPage from '../components/Layout/StrapiPage';

const Page: React.FC<PageProps<PrivacyPageQuery>> = ({ data }) => {
  const { title, body } = data.allStrapiPage.edges[0].node;
  return <StrapiPage title={title as string} body={body as string} />;
};

export default Page;

export const privacyPageQuery = graphql`
  query PrivacyPage {
    allStrapiPage(filter: { name: { eq: "Privacy Policy" } }) {
      ...PageFragment
    }
    ...LocaleQuery
  }
`;
