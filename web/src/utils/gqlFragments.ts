import { gql } from '@apollo/client';

// TODO: reconcile with fragments.ts (apollo vs gatsby)
const fragments = {
  festivalDetails: gql`
    fragment FestivalDetails on Festival {
      __typename
      id
      name
      slug_name
      description
      credit_cost
      cover_image {
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
      lat
      lng
      video_url
      gallery {
        id
        url
      }
      website_url
      facebook_url
      contact_email
      partner {
        id
        name
        slug_name
      }
      isActive
      isClaimed
      isConfirmed
      tickets {
        id
        name
        credit_cost
        event_date
      }
      venue {
        id
        slug_name
        lat
        lng
      }
      lineup_talent {
        id
        name
        image {
          url
        }
        slug_name
      }
      isPrivate
      badge {
        id
        name
        price
        icon {
          url
        }
      }
    }
  `,
  eventCard: gql`
    fragment EventCard on Festival {
      __typename
      id
      start
      end
      updated_at
      slug_name
      cover_image {
        id
        url
      }
      festivalcategories {
        id
        name
      }
      isConfirmed
      name
      location
    }
  `,
  venueCard: gql`
    fragment VenueCard on Venue {
      __typename
      id
      updated_at
      slug_name
      cover_image {
        id
        url
      }
      isConfirmed
      name
      address {
        street_address
        extended_address
        city
        state
        postal_code
        country_name
      }
    }
  `,
  userDetails: gql`
    fragment UserDetails on UsersPermissionsUser {
      __typename
      id
      confirmed
      blocked
      username
      email
      first_name
      last_name
      credit_balance
      stripe_id
      referral_code
      referral_url
      isPaidSubscriber
      isPrepaidSubscriber
      membership
      personalized_newsletter_optIn
      referrals {
        id
        first_name
        last_name
        confirmed
        isPaidSubscriber
        profile_img {
          url
        }
      }
      interested_festivals {
        id
        name
        start
        end
        cover_image {
          url
        }
        festivalcategories {
          id
          name
        }
        slug_name
      }
      profile_img {
        url
        id
      }
      geolocation {
        lat
        lng
      }
      partner {
        id
        organization
        name
        slug_name
      }
      interests {
        id
        name
      }
      badges {
        id
        name
        price
        icon {
          url
        }
      }
      primary_badge {
        id
        name
        price
        icon {
          url
        }
      }
    }
  `,
};

export default fragments;
