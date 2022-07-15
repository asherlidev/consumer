import React from 'react';
import { navigate } from 'gatsby';
import { useQuery, gql } from '@apollo/client';
import { format } from 'date-fns';

import { Button } from '../../../Elements';
import { Footer, Header } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import ChevronLeft from './icons/chevron-left.svg';
import CalendarIcon from './icons/calendar.svg';
import MapPinIcon from './icons/map-pin.svg';
import SendDarkIcon from './icons/send-dark.svg';
import CalendarDarkIcon from './icons/calendar-dark.svg';
import MailDarkIcon from './icons/mail-dark.svg';
import * as S from './styles';

interface Props extends PrivateRouteProps {
  ticket_sku?: string;
}

const TicketDetailPage: React.FC<Props> = ({ ticket_sku, user }) => {
  const { tickets, ticketstubs } = user;
  const ticket = tickets.filter((t) => t.id.toString() === ticket_sku)[0];
  const stubs = ticketstubs.filter(
    (stub) => stub.ticket_sku && stub.ticket_sku.toString() === ticket_sku
  );

  const { data } = useQuery(
    gql`
      {
        festival(id: ${ticket.festival}) {
          id
          name
          external_img_url
          festivalcategories {
              cover_image {
                  url
              }
          }
          venue {
            name
            full_location
            address {
              city
              state
            }
          }
        }
      }
    `
  );

  const festival = data ? data.festival : null;

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
              onClick={() => navigate('/app/adventures')}
            >
              Back to events
            </Button>
            <S.TicketImage
              src={
                festival
                  ? festival.festivalcategories[0].cover_image.url
                  : 'https://res.cloudinary.com/festivalpass/image/upload/v1569456634/fp-content/default-share-image-5_3x_viqmie.jpg'
              }
            />
            <S.EventName>{ticket.name}</S.EventName>
            <hr />
            <S.EventDetailsGrid>
              <div>
                <S.EventIcon src={CalendarIcon} />
                <S.EventDetails>
                  {format(new Date(ticket.event_date), 'EEEE, MMM d yyyy')}
                </S.EventDetails>
                <strong>{format(new Date(ticket.event_date), 'h:mm aaa')}</strong>
              </div>
              {festival && (
                <div>
                  <S.EventIcon src={MapPinIcon} />
                  <S.EventDetails>{festival.venue.name}</S.EventDetails>
                  <strong>
                    {festival.venue.address.city}, {festival.venue.address.state}
                  </strong>
                </div>
              )}
            </S.EventDetailsGrid>
            <hr />
            <p style={{ fontSize: '16px' }}>
              <strong>Helpful links</strong>
            </p>
            <div>
              <a
                href={
                  festival
                    ? `https://www.google.com/maps/dir//${festival.venue.full_location}`
                    : `https://www.google.com/maps/place/${ticket.venue_name}`
                }
                target="_blank"
              >
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
            <h3>Tickets ({stubs.length})</h3>
            {stubs.map((stub) => (
              <S.StubContainer key={stub.ticket_id}>
                <div>
                  Ticket ID <strong>#{stub.ticket_id}</strong>
                </div>
                <div>{stub.event_name}</div>
                <S.StatusTag isPending={stub.isPending}>
                  {stub.isPending ? 'Pending' : 'Confirmed'}
                </S.StatusTag>
              </S.StubContainer>
            ))}
            <hr />
            <h3>Status</h3>
            <S.StatusContainer>
              <S.StatusItem isCompleted={true} />
              <S.StatusItem isCompleted={true} />
              <S.StatusItem isCompleted={false} />
            </S.StatusContainer>
            <S.StatusTextContainer>
              <S.StatusText>Order placed</S.StatusText>
              <S.StatusText>Confirmed</S.StatusText>
              <S.StatusText>Fulfilled</S.StatusText>
            </S.StatusTextContainer>
            <hr />
            <h3>Order details</h3>
            <div>
              Order <code>{ticket.ticket_hash}</code>
            </div>
            <div>Section {ticket.ticket_section}</div>
            <div>Row {ticket.ticket_row}</div>
            <div>Purchased {format(new Date(ticket.created_at), 'MMM d yyyy')}</div>
          </div>
        </S.GridContainer>
      </S.ContentContainer>
      <Footer />
    </>
  );
};

export default TicketDetailPage;
