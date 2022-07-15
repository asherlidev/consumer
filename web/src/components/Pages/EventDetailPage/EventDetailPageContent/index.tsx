import { gql, useQuery } from '@apollo/client';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { find, get, isEmpty, map, toInteger } from 'lodash';
import moment from 'moment';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';

import fragments from '../../../../utils/gqlFragments';
import { Maybe, EventDetailsCardQuery } from '../../../../../graphql-types';
import colors from '../../../../constants/colors';
import { dateFormat } from '../../../../constants/datetime';
import { useAuth } from '../../../../context/auth';
import { useClaimEvent } from '../../../../context/claim-event';
import { CloudinaryImage, GalleryImage } from '../../../../types/common';
import { isVirtualEvent } from '../../../../utils/eventUtils';
import useWindowDimensions from '../../../../utils/useWindowDimensions';
import { Btn, Button, Chip, Title } from '../../../Elements';
import CardTalents from '../../../Elements/CardTalents';
import { FlameIcon } from '../../../Icons';
import EventInterestButton from '../EventInterestButton';
import EventShareButton from '../EventShareButton';
import EventsImageGallery from '../EventsImageGallery';
import PreviewEventImageGallery from '../PreviewEventImageGallery';
import TicketsContent from '../TicketsContent';
import SeaticsMap from '../SeaticsMap';
import calendarIcon from './icons/calendarIcon.svg';
import creditsIcon from './icons/creditsIcon.svg';
import locationIcon from './icons/locationIcon.svg';
import CarIcon from './icons/car-icon.svg';
import foodIcon from './icons/food-icon.svg';
import meetIcon from './icons/meet-icon.svg';
import pricesIcon from './icons/prices-icon.svg';
import restroomIcon from './icons/restroom-icon.svg';
import busIcon from './icons/bus-icon.svg';
import tsirtIcon from './icons/tsirt-icon.svg';
import vipIcon from './icons/vip-icon.svg';
import star from './icons/Star.svg';
import * as S from './styles';
import RatingBar from '../../../Elements/RatingBar';
import CommentCard from '../../../Elements/CommentCard';
import FestivalPassChip from '../../../Elements/FestivalPassChip';
import NormalChip from '../../../Elements/NormalChip';
import RecommendedEventsCards from '../../../Elements/RecommendedEventsCards';
import RecommendedHotelsCards from '../../../Elements/RecommendedHotelsCards';
import { MainCategories } from '../../SearchPage/MainCategories';
import VanueEvents from '../../../Elements/VenuesEvents';
import { ApolloCardEvent } from '../../../Elements/EventCard/EventCard';
import { CATEGORIES_QUERY_WITH_IMAGE } from '../../../../utils/gqlQueries';
import { useUser } from '../../../../context/user';

export interface Category {
  id: string;
  name: string;
  isBaseCategory?: boolean;
}

export interface Ticket {
  id: string;
  name: string;
  credit_cost: number;
  event_date: string;
}

export interface ChildIds {
  name?: string;
  description?: string;
  cover_image?: Maybe<CloudinaryImage>;
  credit_cost?: string;
  days?: string;
  start?: string;
  end?: string;
  slug_name?: string;
}

export interface BadgeIcon {
  url: string;
}

export interface Event {
  id: number;
  strapiId: number;
  external_id: string;
  name: string;
  slug_name: string;
  description: string;
  credit_cost: number;
  festivalcategories: Category[];
  capacity: number;
  start: string;
  end: string;
  address: string;
  location: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  video_url: string;
  website_url: string;
  facebook_url: string;
  contact_email: string;
  partner: {
    id: string;
    name: string;
    slug_name: string;
  };
  isActive: boolean;
  isClaimed: boolean;
  isConfirmed: boolean;
  isParent?: boolean;
  child_ids?: ChildIds[];
  updated_at: string;
  tickets: Ticket[];
  venue: Maybe<{
    slug_name: string;
    name: string;
  }>;
  external_img_url?: string;
  lineup_talent: {
    id: number;
    name: string;
    slug_name: string;
    image: CloudinaryImage | PreviewImage;
  }[];
  select_ticket_seating?: {
    id: string;
    configId: string;
    mapName: string;
    mapUrl: string;
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
  };
  isPrivate: boolean;
  badge?: Maybe<{ id: number; name: string; icon: BadgeIcon }>;
}

