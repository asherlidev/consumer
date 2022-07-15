import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import EventCardsRecentlyAdded from '../../Elements/EventCardsRecentlyAdded';
import Subtitle from '../../Elements/Subtitle';
import Title from '../../Elements/Title';
import { Footer, Header, PageWrapper } from '../../Layout';
import * as S from './styles';
import HotelSearchInput, { QueryType } from '../../Elements/HotelSearchInput';
import HotelCards from '../../Elements/HotelCards';
import { searchHotels } from '../../../utils/gqlQueries';
import { useEffect } from 'react';

const HotelsPage: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation();
  const [queryInput, setQueryInput] = useState<QueryType | undefined>(undefined);

  const [currentCoords, setCurrentCoords] = useState<
    { latitude: number; longitude: number } | undefined
  >(undefined);

  const { data: nearbyResult, loading: nearbyLoading } = useQuery(
    searchHotels({
      latitude: currentCoords?.latitude || 0,
      longitude: currentCoords?.longitude || 0,
      radius: 10,
    })
  );

  const queryResults = Object.keys(cityCoordinates).map((key) => {
    const typedKey = key as keyof typeof cityCoordinates;
    return {
      ...useQuery(
        searchHotels({
          latitude: cityCoordinates[typedKey].latitude,
          longitude: cityCoordinates[typedKey].longitude,
          radius: 15,
          maxResults: 15,
        })
      ),
      cityName: cityCoordinates[typedKey].name,
    };
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentCoords(position.coords);
    });
  }, []);

  return (
    <>
      <Header />
      <PageWrapper>
        <S.ContentContainer>
          <S.FestivalWrapperFp>
            <S.TitleContainer className="col-sm-5 col-xs-12">
              <Title>{t('Find a place to stay on your adventure')}</Title>
              <Subtitle>
                {t("Use your credits to book hotels for the events that you're attending.")}
              </Subtitle>
            </S.TitleContainer>
            <S.SearchContainer className="col-sm-5 col-xs-12">
              <HotelSearchInput
                autoFocus
                type="text"
                name="search"
                id="search"
                placeholder={t('Search Hotels')}
                query={queryInput}
                onQueryChange={(q: QueryType) => {
                  setQueryInput(q);
                }}
              />
            </S.SearchContainer>
          </S.FestivalWrapperFp>

          {/* <EventCardsNearby showWhenEmpty={true} /> */}
          {currentCoords && (
            <HotelCards title={t('Nearby')} hotels={nearbyResult?.hotels} loading={nearbyLoading} />
          )}

          {queryResults.map((result, index) => (
            <HotelCards
              key={index}
              title={t(result.cityName)}
              hotels={result.data?.hotels}
              loading={result.loading}
            />
          ))}

          <EventCardsRecentlyAdded />
        </S.ContentContainer>
      </PageWrapper>

      <Footer />
    </>
  );
};

export default HotelsPage;

const cityCoordinates = {
  losAngeles: { latitude: 34.0203996, longitude: -118.5518133, name: 'Los Angeles' },
  austin: { latitude: 30.3076863, longitude: -97.8934825, name: 'Austin' },
  atlanta: { latitude: 33.7676931, longitude: -84.4906431, name: 'Atlanta' },
  newYork: { latitude: 40.6974034, longitude: -74.1197613, name: 'New York' },
};
