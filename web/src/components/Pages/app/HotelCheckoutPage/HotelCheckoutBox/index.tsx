import React from 'react';
import moment from 'moment';
import * as S from './styles';
import { dateFormatSansTime } from '../../../../../constants/datetime';

interface Props {
  className?: string;
  hotel_id: string;
  current_credits: number;
  price: string;
  subscription: { subscription_display_name: string | undefined };
  rate_plan_code: string;
  room_code: string;
  room_title: string;
  hotel_name: string;
  in_date: string;
  out_date: string;
  adultsNum: string;
  childrenNum: string;
}

const CheckoutBox: React.FC<Props> = ({
  className,
  hotel_id,
  current_credits,
  price,
  subscription,
  rate_plan_code,
  room_code,
  room_title,
  hotel_name,
  in_date,
  out_date,
  adultsNum,
  childrenNum,
}) => (
  <S.Container className={`wow bounceInDown ${className || ''}`} data-wow-delay="0.5s">
    <S.Block>
      <S.EventTitle>{hotel_name}</S.EventTitle>
      <S.EventDate>
        {in_date === 'null' ? '' : moment(in_date).format(dateFormatSansTime)} -{' '}
        {out_date === 'null' ? '' : moment(out_date).format(dateFormatSansTime)}
      </S.EventDate>
    </S.Block>
    <S.Block>
      <S.Spaced>
        <S.Label>Room</S.Label>
        <S.SeatId>{room_title}</S.SeatId>
      </S.Spaced>
    </S.Block>
    <S.Block>
      <S.Spaced>
        <S.Label>Guests</S.Label>
        <S.SeatId>
          {adultsNum} adult{parseInt(adultsNum) !== 1 && 's'}
          {parseInt(adultsNum) && parseInt(childrenNum) ? ', ' : ''}
          {parseInt(childrenNum) > 0 ? parseInt(childrenNum) : ''}
        </S.SeatId>
      </S.Spaced>
    </S.Block>
    <S.Block>
      <S.Spaced>
        <S.Label>Rooms</S.Label>
        <S.SeatId>1</S.SeatId>
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
        <S.SeatId>{price}</S.SeatId>
      </S.Spaced>
    </S.Block>
    {current_credits < parseInt(price) && (
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
