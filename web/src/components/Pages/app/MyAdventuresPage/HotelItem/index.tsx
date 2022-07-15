import React from 'react';
import { format } from 'date-fns';

import { getTimezoneOffsetDate } from '../../../../../utils/datetime';
import * as S from '../TicketItem/styles';

interface Props {
  reservation: any;
}

const HotelItem: React.FC<Props> = ({ reservation }) => {
  const startDate = format(getTimezoneOffsetDate(reservation.in_date), 'EEE, MMM d yyyy');
  const endDate = format(getTimezoneOffsetDate(reservation.out_date), 'EEE, MMM d yyyy');
  const previewImage = reservation.reservation_hotel.image_thumbnail.replace('_70.', '_300.');

  return (
    <S.TicketItem>
      <S.TicketImage src={previewImage} />
      <S.TicketContent>
        <S.EventName>{reservation.reservation_hotel.hotel_name}</S.EventName>
        <S.EventDescription>{`${startDate} - ${endDate}`}</S.EventDescription>
        <S.HorizontalLine />
        <S.TicketLink to={`/app/reservation/${reservation.reservation_id}`}>
          <S.CtaButton text>View reservation</S.CtaButton>
        </S.TicketLink>
      </S.TicketContent>
    </S.TicketItem>
  );
};

export default HotelItem;
