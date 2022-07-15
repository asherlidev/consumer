import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { gql } from '@apollo/client';

import fragments from '../../../utils/gqlFragments';
import VenueCards from '../../Elements/VenueCards/VenueCards';
import VenueCardsWithApollo from '../../Elements/VenueCards/VenueCardsWithApollo';
import Input from '../../Elements/Input';
import Subtitle from '../../Elements/Subtitle';
import Title from '../../Elements/Title';
import VenueCardsNearby from '../../Elements/VenueCardsNearby';
import { Venue } from '../VenueDetailPage';
import { Footer, Header, PageWrapper } from '../../Layout';
import * as S from './styles';

const VenuesPage: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation();
  const [locationVenues, setLocationVenues] = useState<{
    losAngeles: Venue[];
    atlanta: Venue[];
    newYork: Venue[];
    austin: Venue[];
  }>({ losAngeles: [], atlanta: [], newYork: [], austin: [] });
  const [fetchingCityLocationVenues, setFetchingCityLocationVenues] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  const fetchCityLocationVenues = useCallback(async () => {
    try {
      const algolia = (await import('../../../utils/algoliaClient')).venues;
      setFetchingCityLocationVenues(true);
      await algolia.setSettings({});
      const [
        { hits: losAngeles },
        { hits: atlanta },
        { hits: newYork },
        { hits: austin },
      ] = await Promise.all([
        algolia.search('', getAlgoliaSearchConfig(cityCoordinates.losAngeles)),
        algolia.search('', getAlgoliaSearchConfig(cityCoordinates.atlanta)),
        algolia.search('', getAlgoliaSearchConfig(cityCoordinates.newYork)),
        algolia.search('', getAlgoliaSearchConfig(cityCoordinates.austin)),
      ]);

      setLocationVenues(
        (prevLocationVenues) =>
          ({
            ...prevLocationVenues,
            losAngeles,
            atlanta,
            newYork,
            austin,
          } as any)
      );
    } catch (error) {
      console.error(error);
    }
    setFetchingCityLocationVenues(false);
  }, []);

  useEffect(() => {
    fetchCityLocationVenues();
  }, [fetchCityLocationVenues]);

  return (
    <>
      <Header />
      <PageWrapper>
        <S.ContentContainer>
          <S.HeaderWrapper>
            <S.TitleContainer className="col-sm-5 col-xs-12">
              <Title>{t('venuesPage.title')}</Title>
              <Subtitle>{t('venuesPage.subtitle')}</Subtitle>
            </S.TitleContainer>
            <S.SearchContainer className="col-sm-5 col-xs-12">
              <Input
                autoFocus
                type="text"
                name="search"
                id="search"
                placeholder={t('venuesPage.searchVenuesPlaceholder')}
                value={searchInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  setSearchInput(e.target.value);
                }}
              />
            </S.SearchContainer>
          </S.HeaderWrapper>
          {debouncedSearchText ? (
            <VenueCardsWithApollo
              type="grid"
              title={t('eventsPage.events.searchResults')}
              apolloQueryArgs={{
                query: gql`
                  query FilteredVenuesQuery($where: JSON) {
                    venues: venues(limit: 20, where: $where) {
                      ...VenueCard
                    }
                  }
                  ${fragments.venueCard}
                `,
                variables: {
                  where: {
                    name_contains: debouncedSearchText,
                  },
                },
              }}
            />
          ) : (
            <>
              <VenueCardsNearby showWhenEmpty={true} />

              <VenueCards
                title={t('eventsPage.events.atlanta')}
                venues={locationVenues.atlanta}
                loading={fetchingCityLocationVenues}
              />

              <VenueCards
                title={t('eventsPage.events.newYork')}
                venues={locationVenues.newYork}
                loading={fetchingCityLocationVenues}
              />

              <VenueCards
                title={t('eventsPage.events.losAngeles')}
                venues={locationVenues.losAngeles}
                loading={fetchingCityLocationVenues}
              />

              <VenueCards
                title={t('eventsPage.events.austin')}
                venues={locationVenues.austin}
                loading={fetchingCityLocationVenues}
              />
            </>
          )}
        </S.ContentContainer>
      </PageWrapper>

      <Footer />
    </>
  );
};

export default VenuesPage;

interface Coordinates {
  latitude: number;
  longitude: number;
}

const getAlgoliaSearchConfig = ({ latitude, longitude }: Coordinates) => ({
  aroundLatLng: `${latitude},${longitude}`,
  aroundRadius: 400000,
});

const cityCoordinates = {
  losAngeles: { latitude: 34.0203996, longitude: -118.5518133 },
  austin: { latitude: 30.3076863, longitude: -97.8934825 },
  atlanta: { latitude: 33.7676931, longitude: -84.4906431 },
  newYork: { latitude: 40.6974034, longitude: -74.1197613 },
};
