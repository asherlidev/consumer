import { GatsbyNode, SourceNodesArgs } from 'gatsby';
import { createRemoteImageNode } from 'gatsby-transformer-cloudinary';
import { isEmpty } from 'lodash';
import moment from 'moment';
import webpack from 'webpack';

import { Event } from './src/components/Pages/EventDetailPage/EventDetailPageContent';
import { GiftingCampaign } from './src/components/Pages/LandingPage/SuperHeroSection/GiftingSuperHeroSection';
import { InboundCampaign } from './src/components/Pages/LandingPage/SuperHeroSection/InboundSuperHeroSection';
import { OutboundCampaign } from './src/components/Pages/LandingPage/SuperHeroSection/OutboundSuperHeroSection';
import { Organization } from './src/components/Pages/OrganizationDetailPage';
import { Talent } from './src/components/Pages/TalentDetailPage';
import { CloudinaryImage } from './src/types/common';
import { CloudinaryAsset } from './graphql-types';

export const sourceNodes = ({ actions }: SourceNodesArgs) => {
  const { createTypes } = actions;

  const typeDefs = `
    type StrapiVenueAddress implements Node {
      extended_address: String
      street_address: String
      city: String
      state: String
      postal_code: String
      country_name: String
    }

    type StrapiVenue implements Node {
      id: Int
      name: String
      slug_name: String
      link: String
      lat: Float
      lng: Float
      website_url: String
      cover_image: File
      gallery: [File]
      description: String
      isConfirmed: Boolean
      address: StrapiVenueAddress
      video_url: String
      events: [StrapiFestival]
      videoThumbnail: File
    }

    type StrapiFestival implements Node {
      strapiId: Int
      name: String
      slug_name: String
      description: String
      summary: String
      credit_cost: Int
      cover_image: File
      external_img_url: String
      gallery: [File]
      festivalcategories: [StrapiInterest]
      child_ids: [StrapiChildIDs]
      capacity: Int
      start: Date
      end: Date
      address: String
      location: String
      city: String
      state: String
      country: String
      lat: Float
      lng: Float
      website_url: String
      facebook_url: String
      contact_email: String
      updated_at: String
      partner: StrapiPartner
      venue: StrapiVenue
      lineup_talent: [StrapiTalent]
      isActive: Boolean
      isClaimed: Boolean
      isFeatured: Boolean
      isConfirmed: Boolean
      isParent: Boolean
      tickets: [StrapiProduct]
      video_url: String
      videoThumbnail: File
      order: Int
      amenities: Amenities
    }

    type Amenities implements Node {
      hasFood: Boolean
      hasPrizes: Boolean
      hasVipAccess: Boolean
      hasRestrooms: Boolean
      hasMerchBooth: Boolean
      hasFreeParking: Boolean
      hasMeetAndGreet: Boolean
      hasWheelchairAccess: Boolean
      hasPublicTransAccess: Boolean
    }

    type StrapiFestivalPartner implements Node {
      slug_name: String
    }

    type StrapiTalent implements Node {
      strapiId: Int
      id: Int
      name: String
      slug_name: String
      website_url: String
      facebook_url: String
      instagram_url: String
      twitter_url: String
      description: String
      image: File
      gallery: [File]
      events: [StrapiFestival]
    }

    type StrapiVenueEvents implements Node {
      cover_image: File
    }

    type StrapiPartnerEvents implements Node {
      name: String
      start: String
      summary: String
      slug_name: String
      credit_cost: Int
      cover_image: File
    }

    type StrapiPartner implements Node {
      id: Int
      name: String
      slug_name: String
      website_url: String
      description: String
      logo: File
      gallery: [File]
      events: [StrapiPartnerEvents]
    }

    type StrapiPage implements Node {
      image: File
    }

    type StrapiOutboundcampaign implements Node {
      campaign_id: String
      cta_button_label: String
      headline: String
      headline_2: String
      subtitle: String
      body_content: String
      hero_image: File
    }

    type StrapiProduct implements Node {
      interval: String
      bonus_tickets: Boolean
      display_price: String
      credits_awarded: Int
      credit_cost: Int
      referral_multiplier: Float
      stripe_plan_id: String
    }

    type StrapiInboundcampaign implements Node {
      name: String
      campaign_id: String
      super_hero_content: String
      cta_button_label: String
      giftproducts: [StrapiProduct]
    }

    type StrapiInterest implements Node {
      strapiId: Int
      name: String
      hero_image: File
      cover_image: File
    }

    type StrapiChildIDs implements Node {
      name: String
      slug_name: String
      summary: String
      cover_image: File
      credit_cost: String
      start: String
      end: String
    }

    type HeaderPromo {
      title: String
      content: String
      hero_image: File
      cta_btn_label: String
      cta_url: String
    }

    type FooterPromo {
      title: String
      content: String
      hero_image: File
      cta_btn_label: String
      cta_url: String
    }

    type StrapiNewsletterPromotion implements Node {
      name: String
      notes: String
      isActive: Boolean
      header_promo: HeaderPromo
      footer_promo: FooterPromo
    }

    type StrapiPodcast implements Node {
      slug: String
      title: String
      content: String
      audio: String
      video_url: String
      cover_image: File
    }
  `;

  createTypes(typeDefs);
};

