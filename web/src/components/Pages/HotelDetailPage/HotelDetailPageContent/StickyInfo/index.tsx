import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { addDays, differenceInDays, format, parseISO } from 'date-fns';

import { Hotel, Room } from '../..';
import * as S from './styles';
import { uniqueId } from 'lodash';
import { useHotelCreditConversion } from '../hotel-utils';
import { unique } from 'faker';
import { useUser } from '../../../../../context/user';

const StickyInfo: React.FC<StickyInfoProps> = ({ hotel, room, adults, children }) => {
  const [reservationLoading, setReservationLoading] = useState(false);
  const [error, setError] = useState('');

  const { creditCost, loading } = useHotelCreditConversion(room?.total.amount);

  const { user, fetchUser } = useUser();

  const createReservation = async (reservation: createReservationType) => {
    return axios
      .post(`${process.env.GATSBY_STRAPI_API_URL}/hotels/create-reservation`, reservation)
      .then((response) => {
        return response;
      });
  };

  console.log(room);

  return (
    <S.StickyInfo id="sticky-info-box">
      <S.StickyInfoHeader>
        <h4>{room?.name || 'Select a Room'}</h4>
      </S.StickyInfoHeader>
      <h6 style={{ margin: 0 }}>Info</h6>
      <S.RegularBox>
        {room
          ? `${differenceInDays(parseISO(room.outDate), parseISO(room.inDate))} night${
              differenceInDays(parseISO(room.outDate), parseISO(room.inDate)) !== 1 ? 's' : ''
            } at ${hotel.name} in ${hotel.address.city}, ${hotel.address.state}`
          : 'Please select a Room'}
      </S.RegularBox>
      <h6 style={{ margin: 0 }}>Dates</h6>
      <S.RegularBox>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
          <div>
            <p style={{ margin: 0, fontSize: '12px' }}>
              <b>Check In</b>
            </p>
            <p>{room ? format(parseISO(room.inDate), 'MMM d, yyyy') : '--'}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '12px' }}>
              <b>Check Out</b>
            </p>
            <p>{room ? format(parseISO(room.outDate), 'MMM d, yyyy') : '--'}</p>
          </div>
        </div>
      </S.RegularBox>
      <h6 style={{ margin: 0 }}>Total Cost</h6>
      {loading && (
        <S.RegularBox>
          <S.Loader />
        </S.RegularBox>
      )}
      {!loading && <S.RegularBox>{creditCost ? `${creditCost} Credits` : '--'}</S.RegularBox>}

      <S.ReserveButton
        onClick={async () => {
          await fetchUser();

          if (!room) {
            setError('Please select a room.');
            return;
          }

          setReservationLoading(true);

          const params = new URLSearchParams({
            hotel_id: hotel.id + '',
            price: creditCost + '',
            in_date: room.inDate,
            out_date: room.outDate,
            rate_plan_code: room.ratePlanCode,
            room_code: room.code,
            room_title: room.name,
            hotel_name: hotel.name,
            adultsNum: room.adults,
            childrenNum: room.children,
          });

          window.open(`/app/hotels/checkout?` + params);

          // const response = await createReservation({
          //   userId: `${user.id}`,
          //   addressAddress: user.address_1 || '',
          //   addressCity: '',
          //   addressCountryCode: 'US',
          //   addressPostalCode: user.zipcode,
          //   addressRegion: '',
          //   adults: `${adults}`,
          //   bookingFeeAmount: room.bookingFee,
          //   bookingFeeCurrencyCode: 'USD',
          //   children: `${children}`,
          //   gateway: room?.gateway || '',
          //   guestEmail: user.email,
          //   guestFirstName: user.first_name,
          //   guestLastName: user.last_name,
          //   guestPhoneArea: '',
          //   guestPhoneCountry: '1',
          //   guestPhoneNumber: user.phone || '',
          //   hotelids: `${hotel.id}`,
          //   inDate: room.inDate,
          //   outDate: room.outDate,
          //   // ipAddress: string,
          //   // locale: string,
          //   ratePlanCode: room?.ratePlanCode || '',
          //   // recordLocator: uniqueId(),
          //   roomCode: room?.code || '',
          //   roomCostCurrencyCode: 'USD',
          //   roomCostGatewayFee: room?.gatewayFee || '0.00',
          //   roomCostPrice: room?.nightlyRate[0].price || '0.00',
          //   roomCostTaxAmount: room?.tax.amount || '0.00',
          //   roomCostTotalAmount: room?.total.amount || '0.00',
          //   rooms: '1',
          // });

          // if (response.status !== 200) {
          //   setError("We couldn't create that reservation: " + response.data);
          // }
        }}
      >
        {reservationLoading ? <S.Loader /> : <b>Reserve Now</b>}
      </S.ReserveButton>
      <div style={{ fontSize: '12px', width: '100%', textAlign: 'center' }}>
        <i>You won&apos;t be charged yet!</i>
      </div>
      {error && (
        <div style={{ fontSize: '12px', width: '100%', textAlign: 'center', color: 'red' }}>
          <i>{error}</i>
        </div>
      )}
    </S.StickyInfo>
  );
};

export default StickyInfo;

type StickyInfoProps = {
  hotel: Hotel;
  room?: Room;
  adults?: number;
  children?: number;
};

type createReservationType = {
  userId: string;
  addressAddress: string;
  addressCity: string;
  addressCountryCode: string;
  addressPostalCode: string;
  addressRegion: string;
  adults: string;
  bookingFeeAmount: string;
  bookingFeeCurrencyCode: string;
  children: string;
  gateway?: string;
  guestEmail: string;
  guestFirstName: string;
  guestLastName: string;
  guestPhoneArea: string;
  guestPhoneCountry: string;
  guestPhoneNumber: string;
  hotelids: string;
  inDate: string;
  outDate: string;
  ipAddress?: string;
  locale?: string;
  ratePlanCode: string;
  recordLocator?: string;
  roomCode: string;
  roomCostCurrencyCode: string;
  roomCostGatewayFee: string;
  roomCostPrice: string;
  roomCostTaxAmount: string;
  roomCostTotalAmount: string;
  rooms: string;
};
