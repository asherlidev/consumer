import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import { MetadataQuery } from '../../../../graphql-types';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const SEO: React.FC<Props> = ({ title, description, image }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery<MetadataQuery>(query);

  const {
    defaultTitle,
    defaultImage,
    defaultDescription,
    siteUrl,
    titleTemplate,
    twitterUsername,
  } = site?.siteMetadata || {};

  const seo = {
    template: title && titleTemplate ? titleTemplate : undefined,
    title: title || defaultTitle || '',
    image: image || defaultImage || '',
    description: description || defaultDescription || '',
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet htmlAttributes={{ lang: 'en' }} titleTemplate={seo.template}>
      <title>{seo.title}</title>
      <meta http-equiv="Expires" content="0" />
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />

      <meta name="description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} key="ogtitle" />
      <meta property="og:description" content={seo.description} key="ogdesc" />
      <meta property="og:image" content={seo.image} key="ogimage" />

      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
};

const query = graphql`
  query Metadata {
    site {
      siteMetadata {
        defaultTitle: title
        defaultImage: image
        defaultDescription: description
        siteUrl
        titleTemplate
        twitterUsername
      }
    }
  }
`;

export default SEO;
