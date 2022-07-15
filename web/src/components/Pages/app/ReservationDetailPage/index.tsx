import React from 'react';
import { navigate } from 'gatsby';
import { format } from 'date-fns';

import { Button } from '../../../Elements';
import { Footer, Header } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import { getTimezoneOffsetDate } from '../../../../utils/datetime';
import CheckInIcon from './icons/check-in.svg';
import CheckOutIcon from './icons/check-out.svg';
import ChevronLeft from '../TicketDetailPage/icons/chevron-left.svg';
import SendDarkIcon from '../TicketDetailPage/icons/send-dark.svg';
import CalendarDarkIcon from '../TicketDetailPage/icons/calendar-dark.svg';
import MailDarkIcon from '../TicketDetailPage/icons/mail-dark.svg';
import * as S from './styles';

interface Props extends PrivateRouteProps {
  reservation_id?: string;
}

const ReservationDetailPage: React.FC<Props> = ({ reservation_id, user }) => {
  const { reservations } = user;
  const reservation = reservations.filter((r) => r.reservation_id.toString() === reservation_id)[0];
  const previewImage = reservation.reservation_hotel.image_thumbnail.replace('_70.', '_300.');
  const { hotel_name, hotel_address } = reservation.reservation_hotel;
  const hotelLocation = `${hotel_address.street_address}, ${hotel_address.city} ${hotel_address.state} ${hotel_address.postal_code}`;

  return (
    <>
      <Header />
      <S.ContentContainer>
        <S.GridContainer>
          <div>
            <Button
              text
              icon={<S.BackIcon src={ChevronLeft} />}
              style={{ marginBottom: '20px' }}
              onClick={() => navigate('/app/adventures#hotels')}
            >
              Back to hotels
            </Button>
            <S.TicketImage src={previewImage} />
            <S.EventName>{hotel_name}</S.EventName>
            <div>{hotelLocation}</div>
            <hr />
            <S.EventDetailsGrid>
              <div>
                <S.EventIcon src={CheckInIcon} />
                <S.EventDetails>
                  {format(getTimezoneOffsetDate(reservation.in_date), 'MMM do')}
                </S.EventDetails>
                <strong>{format(getTimezoneOffsetDate(reservation.in_date), 'EEEE')}</strong>
              </div>
              <div>
                <S.EventIcon src={CheckOutIcon} />
                <S.EventDetails>
                  {format(getTimezoneOffsetDate(reservation.out_date), 'MMM do')}
                </S.EventDetails>
                <strong>{format(getTimezoneOffsetDate(reservation.out_date), 'EEEE')}</strong>
              </div>
            </S.EventDetailsGrid>
            <hr />
            <p style={{ fontSize: '16px' }}>
              <strong>Helpful links</strong>
            </p>
            <div>
              <a href={`https://www.google.com/maps/dir//${hotelLocation}`} target="_blank">
                <Button text icon={<S.LinkIcon src={SendDarkIcon} />}>
                  Get directions
                </Button>
              </a>
            </div>
            {/* <div>
              <Button text icon={<S.LinkIcon src={CalendarDarkIcon} />}>
                Add to calendar
              </Button>
            </div> */}
            <div>
              <a href="https://intercom.help/festivalpass/en/" target="_blank">
                <Button text icon={<S.LinkIcon src={MailDarkIcon} />}>
                  Contact support
                </Button>
              </a>
            </div>
            <hr />
          </div>
          <div>
            <h3>Room ({reservation.rooms})</h3>
            <S.RoomContainer>
              <strong>{reservation.reservation_room.room_name}</strong>
              <div>{reservation.adults} adults</div>
              <div>{reservation.children} children</div>
            </S.RoomContainer>
            <hr />
            <h3>Reservation details</h3>
            <div>
              Reservation ID <code>{reservation.reservation_id}</code>
            </div>
            <div>Credit cost {reservation.credit_cost}</div>
            <div>Purchased {format(new Date(reservation.created_at), 'MMM d yyyy')}</div>
          </div>
        </S.GridContainer>
      </S.ContentContainer>
      <Footer />
    </>
  );
};

export default ReservationDetailPage;
