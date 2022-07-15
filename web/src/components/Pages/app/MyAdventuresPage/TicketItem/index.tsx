import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { format } from 'date-fns';

import * as S from './styles';

interface Props {
  ticket: any;
}

const TicketItem: React.FC<Props> = ({ ticket }) => {
  const { data } = useQuery(
    gql`
      {
        festival(id: ${ticket.festival}) {
          id
          name
          description
          venue {
            name
          }
          cover_image {
            url
          }
          festivalcategories {
              cover_image {
                  url
              }
          }
        }
      }
    `
  );

  const festival = data ? data.festival : null;

  return (
    <S.TicketItem>
      <S.TicketImage
        src={
          festival?.cover_image?.url ||
          festival?.festivalcategories[0]?.cover_image?.url ||
          'https://res.cloudinary.com/festivalpass/image/upload/v1569456634/fp-content/default-share-image-5_3x_viqmie.jpg'
        }
      />
      <S.TicketContent>
        <S.EventName>{ticket.festival_name}</S.EventName>
        <S.EventDescription>{`${format(new Date(ticket.event_date), 'h:mm aaa')} · ${
          ticket.venue_name
        }`}</S.EventDescription>
        <S.HorizontalLine />
        <S.TicketLink to={`/app/ticket/${ticket.id}`}>
          <S.CtaButton text>View tickets</S.CtaButton>
        </S.TicketLink>
      </S.TicketContent>
      <S.EventDateBlock>
        <S.EventDateText>{format(new Date(ticket.event_date), 'EEE')}</S.EventDateText>
        <S.EventDateTextBold>{format(new Date(ticket.event_date), 'dd')}</S.EventDateTextBold>
        <S.EventDateText>{format(new Date(ticket.event_date), 'MMM')}</S.EventDateText>
      </S.EventDateBlock>
    </S.TicketItem>
  );
};

export default TicketItem;