export interface GatsbyEvent extends Event {
  cover_image: Maybe<CloudinaryImage>;
  gallery: GalleryImage[];
  videoThumbnail: Maybe<CloudinaryImage>;
}

export interface PreviewImage {
  id: string;
  url: string;
  __typename: 'uploadFile';
}

export interface PreviewEvent extends Event {
  gallery: PreviewImage[];
  cover_image: Maybe<PreviewImage>;
}

interface Props {
  className?: string;
  event: GatsbyEvent | Partial<PreviewEvent>;
  categories: Category[];
  isPreview?: boolean;
}

const EventDetailPageContent: React.FC<Props> = ({ className, event, isPreview = false }) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { user } = useUser();
  const { setClaimedEvent } = useClaimEvent();
  const breakpoints = useBreakpoint();
  const windowDimensions = useWindowDimensions();
  const [recommendedEvents, setRecommendedEvents] = useState<any[]>([]);
  const [coverImage, setCoverImage] = useState<any>(null);
  const data = useStaticQuery<EventDetailsCardQuery>(eventDetailsCardQuery);
  const categoriesQuery = useQuery(CATEGORIES_QUERY_WITH_IMAGE);
  const [ticket, setTicket] = useState<any>();
  const [childEvents, setChildEvents] = useState(event.child_ids || []);
  const [seats, setSeats] = useState<number>(1);
  const [noTickets, setNoTickets] = useState<boolean>(true);

  const isParent = childEvents && childEvents.length > 0 && event.isParent;

  const [tomorrow, setTomorrow] = useState<any>(null);
  const mapRef = useRef();

  useEffect(() => {
    axios
      .get(`${process.env.GATSBY_STRAPI_API_URL}/festivals/${event.id}/find-children`)
      .then((response) => {
        if (response.data) {
          setChildEvents([...(event.child_ids || []), ...response.data]);
        }
      })
      .catch((err) => console.error('Failed to fetch children: ', err));
  }, []);

  useEffect(() => {
    if (event) {
      let image: any = null;
      const categories = categoriesQuery?.data?.categories;
      setTomorrow(moment().add(1, 'days'));

      event?.festivalcategories &&
        event?.festivalcategories.forEach((category: any) => {
          const cat =
            categories && categories.find((c: any) => parseInt(c.id) === parseInt(category.id));
          image = image || (cat && cat.cover_image);
        });

      setCoverImage(image);
    }
  }, [categoriesQuery?.data?.categories, event]);

  // Get recommended  events
  const eventsQuery = useQuery<{
    events: ApolloCardEvent[];
  }>(
    gql`
      query FilteredEventsQuery($where: JSON) {
        events: festivals(sort: "start:asc", limit: 10, where: $where) {
          ...EventCard
          external_img_url
          festivalcategories {
            id
            name
            cover_image {
              url
            }
          }
        }
      }
      ${fragments.eventCard}
    `,
    {
      variables: {
        where: {
          isActive: true,
          isConfirmed: true,
          start_gte: tomorrow, // at least 1 day in advance
        },
      },
      skip: false,
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (eventsQuery?.data?.events) {
      const details = eventsQuery?.data?.events.map((item: any) => {
        // Festival category
        const category = item.festivalcategories?.find((item: any) => item.cover_image?.url);
        const image =
          item.cover_image?.url ||
          item.external_img_url ||
          category?.cover_image?.url ||
          data?.eventPlaceholderImage?.childCloudinaryAsset?.fluid?.src;

        return {
          title: item.name,
          image,
          data: image,
          date: new Date(item.start),
          slugName: item.slug_name,
          isFestivalPass: true,
          isNew: true,
          location: item.location,
        };
      });
      setRecommendedEvents(details);
    }
  }, [eventsQuery, data]);

  const {
    id,
    external_id,
    slug_name,
    name,
    description,
    start,
    location,
    city,
    state,
    isClaimed,
    isConfirmed,
    festivalcategories,
    lat,
    lng,
    venue,
    lineup_talent,
    credit_cost,
    updated_at,
    partner,
    gallery,
    video_url,
    select_ticket_seating,
    child_ids,
    isPrivate,
    badge,
    tickets,
  } = event;

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

  const features = [
    {
      label: 'Free parking',
      logo: CarIcon,
    },
    {
      label: 'Prizes & Giveaways',
      logo: pricesIcon,
    },
    {
      label: 'Access to public transportation',
      logo: busIcon,
    },
    {
      label: 'VIP access',
      logo: vipIcon,
    },
    {
      label: 'Food available to purchase',
      logo: foodIcon,
    },
    {
      label: 'Meet and greet',
      logo: meetIcon,
    },
    {
      label: 'Restrooms available',
      logo: restroomIcon,
    },
    {
      label: 'Merch booth',
      logo: tsirtIcon,
    },
  ];

  const displayLocation =
    city && state ? `${city}, ${state}` : t('eventDetailPageContent.location.placeholder');

  const startDate = useMemo(
    () => (start ? moment(start).format(dateFormat) : t('eventDetailPageContent.date.placeholder')),
    [start, t]
  );

  const timestamp = moment(updated_at).format();
  const weekAgo = moment().utc().subtract(1, 'w').format();

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

  const renderDescriptionTitle = useMemo(
    () =>
      partner?.name && partner?.slug_name ? (
        <>
          {t('eventDetailPageContent.partner.title')}{' '}
          <Link to={`/organizations/${partner?.slug_name}`}>{partner?.name}</Link>
        </>
      ) : (
        t('eventDetailPageContent.description.title')
      ),
    [partner?.name, partner?.slug_name, t]
  );

  const userBadges: number[] = useMemo(() => map(get(user, 'badges', []), 'id'), [user]);

  // const shouldBeAllowed = useMemo(
  //   () => !!user && (!isPrivate || (!!badge && userBadges.includes(parseInt(badge.id.toString())))),
  //   [isPrivate, badge, user, userBadges]
  // );

  const [starting_credit_cost, setStartingCreditCost] = useState<any>(credit_cost);

  const renderStartingTicketPrice = useMemo(() => {
    let credits_array: any[] = [];
    tickets?.map((val, idx) => {
      if (val.credit_cost) {
        credits_array.push(val.credit_cost);
      }
    });
    credits_array = credits_array.length > 0 ? credits_array.sort((a, b) => a - b) : credits_array;
    setStartingCreditCost(credits_array[0]);
  }, [setStartingCreditCost]);

  return (
    <div className={className}>
      <S.Content className={isPreview ? '' : ''}>
        <S.Infoheader className="row">
          <div className={isPreview ? 'col-sm-12' : 'col-md-8 col-xs-12'}>
            <S.ChipsContainer>
              {isConfirmed && (
                <FestivalPassChip
                  message={t('eventDetailPageContent.hovermesssage.festivelpassmessage')}
                />
              )}
              {badge && badge.icon && (
                <NormalChip
                  backgroundColor={colors.noticeBackground}
                  label={badge.name}
                  icon={badge?.icon?.url}
                  message={isPrivate ? t('eventDetailPageContent.hovermesssage.badgemessage') : ''}
                />
              )}
              {timestamp > weekAgo && (
                <NormalChip
                  backgroundColor={colors.blue}
                  label={t('eventDetailPageContent.hovermesssage.normalchiplabel')}
                />
              )}
            </S.ChipsContainer>
            <S.TitleContainer>{name}</S.TitleContainer>
          </div>
        </S.Infoheader>

        <S.EventInfoRow>
          <S.FlexInfoSection>
            {!isParent && startDate && (
              <span>
                <img src={calendarIcon} alt="Calendar icon" />
                <small>
                  {startDate ? startDate : t('eventDetailPageContent.date.placeholder')}
                </small>
              </span>
            )}

            {starting_credit_cost || credit_cost ? (
              <span>
                <img src={creditsIcon} alt="Credits icon" />
                <small>
                  {t('eventDetailPageContent.tickets.amountInCredits', {
                    amount: starting_credit_cost || credit_cost,
                  })}
                </small>
              </span>
            ) : null}

            {location && (
              <span>
                <img src={locationIcon} alt="Location icon" />
                <small>{displayLocation}</small>
              </span>
            )}
          </S.FlexInfoSection>

          {breakpoints.smUp && (
            <div>
              <EventInterestButton
                color={colors.textDefault}
                fontSize="14px"
                eventId={toInteger(id)}
              />
              <EventShareButton />
            </div>
          )}
        </S.EventInfoRow>

        {isPreview ? (
          <PreviewEventImageGallery
            event={
              { ...event, cover_image: event.cover_image || coverImage } as Partial<PreviewEvent>
            }
          />
        ) : (
          <EventsImageGallery
            event={{ ...event, cover_image: event.cover_image || coverImage } as GatsbyEvent}
          />
        )}

        {!breakpoints.smUp && (
          <S.ShareAndLikeContainer>
            <div>
              <div style={{ display: 'flex' }}>
                <EventInterestButton
                  color={colors.textDefault}
                  fontSize="14px"
                  eventId={toInteger(id)}
                />
                <EventShareButton />
              </div>
              <p>{t('eventDetailPageContent.limitedquantity')}</p>
            </div>
          </S.ShareAndLikeContainer>
        )}

        <S.FpInterestRow className="row">
          <div className="col-xs-12 col-md-6">
            <S.CategoriesContainer>
              {festivalcategories &&
                festivalcategories.map((category) => (
                  <S.Category key={category.id}>
                    <span>{category.name}</span>
                  </S.Category>
                ))}
            </S.CategoriesContainer>
            <S.DescriptionTitle>{renderDescriptionTitle}</S.DescriptionTitle>
            <S.Description>
              {description ||
                `${event.name} ${
                  event.venue && event.venue.name ? 'live at' + event.venue.name : ''
                } ${event.city ? 'in ' + event.city : ''} ${event.state ? event.state : ''}.`}
            </S.Description>
            <S.features>
              {event.amenities
                ? Object.keys(event.amenities).map((amen, index) => {
                    const amenKey = amen as keyof typeof amenMap;

                    if (!event.amenities || !event.amenities[amenKey]) return;

                    return (
                      <S.FeatureContainer key={index}>
                        <img src={amenMap[amenKey].icon} alt="icon" />
                        <p>{amenMap[amenKey].text}</p>
                      </S.FeatureContainer>
                    );
                  })
                : features.map((item) => (
                    <S.FeatureContainer key={item.label}>
                      <img src={item.logo} alt="car" />
                      <p>{item.label}</p>
                    </S.FeatureContainer>
                  ))}
            </S.features>
          </div>

          <div className="col-xs-12 col-md-5 col-md-offset-1">
            {!isParent && (
              <TicketsContent
                event={event as GatsbyEvent}
                calculatedCreditPrice={starting_credit_cost}
                ticket={ticket}
                setSeats={setSeats}
                seats={seats}
                mapRef={mapRef}
                disabled={!ticket}
                noTickets={noTickets}
              />
            )}

            {!isClaimed && (
              <S.ClaimEventContainer>
                {t('eventDetailPageContent.claim.title')} &nbsp;
                <Link
                  onClick={() => {
                    setClaimedEvent(event as GatsbyEvent);
                  }}
                  to={`/app/events/${slug_name}/claim`}
                >
                  {t('eventDetailPageContent.claim.callToAction')}
                </Link>
              </S.ClaimEventContainer>
            )}
          </div>
        </S.FpInterestRow>

        {!isEmpty(lineup_talent) && (
          <S.TalentsContainer>
            <S.DescriptionTitle>{t('eventDetailPageContent.talent.title')}</S.DescriptionTitle>
            <S.TalentPodRow className="col-xs-12">
              {lineup_talent?.map(({ id, name, slug_name, image }) => (
                <S.TalentPodWrapper key={id}>
                  <Link to={`/talent/${slug_name}`}>
                    {image?.childCloudinaryAsset?.fixed ? (
                      <S.TalentGatsbyImage
                        fixed={image?.childCloudinaryAsset?.fixed.src as FixedObject}
                      />
                    ) : (image as PreviewImage)?.url ? (
                      <S.TalentPreviewImage
                        src={(image as PreviewImage)?.url}
                        width={225}
                        height={149}
                      />
                    ) : (
                      <S.TalentImagePlaceholder />
                    )}
                  </Link>
                  <p>{name}</p>
                </S.TalentPodWrapper>
              ))}
            </S.TalentPodRow>
          </S.TalentsContainer>
        )}

        {/* <S.TalentsContainer>
          <S.DescriptionTitle>{t('eventDetailPageContent.talent.title')}</S.DescriptionTitle>
          <S.TalentsCardContainer>
            {lineup_talent &&
              lineup_talent.map(({ id, name, slug_name, image }) => (
                <CardTalents
                  key={id}
                  title={name}
                  // image={cover_image && cover_image.url ? cover_image.url : undefined}
                  // data={data.eventPlaceholderImage?.childCloudinaryAsset?.fixed.src}
                  image={image.url}
                  data={image.url}
                  slugName={slug_name}
                />
              ))}
          </S.TalentsCardContainer>
        </S.TalentsContainer> */}

        {!isParent && select_ticket_seating && select_ticket_seating.mapName && (
          <div style={{ marginTop: '40px' }} ref={mapRef}>
            <S.DescriptionTitle>Tickets</S.DescriptionTitle>
            <SeaticsMap
              external_id={external_id!}
              mapName={select_ticket_seating.mapName}
              mapUrl={`https://d340sbn9oxreq3.cloudfront.net/${select_ticket_seating.mapName}_x1.png`}
              // external_id="4424801"
              // mapName="redrocksamphitheatre_endstageresv1-7-ga-8-69_2019-10-06_2019-01-17_1225_svgc"
              // mapUrl="https://d340sbn9oxreq3.cloudfront.net/redrocksamphitheatre_endstageresv1-7-ga-8-69_2019-10-06_2019-01-17_1225_svgc_x1.png"
              setTicket={setTicket}
              seats={seats}
              setNoTickets={setNoTickets}
            />
          </div>
        )}

        {!isVirtualEvent(location) && !isParent && (
          <>
            <S.Body className="row">
              <S.SectionHeader className="col-xs-12">
                <S.DescriptionTitle>{t('eventDetailPageContent.venue.title')}</S.DescriptionTitle>
                {venue && (
                  <Link to={`/venues/${venue.slug_name}`}>
                    <Button bg="transparent" outlined>
                      {t('eventDetailPageContent.venue.seeVenue')}
                    </Button>
                  </Link>
                )}
              </S.SectionHeader>
            </S.Body>

            {lat && lng && (
              <S.EventLocationMap
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+F50756(${lng},${lat})/${lng},${lat},${14},0/${locationMapWidth}x400?access_token=${
                  process.env.GATSBY_MAPBOX_KEY
                }`}
                height="400"
                width={locationMapWidth}
                alt={event.name}
              />
            )}
          </>
        )}
      </S.Content>

      {/* <S.RetingContainer>
        <S.Content className={isPreview ? '' : ''}>
          <S.RetingHeader>
            <S.RetingTitle>
              <Title>Ratings</Title>
              <div>
                <img src={star} alt="star" />
                <p>4.8 (105 reviews)</p>
              </div>
            </S.RetingTitle>

            <S.RatingsContent>
              <RatingBar label="parking" rating="4.0" />
              <RatingBar label="Seating" rating="4.5" />
              <RatingBar label="Audio Quality" rating="3.5" />
              <RatingBar label="Merch" rating="2.5" />
              <RatingBar label="Food & Drinks" rating="5.0" />
              <RatingBar label="Cleanliness" rating="3.0" />
            </S.RatingsContent>
          </S.RetingHeader>

          <S.CommentContainer>
            <S.Comment>
              <CommentCard
                date={new Date()}
                name="Katie B"
                image="https://res.cloudinary.com/festivalpass/image/upload/v1626089369/Jon_Wolfe_Favorites_0013_80b54c648a.jpg"
                desciption="Sollicitant homines non sunt nisi quam formae rerum principiis opiniones.  Mors enim est terribilis ut Socrati aliud esse apparet. Sed timor mortis est notio terribile."
              />
            </S.Comment>
            <S.Comment>
              <CommentCard
                date={new Date()}
                name="Katie B"
                image="https://res.cloudinary.com/festivalpass/image/upload/v1626089369/Jon_Wolfe_Favorites_0013_80b54c648a.jpg"
                desciption="Sollicitant homines non sunt nisi quam formae rerum principiis opiniones.  Mors enim est terribilis ut Socrati aliud esse apparet. Sed timor mortis est notio terribile."
              />
            </S.Comment>
            <S.Comment>
              <CommentCard
                date={new Date()}
                name="Katie B"
                image="https://res.cloudinary.com/festivalpass/image/upload/v1626089369/Jon_Wolfe_Favorites_0013_80b54c648a.jpg"
                desciption="Sollicitant homines non sunt nisi quam formae rerum principiis opiniones.  Mors enim est terribilis ut Socrati aliud esse apparet. Sed timor mortis est notio terribile."
              />
            </S.Comment>
            <S.Comment>
              <CommentCard
                date={new Date()}
                name="Katie B"
                image="https://res.cloudinary.com/festivalpass/image/upload/v1626089369/Jon_Wolfe_Favorites_0013_80b54c648a.jpg"
                desciption="Sollicitant homines non sunt nisi quam formae rerum principiis opiniones.  Mors enim est terribilis ut Socrati aliud esse apparet. Sed timor mortis est notio terribile."
              />
            </S.Comment>
            <S.Comment>
              <CommentCard
                date={new Date()}
                name="Katie B"
                image="https://res.cloudinary.com/festivalpass/image/upload/v1626089369/Jon_Wolfe_Favorites_0013_80b54c648a.jpg"
                desciption="Sollicitant homines non sunt nisi quam formae rerum principiis opiniones.  Mors enim est terribilis ut Socrati aliud esse apparet. Sed timor mortis est notio terribile."
              />
            </S.Comment>
            <S.Comment>
              <CommentCard
                date={new Date()}
                name="Katie B"
                image="https://res.cloudinary.com/festivalpass/image/upload/v1626089369/Jon_Wolfe_Favorites_0013_80b54c648a.jpg"
                desciption="Sollicitant homines non sunt nisi quam formae rerum principiis opiniones.  Mors enim est terribilis ut Socrati aliud esse apparet. Sed timor mortis est notio terribile."
              />
            </S.Comment>
          </S.CommentContainer>

          <S.ViewAllReviewBtn>
            <a>View all reviews</a>
          </S.ViewAllReviewBtn>
        </S.Content>
      </S.RetingContainer> */}
      {isParent && (
        <S.EventsContainer>
          <S.Content>
            <VanueEvents events={childEvents} />
          </S.Content>
        </S.EventsContainer>
      )}

      {!isEmpty(recommendedEvents) && (
        <S.Content>
          <S.RecommendedEventsContainer>
            {/* <S.RecommendedEventsTitle> */}
            <S.DescriptionTitle>{t('eventDetailPageContent.recommendedEvents')}</S.DescriptionTitle>
            {/* </S.RecommendedEventsTitle> */}
            <RecommendedEventsCards cardDetails={recommendedEvents} />
          </S.RecommendedEventsContainer>
          <S.RecommendedEventsContainer>
            <S.DescriptionTitle>{t('Nearby Hotels')}</S.DescriptionTitle>
            <RecommendedHotelsCards coords={{ latitude: event.lat, longitude: event.lng }} />
          </S.RecommendedEventsContainer>
        </S.Content>
      )}
    </div>
  );
};

export default EventDetailPageContent;

const eventDetailsCardQuery = graphql`
  query EventDetailsCard {
    eventPlaceholderImage: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "event-placeholder.jpg" }
    ) {
      childCloudinaryAsset {
        fluid(maxWidth: 225) {
          ...CloudinaryAssetFluid
        }
      }
    }
  }
`;
