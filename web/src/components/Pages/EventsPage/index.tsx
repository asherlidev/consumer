import { gql, useQuery } from '@apollo/client';
import { graphql, Link, PageProps, navigate } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';
import { map, sortBy, toString } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import moment from 'moment';
import { parse, stringifyUrl } from 'query-string';
import { EventsPageQuery } from '../../../../graphql-types';
import { useUser } from '../../../context/user';
import { RestEvent } from '../../../context/user/UserProvider';
import fragments from '../../../utils/gqlFragments';
import { CategoryTag } from '../../Elements';
import EventCards, { EventCardsWithApollo } from '../../Elements/EventCards';
import EventCardsNearby from '../../Elements/EventCardsNearby';
import EventCardsRecentlyAdded from '../../Elements/EventCardsRecentlyAdded';
import Input from '../../Elements/Input';
import Subtitle from '../../Elements/Subtitle';
import Title from '../../Elements/Title';
import { Footer, Header, PageWrapper } from '../../Layout';
import { Category } from '../EventDetailPage/EventDetailPageContent';
import * as S from './styles';
import FeaturedEvents from '../../Elements/FeaturedEvents';
import SearchInput from '../../Elements/SearchInput';
import { ApolloCardEvent } from '../../Elements/EventCard/EventCard';
import Suggestions from '../../Layout/Header/Suggestions';

const EventsPage: React.FC<PageProps<EventsPageQuery, { now: string }>> = ({
  data,
  pageContext: { now },
}) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [locationEvents, setLocationEvents] = useState<{
    losAngeles: RestEvent[];
    atlanta: RestEvent[];
    newYork: RestEvent[];
    austin: RestEvent[];
  }>({ losAngeles: [], atlanta: [], newYork: [], austin: [] });
  const [fetchingCityLocationEvents, setFetchingCityLocationEvents] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchInput, setSearchInput] = useState<string>('');
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');
  const [cardDetails, setCardDetails] = useState<any[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [today, setToday] = useState<any>(null);

  const onQuerySubmit = (queryInput: string, filter: boolean): void => {
    // if (!queryInput) return;
    setSearchInput(queryInput);

    navigate(stringifyUrl({ url: '/search', query: { q: queryInput, f: filter } }), {
      replace: true,
    });
  };

  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const [emptySuggestion, setEmptySuggestion] = useState<boolean>(true);

  useEffect(() => {
    setToday(moment().utc());
  }, []);

  const categories = useMemo(
    (): Category[] =>
      sortBy(map(data.categories.edges, 'node'), ['strapiId']).map(({ strapiId, name }) => ({
        id: toString(strapiId),
        name: name as string,
      })),
    [data.categories.edges]
  );

  const fetchCityLocationEvents = useCallback(async () => {
    try {
      const algolia = (await import('../../../utils/algoliaClient')).events;
      setFetchingCityLocationEvents(true);
      await algolia.setSettings({
        customRanking: ['asc(start_timestamp)'],
      });
      const [{ hits: losAngeles }, { hits: atlanta }, { hits: newYork }, { hits: austin }] =
        await Promise.all([
          algolia.search('', getAlgoliaSearchConfig(cityCoordinates.losAngeles)),
          algolia.search('', getAlgoliaSearchConfig(cityCoordinates.atlanta)),
          algolia.search('', getAlgoliaSearchConfig(cityCoordinates.newYork)),
          algolia.search('', getAlgoliaSearchConfig(cityCoordinates.austin)),
        ]);

      setLocationEvents(
        (prevLocationEvents) =>
          ({
            ...prevLocationEvents,
            losAngeles,
            atlanta,
            newYork,
            austin,
          } as any)
      );
    } catch (error) {
      console.error(error);
    }
    setFetchingCityLocationEvents(false);
  }, []);

  useEffect(() => {
    fetchCityLocationEvents();
  }, [fetchCityLocationEvents]);

  // Get featured events
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
          // name_contains: debouncedSearchText,
          start_gte: today,
          isFeatured: true,
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
          data?.eventPlaceholderImage?.childCloudinaryAsset?.fixed?.src;

        return {
          label: item.name,
          image,
          data: image,
          date: [new Date(item.start)],
          slugName: item.slug_name,
        };
      });
      setCardDetails(details);
    }
  }, [eventsQuery, data]);

  const handleBlur = () => {
    setTimeout(() => {
      setInputFocus(false);
    }, 300);
  };

  const handleKeyUp = (e: any) => {
    switch (e.keyCode) {
      case 13:
        onQuerySubmit(searchInput, isFilterOpen);
        break;
      case 27:
        setInputFocus(false);
        break;
      default:
        setInputFocus(true);
    }
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <S.ContentContainer>
          <FeaturedEvents cardDetails={cardDetails} />

          <S.FestivalWrapperFp>
            <S.TitleContainer className="col-sm-5 col-xs-12">
              <Title>{t('eventsPage.title')}</Title>
              <Subtitle>{t('eventsPage.subtitle')}</Subtitle>
            </S.TitleContainer>
            <S.SearchContainer className="col-sm-5 col-xs-12">
              <SearchInput
                autoFocus
                type="text"
                name="search"
                id="search"
                placeholder={t('eventsPage.searchEventsPlaceholder')}
                value={searchInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  setSearchInput(e.target.value);
                }}
                autoComplete="off"
                onKeyUp={(e) => handleKeyUp(e)}
                onFocus={() => setInputFocus(true)}
                onBlur={handleBlur}
              />
              {searchInput.length > 0 && inputFocus && (
                <Suggestions
                  query={searchInput}
                  setEmptySuggestion={setEmptySuggestion}
                  type={['events']}
                />
              )}
            </S.SearchContainer>
          </S.FestivalWrapperFp>
          <>
            <EventCardsNearby showWhenEmpty={true} />

            <EventCards
              title={t('eventsPage.events.atlanta')}
              events={locationEvents.atlanta}
              loading={fetchingCityLocationEvents}
            />

            <EventCards
              title={t('eventsPage.events.newYork')}
              events={locationEvents.newYork}
              loading={fetchingCityLocationEvents}
            />

            <EventCards
              title={t('eventsPage.events.losAngeles')}
              events={locationEvents.losAngeles}
              loading={fetchingCityLocationEvents}
            />

            <EventCards
              title={t('eventsPage.events.austin')}
              events={locationEvents.austin}
              loading={fetchingCityLocationEvents}
            />

            <EventCards
              title={t('eventsPage.events.interested')}
              events={user?.interested_festivals}
            />

            <EventCardsRecentlyAdded />

            {!selectedCategory &&
              user?.interests.map(({ name, id }: Category) => (
                <EventCardsWithApollo
                  key={id}
                  title={t('eventsPage.events.category', { name })}
                  apolloQueryArgs={{
                    query: gql`
                      query FilteredEventsQuery($where: JSON) {
                        events: festivals(sort: "start:asc", limit: 20, where: $where) {
                          ...EventCard
                        }
                      }
                      ${fragments.eventCard}
                    `,
                    variables: {
                      where: {
                        isActive: true,
                        start_gte: now,
                        festivalcategories: id,
                      },
                    },
                  }}
                />
              ))}
          </>
        </S.ContentContainer>
      </PageWrapper>

      <Footer />
    </>
  );
};

