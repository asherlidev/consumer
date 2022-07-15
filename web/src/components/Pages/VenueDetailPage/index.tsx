import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { head } from 'lodash';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';

import useWindowDimensions from '../../../utils/useWindowDimensions';
import { Maybe } from '../../../../graphql-types';
import colors from '../../../constants/colors';
import { CloudinaryImage, GalleryImage } from '../../../types/common';
import { Btn } from '../../Elements';
import { LinkedEvent } from '../../Elements/LinkedEventsSection';
import NormalChip from '../../Elements/NormalChip';
import ScrollToTop from '../../Elements/ScrollToTop';
import { CenteredLoading } from '../../Elements';
import { Footer, Header, PageWrapper } from '../../Layout';
import locationIcon from '../EventDetailPage/EventDetailPageContent/icons/locationIcon.svg';
import * as S from './styles';
import LinkIcon from './icons/link-icon.svg';
import shareIcon from '../EventDetailPage/EventDetailPageContent/icons/shareIcon.svg';
import heartIcon from './icons/heart-white-outline-icon.svg';
import { GatsbyEvent } from '../EventDetailPage/EventDetailPageContent';
import EventsImageGallery from '../EventDetailPage/EventsImageGallery';
import CarIcon from '../EventDetailPage/EventDetailPageContent/icons/car-icon.svg';
import foodIcon from '../EventDetailPage/EventDetailPageContent/icons/food-icon.svg';
import meetIcon from '../EventDetailPage/EventDetailPageContent/icons/meet-icon.svg';
import pricesIcon from '../EventDetailPage/EventDetailPageContent/icons/prices-icon.svg';
import restroomIcon from '../EventDetailPage/EventDetailPageContent/icons/restroom-icon.svg';
import busIcon from '../EventDetailPage/EventDetailPageContent/icons/bus-icon.svg';
import tsirtIcon from '../EventDetailPage/EventDetailPageContent/icons/tsirt-icon.svg';
import vipIcon from '../EventDetailPage/EventDetailPageContent/icons/vip-icon.svg';
import VanueEvents from '../../Elements/VenuesEvents';
import SimilarVenuesCards from '../../Elements/SimilarVenuesCards';
import VenueCards from '../../Elements/VenueCards/VenueCards';
import NotFoundPage from '../../../components/Pages/NotFoundPage';
import { VENUE_BY_SLUG_QUERY } from '../../../utils/gqlQueries';
import moment from 'moment';
import EventShareButton from '../EventDetailPage/EventShareButton';

interface VenueAddress {
  city: string;
  country_name: string;
  extended_address: Maybe<string>;
  postal_code: string;
  state: string;
  street_address: string;
}

export interface Venue {
  id: number;
  strapiId: number;
  name: string;
  address: VenueAddress;
  description: string;
  events: LinkedEvent[];
  external_id: Maybe<string>;
  isConfirmed: boolean;
  lat: number;
  link: Maybe<string>;
  lng: number;
  slug_name: string;
  tags: any[]; // TODO: update
  website_url: Maybe<string>;
  cover_image: Maybe<CloudinaryImage>;
  external_img_url?: Maybe<string>;
  full_location?: Maybe<string>;
  gallery: GalleryImage[];
  amenities: {
    hasFood: boolean;
    hasPrizes: boolean;
    hasVipAccess: boolean;
    hasRestrooms: boolean;
    hasMerchBooth: boolean;
    hasFreeParking: boolean;
    hasMeetAndGreet: boolean;
    hasWheelchairAccess: boolean;
    hasPublicTransAccess: boolean;
  };
  updated_at?: string;
}

// const getAlgoliaSearchConfig = ({ latitude, longitude }: Coordinates) => ({
//   aroundLatLng: `${latitude},${longitude}`,
//   aroundRadius: 400000,
// });

