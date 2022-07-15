import { gql } from '@apollo/client';
import { format } from 'date-fns';

import fragments from './gqlFragments';

export const getPartnerQuery = (partnerId: string) => {
  return {
    query: gql`
    {
      partner(id: ${partnerId}) {
        id
        name
        description
        organization
        events {
          ...FestivalDetails
        }
      }
    }
    ${fragments.festivalDetails}`,
  };
};

// The whole where clause needs to be passed down due how Strapi types the GraphQL schema
// More info: https://stackoverflow.com/questions/58334265/strange-issue-with-usequery-query-arguments-not-being-read
export const FESTIVAL_BY_SLUG_QUERY = gql`
  query FestivalBySlugQuery($where: JSON) {
    festivals(where: $where) {
      ...FestivalDetails
    }
  }
  ${fragments.festivalDetails}
`;

// TODO: upgrade Strapi version because the filter conditions aren't working properly
// see https://github.com/festival-pass/consumer/issues/245
export const CATEGORIES_QUERY = gql`
  {
    categories: interests(sort: "id:asc", where: { isActive: true }) {
      id
      name
    }
  }
`;

// TODO: upgrade Strapi version because the filter conditions aren't working properly
// see https://github.com/festival-pass/consumer/issues/245
export const CATEGORIES_QUERY_WITH_IMAGE = gql`
  {
    categories: interests(sort: "id:asc", where: { isActive: true, isBaseCategory: true }) {
      id
      name
      cover_image {
        url
      }
    }
  }
`;

export const getOfferCheckoutQuery = (campaignId: string) => gql`
  query {
    outboundcampaigns(where:{campaign_id: "${campaignId}"}) {
      id
      campaign_id
      cta_button_label
      headline
      headline_2
      subtitle
      body_content
    }
    promoOfferPage {
      id
      title
      content
      upsell {
        price
        title
        summary
        img_url
        image_alt_txt
      }
    }
  }`;

export const getCouponSku = (campaignId: number) => gql`
  query {
    couponskus(where:{outboundcampaign: "${campaignId}"}) {
      id
      name
      description
      product_id
      price
      amount_off
    }
  }
`;

export const getOfferPaymentSuccessQuery = () => gql`
  query {
    offerSuccessPage {
      id
      title
      content
      bullet1
      bullet2
      bullet3
      primary_btn_url
      primary_btn_label
      secondary_btn_url
      secondary_btn_label
    }
  }
`;

export const searchHotels = (query: {
  hotelIds?: string;
  name?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  inDate?: number;
  outDate?: number;
  rooms?: number;
  adults?: number;
  children?: number;
  maxResults?: number;
  getDetails?: boolean;
  page?: number;
}) => {
  const whereClause = Object.keys(query)
    .map((key) => {
      const typedKey = key as keyof typeof query;

      if (query[typedKey]) {
        if (typeof query[typedKey] === 'string') return `${typedKey}: "${query[typedKey]}"`;
        if (typedKey === 'inDate' || typedKey === 'outDate')
          return `${typedKey}: "${format(query[typedKey]!, 'yyyy-MM-dd')}"`;
        return `${typedKey}: ${query[typedKey]}`;
      }
      return;
    })
    .filter((item) => !!item)
    .join(', ');

  return gql`
    query {
      hotels(where: { ${whereClause} }) {
        id
        name
        images {
          url
        }
        address {
          street_address
          extended_address
          city
          state
          country_name
          postal_code
        }
        description
        latitude
        longitude
        rating
        rooms {
          ratePlanCode
          code
          name
          description
          nightlyRate
          tax
          total
          bookingFee
          inDate
          outDate
        }
      }
    }`;
};

export const getHotelById = (id: number) => {
  return gql`
    query {
      hotel(id: ${id}) {
        id
        name
        description
        amenities {
          name
        }
        images {
          url
        }
        address {
          street_address
          extended_address
          city
          state
          country_name
          postal_code
        }
        latitude
        longitude
        rating
        rooms {
          ratePlanCode
          code
          name
          description
          nightlyRate
          tax
          total
          bookingFee
          inDate
          outDate
        }
      }
    }`;
};
export const EVENT_QUERY = gql`
  query event($id: ID!) {
    festival(id: $id) {
      id
      name
      slug_name
      description
      credit_cost
      external_id
      cover_image {
        # childCloudinaryAsset {
        #   fluid {
        #     ...CloudinaryAssetFluid
        #   }
        # }
        url
      }
      gallery {
        id
        url
      }
      festivalcategories {
        id
        name
      }
      capacity
      start
      end
      address
      location
      city
      state
      country
      slug_name
      lat
      lng
      website_url
      facebook_url
      contact_email
      updated_at
      partner {
        id
        name
        slug_name
      }
      venue {
        slug_name
      }
      lineup_talent {
        id
        name
        slug_name
        image {
          #   childCloudinaryAsset {
          #     fixed(width: 225, height: 149) {
          #       ...CloudinaryAssetFixed
          #     }
          #   }
          url
        }
      }
      amenities {
        hasFood
        hasPrizes
        hasVipAccess
        hasRestrooms
        hasMerchBooth
        hasFreeParking
        hasMeetAndGreet
        hasWheelchairAccess
        hasPublicTransAccess
      }
      isActive
      isClaimed
      isConfirmed
      isParent
      child_ids {
        name
        slug_name
        summary
        cover_image {
          #     childCloudinaryAsset {
          #       fluid {
          #         ...CloudinaryAssetFluid
          #       }
          #     }
          url
        }
        credit_cost
        start
        end
      }
      select_ticket_seating {
        configId
        mapName
        mapUrl
      }
      tickets {
        id
        name
        credit_cost
        event_date
      }
      video_url
      # videoThumbnail {
      #   childCloudinaryAsset {
      #     fluid {
      #       ...CloudinaryAssetFluid
      #     }
      #   }
      # }
      isPrivate
      badge {
        id
        name
        icon {
          url
        }
        price
      }
    }
  }
`;

export const VENUE_BY_SLUG_QUERY = gql`
  query venueBySlug($slug: String) {
    venues(where: { slug_name: $slug }) {
      id
      name
      slug_name
      link
      lat
      lng
      website_url
      gallery {
        id
        url
      }
      description
      address {
        street_address
        extended_address
        city
        state
        postal_code
        country_name
      }
      cover_image {
        url
      }
      video_url
      events {
        name
        slug_name
        start
        summary
        credit_cost
        cover_image {
          url
        }
      }
    }
  }
`;