export default EventsPage;

//
// Utils
//

export const eventsPageQuery = graphql`
  query EventsPage($now: Date!) {
    categories: allStrapiInterest(filter: { isActive: { eq: true } }) {
      edges {
        node {
          strapiId
          name
        }
      }
    }
    eventPlaceholderImage: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "event-placeholder.jpg" }
    ) {
      childCloudinaryAsset {
        fixed(height: 269) {
          ...CloudinaryAssetFixed
        }
      }
    }
    featuredEvents: allStrapiFestival(
      filter: { isActive: { eq: true }, isFeatured: { eq: true } }
      limit: 20
    ) {
      edges {
        node {
          strapiId
          name
          slug_name
          cover_image {
            childCloudinaryAsset {
              fixed(height: 269) {
                ...CloudinaryAssetFixed
              }
            }
            url
          }
          child_ids {
            name
          }
        }
      }
    }
    upcomingEvents: allStrapiFestival(
      filter: { isActive: { eq: true }, start: { gte: $now } }
      limit: 20
      sort: { order: ASC, fields: start }
    ) {
      ...EventCardFragment
    }
    ...LocaleQuery
  }
`;

const featuredEventsSliderSettings = {
  infinite: true,
  slidesToScroll: 1,
  variableWidth: true,
  dots: true,
};

interface Coordinates {
  latitude: number;
  longitude: number;
}

let now = moment().unix();

const getAlgoliaSearchConfig = ({ latitude, longitude }: Coordinates) => ({
  aroundLatLng: `${latitude},${longitude}`,
  aroundRadius: 40000,
  facetFilters: ['isActive: true', 'start_timestamp:-0'],
  filters: `start_timestamp > ${now}`,
});

const cityCoordinates = {
  losAngeles: { latitude: 34.0203996, longitude: -118.5518133 },
  austin: { latitude: 30.3076863, longitude: -97.8934825 },
  atlanta: { latitude: 33.7676931, longitude: -84.4906431 },
  newYork: { latitude: 40.6974034, longitude: -74.1197613 },
};
