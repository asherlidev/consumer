import { graphql } from 'gatsby';

export const pageFragment = graphql`
  fragment PageFragment on StrapiPageConnection {
    edges {
      node {
        name
        title
        subtitle
        body
      }
    }
  }
`;

export const eventCardFragment = graphql`
  fragment EventCardFragment on StrapiFestivalConnection {
    edges {
      node {
        __typename
        strapiId
        start
        end
        updated_at
        slug_name
        cover_image {
          url
        }
        festivalcategories {
          id
          name
        }
        isConfirmed
        name
        location
        child_ids {
          name
          slug_name
          summary
          cover_image {
            childCloudinaryAsset {
              fluid {
                ...CloudinaryAssetFluid
              }
            }
            url
          }
          credit_cost
          start
          end
        }
      }
    }
  }
`;

/**
 * NOTES: reference new gatsby-plugin-react-i18next
 * https://www.gatsbyjs.com/plugins/gatsby-plugin-react-i18next/
 * Since right now we're only using `en` our locale query only filter for `en`
 * if we implement more languages in the future we need to pass in a variable inside above query
 */
export const localeQueryFragment = graphql`
  fragment LocaleQuery on Query {
    locales: allLocale(filter: { language: { eq: "en" } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