interface StrapiItems<T> {
  edges: { node: T }[];
}

export interface StoriesEpisodeDetails {
  slug: string;
  title: string;
  content: string;
  audio: string;
  video_url: string;
  cover_image: CloudinaryImage;
  coverPhoto: CloudinaryAsset; // see onCreateNode in the bottom of the file to understand this field
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql<{
    stories: StrapiItems<StoriesEpisodeDetails>;
    genres: StrapiItems<{
      strapiId: number;
      name: string;
      hero_image?: CloudinaryImage;
      isBaseCategory?: boolean;
    }>;
    inboundCampaigns: StrapiItems<InboundCampaign | GiftingCampaign>;
    outboundCampaigns: StrapiItems<OutboundCampaign>;
    events: StrapiItems<Event>;
    organizations: StrapiItems<Organization>;
    talents: StrapiItems<Talent>;
  }>(`
    query {
      stories: allStrapiPodcast(filter: { isActive: { eq: true } }) {
        edges {
          node {
            slug
            title
            content
            audio
            video_url
            coverPhoto {
              fixed(width: 300, height: 300) {
                ...CloudinaryAssetFixed
              }
            }
          }
        }
      }
      genres: allStrapiInterest(filter: { isActive: { eq: true } }) {
        edges {
          node {
            id
            strapiId
            name
            isBaseCategory
            hero_image {
              childCloudinaryAsset {
                fluid {
                  ...CloudinaryAssetFluid
                }
              }
              url
            }
          }
        }
      }
      inboundCampaigns: allStrapiInboundcampaign(filter: { isActive: { eq: true } }) {
        edges {
          node {
            name
            campaign_id
            super_hero_content
            cta_button_label
            giftproducts {
              id
              interval
              bonus_tickets
              display_price
              credits_awarded
              referral_multiplier
              stripe_plan_id
            }
          }
        }
      }
      outboundCampaigns: allStrapiOutboundcampaign(filter: { isActive: { eq: true } }) {
        edges {
          node {
            campaign_id
            cta_button_label
            headline
            headline_2
            subtitle
            body_content
            hero_image {
              childCloudinaryAsset {
                fluid {
                  ...CloudinaryAssetFluid
                }
              }
              url
            }
          }
        }
      }
      events: allStrapiFestival {
        edges {
          node {
            strapiId
            name
            description
            slug_name
            address
            external_img_url
          }
        }
      }
      organizations: allStrapiPartner {
        edges {
          node {
            strapiId
            id
            name
            slug_name
            website_url
            description
            logo {
              childCloudinaryAsset {
                fluid {
                  ...CloudinaryAssetFluid
                }
              }
              url
            }
            gallery {
              id
              url
            }
            events {
              id
              name
              start
              summary
              slug_name
              credit_cost
              cover_image {
                childCloudinaryAsset {
                  fluid {
                    ...CloudinaryAssetFluid
                  }
                }
                url
              }
            }
          }
        }
      }
      talents: allStrapiTalent {
        edges {
          node {
            strapiId
            id
            name
            slug_name
            website_url
            facebook_url
            twitter_url
            instagram_url
            description
            image {
              childCloudinaryAsset {
                fluid {
                  ...CloudinaryAssetFluid
                }
              }
              url
            }
            gallery {
              id
              url
            }
            events {
              id
              name
              start
              summary
              slug_name
              credit_cost
              cover_image {
                childCloudinaryAsset {
                  fluid {
                    ...CloudinaryAssetFluid
                  }
                }
                url
              }
            }
          }
        }
      }
    }

    fragment CloudinaryAssetFixed on CloudinaryAssetFixed {
      base64
      height
      src
      srcSet
      width
    }

    fragment CloudinaryAssetFluid on CloudinaryAssetFluid {
      aspectRatio
      base64
      sizes
      src
      srcSet
    }
  `);

  // TODO: tags is missing for venues

