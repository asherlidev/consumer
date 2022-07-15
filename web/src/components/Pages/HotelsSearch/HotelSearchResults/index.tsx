import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';

import Map from '../../../Elements/Map';
import HotelMapMarker from '../HotelMapMarker';
import { searchHotels } from '../../../../utils/gqlQueries';
import HotelCard from '../../../Elements/HotelCard';
import HotelSearchItem from '../../../Elements/HotelSearchItem';
import HotelSearchInput from '../../../Elements/HotelSearchInput';
import { Hotel } from '../../HotelDetailPage';
import { QueryType } from '../../../Elements/HotelSearchInput';
import * as S from './styles';
import { navigate } from 'gatsby';

type HotelSearchResultsProps = {
  query: QueryType;
};

type CreateReservationParams = {
  rooms: number;
  hotelIds: number;
  inDate: string;
  outDate: string;
  adults: number;
  children: number;
  ratePlanCode: string;
  roomCode: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhoneCountry: number;
  guestPhoneArea: number;
  guestPhoneNumber: number;
  guestMessage: string;
  addressAddress: string;
  addressCity: string;
  addressRegion: string;
  addressPostalCode: string;
  addressCountryCode: string;
  roomCostPrice: number;
  roomCostTaxAmount: number;
  roomCostGatewayFee: number;
  roomCostTotalAmount: number;
  roomCostCurrencyCode: string;
  bookingFeeAmount: number;
  creditCardType: string;
  creditCardNumber: string;
  creditCardExpiration: string;
  creditCardCVV2: number;
  creditCardHolder: string;
  creditCardCity: string;
  creditCardRegion: string;
  creditCardPostalCode: string;
  creditCardCountryCode: string;
  ipAddress: string;
  userAgent: string;
  userLanguage: string;
  _type: string;
};

const HotelSearchResults: React.FC<HotelSearchResultsProps & RouteComponentProps> = ({ query }) => {
  const { location, inDate, outDate, guests, page } = query;

  const [newQuery, setQuery] = useState<QueryType | undefined>({
    location,
    inDate,
    outDate,
    guests,
    page,
  });

  const [isMobileMapOpen, setIsMobileMapOpen] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const {
    data: searchResults,
    loading,
    error,
  } = useQuery(
    searchHotels({
      inDate: inDate,
      outDate: outDate,
      city: location,
      rooms: guests?.rooms,
      adults: guests?.adults,
      children: guests?.children,
      radius: 100,
      maxResults: 20,
      page: page,
    })
  );

  const hotels: Hotel[] | undefined = searchResults?.hotels?.filter((item: any) => !!item);

  if ((!hotels && !loading) || error) return <div>No results found.</div>;

  const changePage = (to: number) => {
    const hotelParams: { [key: string]: any } = {
      start: query.inDate,
      end: query.outDate,
      adults: query.guests?.adults,
      children: query.guests?.children,
      page: to,
    };

    const queryParams = Object.keys(hotelParams)
      .filter((key) => !!hotelParams[key])
      .map((key) => `${key}=${hotelParams[key]}`)
      .join('&');

    navigate(`/hotels/search?${queryParams}`);
  };

  const hotelParams: { [key: string]: any } = {
    start: query.inDate,
    end: query.outDate,
    adults: query.guests?.adults,
    children: query.guests?.children,
  };

  const queryParams = Object.keys(hotelParams)
    .filter((key) => !!hotelParams[key])
    .map((key) => `${key}=${hotelParams[key]}`)
    .join('&');

  return (
    <S.Root>
      <S.InputContainer>
        <HotelSearchInput
          query={newQuery}
          onQueryChange={(q) => setQuery(q)}
          containerProps={{
            boxShadow: '0 0 16px #bbb',
            borderRadius: '25px',
            margin: 0,
            maxWidth: '700px',
            width: '100%',
          }}
        />
        <S.PaginationContainer>
          <S.PaginationButton
            disabled={!page || page <= 1}
            onClick={() => page && page > 1 && changePage(page - 1)}
          >
            &lt;
          </S.PaginationButton>{' '}
          Page {page || 1}
          <S.PaginationButton onClick={() => changePage((page || 1) + 1)}>&gt;</S.PaginationButton>
        </S.PaginationContainer>
      </S.InputContainer>
      <S.Flex>
        <S.ResultsContainer>
          <Divider />
          {loading &&
            [...new Array(8)].map((_, index) => {
              return (
                <div key={index} style={{ width: '100%' }}>
                  <HotelSearchItem loading />
                  <Divider />
                </div>
              );
            })}
          {hotels?.map((hotel: Hotel, index: number) => {
            return (
              <div key={index} style={{ width: '100%' }}>
                <HotelSearchItem
                  hotel={hotel}
                  onEnter={() => setHoveredIndex(index)}
                  onLeave={() => setHoveredIndex(-1)}
                  queryParams={queryParams}
                />
                <Divider />
              </div>
            );
          })}
        </S.ResultsContainer>
        <S.MapButtonContainer onClick={() => setIsMobileMapOpen(true)}>
          Show Map
        </S.MapButtonContainer>
        {isMobileMapOpen && (
          <S.MobileMapContainer>
            <Map
              options={() => {
                return {
                  draggable: true,
                  panControl: true,
                  scrollwheel: true,
                  zoomControl: true,
                  scaleControl: true,
                  gestureHandling: 'greedy',
                  fullscreenControl: false,
                };
              }}
              markers={
                hotels?.map((hotel) => {
                  return { lat: hotel.latitude, lng: hotel.longitude };
                }) || []
              }
            >
              {hotels?.map((hotel, index) => (
                <HotelMapMarker
                  key={index}
                  hotel={hotel}
                  lat={hotel.latitude}
                  lng={hotel.longitude}
                  index={index}
                  hovered={hoveredIndex}
                  setHovered={setHoveredIndex}
                />
              ))}
            </Map>
            <S.CloseMobileMapButton onClick={() => setIsMobileMapOpen(false)}>
              Close
            </S.CloseMobileMapButton>
          </S.MobileMapContainer>
        )}
        <S.MapContainer>
          <Map
            options={() => {
              return {
                draggable: true,
                panControl: true,
                scrollwheel: true,
                zoomControl: true,
                scaleControl: true,
                gestureHandling: 'greedy',
                fullscreenControl: false,
              };
            }}
            markers={
              hotels?.map((hotel) => {
                return { lat: hotel.latitude, lng: hotel.longitude };
              }) || []
            }
          >
            {hotels?.map((hotel, index) => (
              <HotelMapMarker
                key={index}
                hotel={hotel}
                lat={hotel.latitude}
                lng={hotel.longitude}
                index={index}
                hovered={hoveredIndex}
                setHovered={setHoveredIndex}
              />
            ))}
          </Map>
        </S.MapContainer>
      </S.Flex>
    </S.Root>
  );
};

export default HotelSearchResults;

const Divider: React.FC = () => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
    <div style={{ width: '100%', height: '1px', background: '#d9d9d9' }} />
  </div>
);
