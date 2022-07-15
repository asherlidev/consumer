import { config } from 'dotenv';
import { GatsbyConfig } from 'gatsby';
import { join } from 'path';
import { mediaQueries } from './src/constants/layout';
import { getYoutubeVideoId } from './src/utils/youtube';

config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });

export const siteMetadata: GatsbyConfig['siteMetadata'] = {
  title: 'Festival Pass - Live. Life. Live.',
  titleTemplate: '%s · Festival Pass',
  brand: 'festivalPass',
  siteUrl: 'https://www.festivalpass.com',
  description:
    "The world's first live events subscription service across music, film, food & wine, theater, tech & innovation and more. Enjoy thousands of events locally and globally for one monthly fee.",
  image:
    'https://res.cloudinary.com/festivalpass/image/upload/v1569456634/fp-content/default-share-image-5_3x_viqmie.jpg',
  twitterUsername: '@pass_festival',
};

export const plugins: GatsbyConfig['plugins'] = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: join(__dirname, 'assets', 'images'),
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/locales`,
      name: `locale`,
    },
  },
  `gatsby-plugin-gatsby-cloud`,
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-styled-components',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  {
    resolve: 'gatsby-plugin-breakpoints',
    options: {
      queries: mediaQueries,
    },
  },
  {
    resolve: 'gatsby-plugin-react-i18next',
    options: {
      // path: `${__dirname}/locales`,
      localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
      languages: ['en'],
      defaultLanguage: 'en',
      i18nextOptions: {
        interpolation: {
          escapeValue: false,
          formatSeparator: ',',
        },
      },
    },
  },
  {
    resolve: join(__dirname, 'plugins/gatsby-source-strapi'),
    options: {
      apiURL: process.env.GATSBY_STRAPI_API_URL,
      queryLimit: process.env.STRAPI_QUERY_LIMIT ? process.env.STRAPI_QUERY_LIMIT : -1,
      downloadMedia: false,
      collectionTypes: [
        {
          name: 'festival',
          endpoint: 'festivals/seo-meta',
        },
        'page',
        'interest',
        'inboundcampaign',
        'outboundcampaign',
        'podcast',
        'product',
        'partner',
        'talent',
        'newsletter-promotion',
      ],
    },
  },
  'gatsby-plugin-graphql-codegen',
  'gatsby-plugin-layout',
  {
    resolve: 'gatsby-plugin-web-font-loader',
    options: {
      google: {
        families: ['Montserrat:400,700', 'Open Sans:400,300,700,800'],
      },
    },
  },
  {
    resolve: 'gatsby-plugin-create-client-paths',
    options: { prefixes: [`/app/*`] },
  },
  {
    // When there's no image url, it throws an error at build time.
    // See https://github.com/graysonhicks/gatsby-plugin-remote-images/issues/39
    resolve: 'gatsby-plugin-remote-images',
    options: {
      nodeType: 'StrapiFestival',
      imagePath: 'video_url',
      name: 'videoThumbnail',
      prepareUrl: (youtubeVideoUrl: string | undefined) => {
        const youtubeVideoId = getYoutubeVideoId(youtubeVideoUrl);
        return youtubeVideoId ? `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg` : null;
      },
    },
  },
  {
    // When there's no image url, it throws an error at build time.
    // See https://github.com/graysonhicks/gatsby-plugin-remote-images/issues/39
    resolve: 'gatsby-plugin-remote-images',
    options: {
      nodeType: 'StrapiVenue',
      imagePath: 'video_url',
      name: 'videoThumbnail',
      prepareUrl: (youtubeVideoUrl: string | undefined) => {
        const youtubeVideoId = getYoutubeVideoId(youtubeVideoUrl);
        return youtubeVideoId ? `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg` : null;
      },
    },
  },
  {
    resolve: 'gatsby-plugin-intercom-spa',
    options: {
      app_id: process.env.INTERCOM_APP_ID,
      include_in_development: true,
      delay_timeout: 0,
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      short_name: 'Festival Pass',
      name: 'Live.Life.Live.',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#000000',
      display: 'standalone',
      icon: join(__dirname, 'assets', 'images', 'favicon.png'),
      crossOrigin: `use-credentials`,
    },
  },
  {
    resolve: 'gatsby-plugin-advanced-sitemap',
    options: {
      exclude: [`/app/`, `/404`, `/404.html`],
    },
  },
  {
    resolve: 'gatsby-transformer-cloudinary',
    options: {
      cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER,
      enableDefaultTransformations: true,
    },
  },
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      resolveEnv: () => process.env.GATSBY_ENV,
      env: {
        development: {
          policy: [{ userAgent: '*', disallow: '/' }],
        },
        staging: {
          policy: [{ userAgent: '*', disallow: '/' }],
        },
        production: {
          policy: [{ userAgent: '*', allow: '/', disallow: '/app/' }],
        },
      },
    },
  },
  'gatsby-plugin-webpack-bundle-analyser-v2',
];