  if (data) {
    // Optional chaining (data?.allStrapiInterest...) would be better but the compiler complains with 'unexpected token .'
    data.genres.edges.forEach(({ node: { strapiId, name, hero_image, isBaseCategory } }) => {
      if (hero_image) {
        createPage({
          path: `/genre/${strapiId}`,
          component: require.resolve('./src/components/Pages/LandingPage/GenreLandingPage.tsx'),
          context: {
            genre: name,
            heroImage: hero_image.childCloudinaryAsset && hero_image.childCloudinaryAsset.fluid,
            isBaseCategory,
          },
        });
      }
    });

    data.inboundCampaigns.edges.forEach(({ node: campaign }) => {
      if (!isEmpty((campaign as GiftingCampaign).giftproducts)) {
        createPage({
          path: `/gifting/${campaign.campaign_id}`,
          component: require.resolve(
            './src/components/Pages/LandingPage/GiftingCampaignLandingPage.tsx'
          ),
          context: { campaign_id: campaign.campaign_id, name: campaign.name },
        });
      } else {
        createPage({
          path: `/inbound/${campaign.campaign_id}`,
          component: require.resolve(
            './src/components/Pages/LandingPage/InboundCampaignLandingPage.tsx'
          ),
          context: { inboundCampaign: campaign },
        });
      }
    });

    data.outboundCampaigns.edges.forEach(({ node: outboundCampaign }) => {
      createPage({
        path: `/outbound/${outboundCampaign.campaign_id}`,
        component: require.resolve(
          './src/components/Pages/LandingPage/OutboundCampaignLandingPage.tsx'
        ),
        context: { outboundCampaign },
      });
    });

    data.events.edges.forEach(({ node: event }) => {
      createPage({
        path: `/events/${event.slug_name}`,
        component: require.resolve('./src/components/Pages/EventDetailPage/index.tsx'),
        context: {
          event: { ...event, id: event.strapiId },
          categories: data.genres.edges.map(({ node: { strapiId, name } }) => ({
            id: strapiId,
            name,
          })),
        },
      });
    });

    data.organizations.edges.forEach(({ node: organization }) => {
      createPage({
        path: `/organizations/${organization.slug_name}`,
        component: require.resolve('./src/components/Pages/OrganizationDetailPage/index.tsx'),
        context: {
          organization: { ...organization, id: organization.strapiId },
        },
      });
    });

    data.talents.edges.forEach(({ node: talent }) => {
      createPage({
        path: `/talent/${talent.slug_name}`,
        component: require.resolve('./src/components/Pages/TalentDetailPage/index.tsx'),
        context: {
          talent: { ...talent, id: talent.strapiId },
        },
      });
    });

    data.stories.edges.forEach(({ node }) => {
      createPage({
        path: `/stories/${node.slug}`,
        component: require.resolve('./src/components/Pages/StoriesEpisodePage/index.tsx'),
        context: { episode: node },
      });
    });

    const now = moment().utc().format();

    createPage({
      path: '/events',
      component: require.resolve('./src/components/Pages/EventsPage/index.tsx'),
      context: {
        now,
      },
    });

    createPage({
      path: '/talents',
      component: require.resolve('./src/components/Pages/TalentsPage/index.tsx'),
      context: {
        now,
      },
    });

    createPage({
      path: '/search',
      component: require.resolve('./src/components/Pages/SearchPage/index.tsx'),
      context: {
        now,
        categories: data.genres.edges.map(({ node: { strapiId, name, isBaseCategory } }) => ({
          id: strapiId,
          name,
          isBaseCategory,
        })),
      },
    });
  }
};

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        vfile: require.resolve('vfile'),
        assert: require.resolve('assert'),
      },
    },
    plugins: [new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(en)$/)],
  });
};

export const onCreatePage: GatsbyNode['onCreatePage'] = async ({ page, actions }) => {
  const { createPage } = actions;

  /**
   * Other solution for dynamic client paths:
   * https://www.gatsbyjs.com/plugins/gatsby-plugin-create-client-paths/
   */
  if (page.path.match(/^\/venues/)) {
    page.matchPath = '/venues/*';
    createPage(page);
  }

  if (page.path.match(/^\/hotels/)) {
    page.matchPath = '/hotels/*';
    createPage(page);
  }
};

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  actions: { createNode },
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  if (node.internal.type === 'StrapiPodcast') {
    const url = node.cover_image
      ? (node.cover_image as any).url
      : 'https://res.cloudinary.com/festivalpass/image/upload/v1629004663/medium_introducing_festivalpass_stories_behind_the_scene_stories_of_the_worlds_greatest_live_events_d77ec9df57.jpg';

    await createRemoteImageNode({
      url,
      parentNode: node,
      relationshipName: 'coverPhoto',
      createNode,
      createNodeId,
      createContentDigest,
      reporter,
    });
  }
};