const VenueDetailPage: React.FC<RouteComponentProps<{ slug: string }>> = ({ slug }) => {
  const { loading, error, data } = useQuery(VENUE_BY_SLUG_QUERY, { variables: { slug } });
  const [fetchingCityLocationVenues, setFetchingCityLocationVenues] = useState<boolean>(false);
  const [similarVenues, setSimilarVenues] = useState<Venue[]>([]);

  const venue = data && data.venues.length > 0 ? (data.venues[0] as Venue) : null;

  const {
    name = '',
    description = '',
    address,
    lat,
    lng,
    gallery,
    cover_image,
    website_url,
    amenities,
    events,
  } = venue || {};

  const now = moment().unix();

  const checkDate = (i) => {
    if (i && i.start) {
      const date = moment(i.start).unix();
      if (date >= now) {
        return true;
      }
    }
    return false;
  };

  const newEvents = events ? events.filter(checkDate) : [];

  const fetchCityLocationVenues = useCallback(async () => {
    try {
      const algolia = (await import('../../../utils/algoliaClient')).venues;
      setFetchingCityLocationVenues(true);
      await algolia.setSettings({});
      const { hits } = await algolia.search(address ? address.city : '');

      setSimilarVenues(() => hits as any);
    } catch (error) {
      console.error(error);
    }
    setFetchingCityLocationVenues(false);
  }, []);

  useEffect(() => {
    if (venue) fetchCityLocationVenues();
  }, [venue, fetchCityLocationVenues]);

  const { t } = useTranslation();

  const breakpoints = useBreakpoint();
  const windowDimensions = useWindowDimensions();

  const locationMapWidth = useMemo(() => {
    const PADDING_IN_PX = 20;

    if (breakpoints.lgUp) {
      return 1170 - 2 * PADDING_IN_PX;
    } else if (breakpoints.mdUp) {
      return 970 - 2 * PADDING_IN_PX;
    } else if (breakpoints.smUp) {
      return 750 - 2 * PADDING_IN_PX;
    }
    return (windowDimensions?.width || 750) - 3 * PADDING_IN_PX;
  }, [breakpoints.lgUp, breakpoints.mdUp, breakpoints.smUp, windowDimensions?.width]);

  const locationText = useMemo(() => {
    if (!address) {
      return undefined;
    }
    const { street_address, city, state, extended_address, postal_code } = address;
    return `${street_address}${
      extended_address ? ' ' + extended_address : ''
    }, ${city}, ${state} ${postal_code}`;
  }, [address]);

  const amenMap = {
    hasFood: {
      text: 'Food available to purchase',
      icon: foodIcon,
    },
    hasPrizes: {
      text: 'Prizes & Giveaways',
      icon: pricesIcon,
    },
    hasVipAccess: {
      text: 'VIP access',
      icon: vipIcon,
    },
    hasRestrooms: {
      text: 'Restrooms available',
      icon: restroomIcon,
    },
    hasMerchBooth: {
      text: 'Merch booth',
      icon: tsirtIcon,
    },
    hasFreeParking: {
      text: 'Free parking',
      icon: CarIcon,
    },
    hasMeetAndGreet: {
      text: 'Meet and greet',
      icon: meetIcon,
    },
    hasWheelchairAccess: {
      text: 'Wheelchair accessible',
      icon: CarIcon,
    },
    hasPublicTransAccess: {
      text: 'Access to public transportation',
      icon: busIcon,
    },
  };

  const pageTitle = venue ? `Festival Pass - ${venue.name}` : 'Festival Pass - Live. Life. Live.';
  const pageDescription = venue ? venue.description : '';

  return (
    <>
      <Helmet>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={pageDescription} key="ogdesc" />
        <meta property="og:image" content={venue?.cover_image?.url} key="ogimage" />
        <title>{pageTitle}</title>
      </Helmet>
      <ScrollToTop />
      <Header withoutBottomBorder />
      {loading && <CenteredLoading />}
      {error && <div>{error}</div>}
      {!loading && !venue && (
        <PageWrapper backgroundColor={colors.white}>
          <S.NotFoundWrapper>
            <NotFoundPage />
          </S.NotFoundWrapper>
        </PageWrapper>
      )}
      {!loading && venue && (
        <PageWrapper backgroundColor={colors.white}>
          <S.Content className="">
            <S.Infoheader className="row">
              <div className="col-md-8 col-xs-12">
                {/* <Chip backgroundColor="#00B7EB" text={t('venueDetailPageContent.chip.venue')} /> */}
                <S.ChipsContainer>
                  <NormalChip
                    backgroundColor={colors.searchIconColor}
                    fontColor={colors.white}
                    label={t('venueDetailPageContent.chip.venue')}
                  />
                </S.ChipsContainer>
                <S.TitleContainer>{name}</S.TitleContainer>
              </div>
            </S.Infoheader>

            <S.EventInfoRow>
              <S.FlexInfoSection>
                {locationText && (
                  <span>
                    <img src={locationIcon} alt="Location icon" />
                    <small>
                      {locationText ? locationText : t('eventDetailPageContent.date.placeholder')}
                    </small>
                  </span>
                )}
                <span>
                  <img src={LinkIcon} alt="Link icon" />
                  {website_url ? (
                    <a href={website_url || ''}> Website</a>
                  ) : (
                    <small>No website available</small>
                  )}
                </span>
              </S.FlexInfoSection>

              {breakpoints.smUp && (
                <div>
                  <EventShareButton text={'venue'} />
                  {/* <S.FavouriteBtn>
                    <img src={heartIcon} alt="icon" />
                    <a>{t('venueDetailPageContent.favorite')}</a>
                  </S.FavouriteBtn> */}
                </div>
              )}
            </S.EventInfoRow>

            <EventsImageGallery event={{ cover_image, gallery } as GatsbyEvent} />

            {/* <GatsbyEventImageGallery event={{ cover_image, gallery }} /> */}

            {!breakpoints.smUp && (
              <S.ShareAndLikeContainer>
                <div>
                  {/* <S.FavouriteBtn>
                    <img src={heartIcon} alt="icon" />
                    <a>{t('venueDetailPageContent.favorite')}</a>
                  </S.FavouriteBtn> */}
                  <EventShareButton text={'venue'} />
                </div>
              </S.ShareAndLikeContainer>
            )}

            <S.DescriptionTitle>{t('venueDetailPageContent.description.title')}</S.DescriptionTitle>

            <S.DescriptionContainer>
              <S.DescriptionVanue>
                {description ||
                  head(events)?.summary ||
                  t('venueDetailPageContent.description.placeholder')}
              </S.DescriptionVanue>
              <S.featuresVanue>
                {amenities &&
                  Object.keys(amenities).map((amen, index) => {
                    const amenKey = amen as keyof typeof amenMap;

                    if (!amenities || !amenities[amenKey]) return;

                    return (
                      <S.FeatureContainer key={index}>
                        <img src={amenMap[amenKey].icon} alt="icon" />
                        <p>{amenMap[amenKey].text}</p>
                      </S.FeatureContainer>
                    );
                  })}
              </S.featuresVanue>
            </S.DescriptionContainer>

            {lat && lng && (
              <S.VenueLocationMap
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+F50756(${lng},${lat})/${lng},${lat},${14},0/${locationMapWidth}x400?access_token=${
                  process.env.GATSBY_MAPBOX_KEY
                }`}
                height="400"
                width={locationMapWidth}
                // alt={event.name}
              />
            )}
          </S.Content>
          <S.EventVanueContainer>
            <VanueEvents events={newEvents || []} />
          </S.EventVanueContainer>

          <S.Content>
            <S.SimilarVenueContainer>
              <S.DescriptionTitle>{t('venueDetailPageContent.similervanue')}</S.DescriptionTitle>
              <VenueCards venues={similarVenues} withoutPadding={true} />
            </S.SimilarVenueContainer>
          </S.Content>
        </PageWrapper>
      )}
      <Footer />
    </>
  );
};

export default VenueDetailPage;
