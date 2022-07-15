import React from 'react';
import moment from 'moment';
import * as S from './styles';
import { dateFormat } from '../../../../../constants/datetime';

interface Props {
  className?: string;
  event_name: string;
  event_date: string;
  seats_id: string;
  seats_label: string;
  price: number;
  quantity: number;
  event_location: string;
  current_credits: number;
  isSuccess: boolean;
}

const CheckoutBox: React.FC<Props> = ({
  className,
  event_name,
  event_date,
  seats_label,
  seats_id,
  price,
  quantity,
  event_location,
  current_credits,
  isSuccess,
}) => (
  <S.Container className={`wow bounceInDown ${className || ''}`} data-wow-delay="0.5s">
    <S.Block>
      <S.EventTitle>{event_name}</S.EventTitle>
      <S.EventDate>
        {event_date === 'null' ? '' : moment(event_date).format(dateFormat)} - {event_location}
      </S.EventDate>
    </S.Block>
    <S.Block>
      <S.Spaced>
        <S.Label># of Tickets</S.Label>
        <S.SeatId>{quantity}</S.SeatId>
      </S.Spaced>
    </S.Block>
    <S.Block>
      <S.Spaced>
        <S.Label>Seats</S.Label>
        <S.SeatId>{seats_id}</S.SeatId>
      </S.Spaced>
      <S.SeatLabel>{seats_label}</S.SeatLabel>
    </S.Block>
    <S.Block>
      <S.Spaced>
        <S.Label>Tickets</S.Label>
        <S.SeatId>
          {price} {price === 1 ? 'credit' : 'credits'} &#215; {quantity}
        </S.SeatId>
      </S.Spaced>
    </S.Block>
    <S.Block>
      <S.Spaced>
        <S.Label>Fees</S.Label>
        <S.SeatId>
          <i>Never</i>
        </S.SeatId>
      </S.Spaced>
    </S.Block>
    <S.Block>
      <S.Spaced>
        <S.Label>
          <b>Total Credits</b>
        </S.Label>
        <S.SeatId>{price * quantity}</S.SeatId>
      </S.Spaced>
    </S.Block>
    {!isSuccess && current_credits < price * quantity && (
      <S.Block>
        <S.Spaced>
          <S.Label>Current Credits</S.Label>
          <S.SeatId>
            <div style={{ color: 'red' }}>{current_credits}</div>
          </S.SeatId>
        </S.Spaced>
      </S.Block>
    )}
  </S.Container>
);

export default CheckoutBox;
