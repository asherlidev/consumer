import React, { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';

import { ISeatics, ISeaticsTicket } from './seatics-types';
import { ticketsMapper } from './seatics-helpers';
import { Loading, Button } from '../../../Elements';
import * as S from './styles';

interface Props {
  external_id: string;
  mapName: string;
  mapUrl: string;
  setTicket: (ticket: any) => void;
  seats: number;
  setNoTickets: (state: boolean) => void;
}

const SeaticsMap: React.FC<Props> = ({
  external_id,
  mapName,
  mapUrl,
  setTicket,
  seats,
  setNoTickets,
}) => {
  const [isMapDataLoaded, setIsMapDataLoaded] = useState(false);
  const [isTicketDataLoaded, setIsTicketDataLoaded] = useState(false);
  const [tickets, setTickets] = useState<ISeaticsTicket[]>([]);
  const [ticketGroups, setTicketGroups] = useState<any[]>([]);
  const [loop, setLoop] = useState<NodeJS.Timeout>();
  const [error, setError] = useState(false);
  const [minQuantity, setMinQuantity] = useState<number>(seats);

  useEffect(() => {
    setMinQuantity(seats);
  }, [seats]);

  useEffect(() => {
    if (ticketGroups && ticketGroups.length > 0) {
      setNoTickets(false);
    } else {
      setNoTickets(true);
    }
  }, [ticketGroups]);

  function updateTicketsList(ticketDataSegmented: any[]) {
    setTicketGroups(
      ticketDataSegmented
        .filter((segment) => segment.tickets)
        .map((segment) => segment.tickets)
        .flat()
    );
  }

  // TODO: we should fetch this as soon as the component renders. It's here for now as we want to make sure map is rendered before adding tickets
  function fetchTickets() {
    const Seatics = window ? ((window as any).Seatics as ISeatics) : undefined;
    // setTickets(ticketsMapper(fakeListings));
    // Seatics?.MapComponent.addTicketData(ticketsMapper(fakeListings));
    // setIsTicketDataLoaded(true);
    axios
      .get(`${process.env.GATSBY_STRAPI_API_URL}/tickets/selectaticket/${external_id}`)
      .then(({ data }) => {
        setTickets(ticketsMapper(data));
        Seatics?.MapComponent.addTicketData(ticketsMapper(data));
        setIsTicketDataLoaded(true);
      })
      .catch(() => {
        setError(true);
        setIsTicketDataLoaded(true);
      });
  }

  // Load map widget and interval check to see if mapData exists
  useEffect(() => {
    const Seatics = window ? ((window as any).Seatics as ISeatics) : undefined;
    const seaticsWidgetSrc = `https://d340sbn9oxreq3.cloudfront.net/${mapName}.js`;

    if (Seatics) {
      $(`script#mapWidget`).attr('src', seaticsWidgetSrc).prop('defer', true);
    }

    setLoop(
      setInterval(() => {
        if (Seatics && Seatics.mapData) setIsMapDataLoaded(true);
      }, 1000)
    );
  }, []);

  // Once mapData has been loaded, call Seatics map creating function then fetch tickets to be added to the map
  useEffect(() => {
    const Seatics = (window as any).Seatics as ISeatics;
    // Seatics.config.showZoomControls = false;

    if (isMapDataLoaded) {
      clearInterval(loop!);

      Seatics?.MapComponent.create({
        imgSrc: mapUrl,
        tickets: [],
        mapData: Seatics.mapData,
        vfsUrl: 'https://vfs.seatics.com',
        container: $('div#seatics-maps'),
        presentationInterface: {
          updateTicketsList,
        },
        // mapWidth: 500,
        // mapHeight: 500,
        mapName,
        enableSectionInfoPopups: true,
      });

      fetchTickets();
    }
  }, [isMapDataLoaded]);

  useEffect(() => {
    const Seatics = window ? ((window as any).Seatics as ISeatics) : undefined;
    if (isMapDataLoaded) {
      Seatics?.MapComponent.setFilterOptions({ minQuantity });
    }
  }, [isMapDataLoaded, minQuantity]);

  return (
    <>
      {error && <div>Failed to load tickets data</div>}
      <div style={{ marginBottom: '12px' }}>
        {[undefined, 1, 2].map((v, i) => (
          <Button
            text
            key={i}
            style={{ width: '60px' }}
            color={minQuantity === v ? 'primary' : 'default'}
            onClick={() => setMinQuantity(v)}
          >
            {v || 'Any'}
          </Button>
        ))}
      </div>
      <S.Wrapper>
        <S.TicketsContainer>
          {!isTicketDataLoaded ? (
            <S.LoadingContainer>
              <Loading />
            </S.LoadingContainer>
          ) : (
            ticketGroups.map((ticket, i) => (
              <Ticket key={i} ticket={ticket} setTicket={setTicket} />
            ))
          )}
          {isTicketDataLoaded && tickets.length === 0 && (
            <S.EmptyTicket>No tickets available</S.EmptyTicket>
          )}
        </S.TicketsContainer>
        {isMapDataLoaded ? <S.MapContainer id="seatics-maps" /> : <div>Loading map data</div>}
      </S.Wrapper>
    </>
  );
};

const Ticket: React.FC<{ ticket: any; setTicket: (ticket: any) => void }> = ({
  ticket,
  setTicket,
}) => {
  const { tgColor, tgQty, tgClientData } = ticket;
  const Seatics = window ? ((window as any).Seatics as ISeatics) : undefined;

  const handleTicketSelect = () => {
    setTicket(ticket);
  };

  return (
    <S.Ticket
      onClick={handleTicketSelect}
      onMouseEnter={() => Seatics?.MapComponent.highlightTicket(ticket)}
      // onMouseLeave={() => Seatics?.MapComponent.highlightTicket()}
    >
      <S.TicketColorBlock style={{ backgroundColor: tgColor }} />
      <div>
        <S.TicketSection>{ticket.getSectionDisplayName()}</S.TicketSection>
        <S.TicketRow>Row {ticket.getRowDisplayName()}</S.TicketRow>
        <S.TicketAvailability>{`${tgQty} ticket${tgQty > 1 ? 's' : ''}`}</S.TicketAvailability>
      </div>
      <S.TicketPriceButton>
        <strong>{Math.round(tgClientData.credits)} credits</strong>/ea
      </S.TicketPriceButton>
    </S.Ticket>
  );
};

export default SeaticsMap;
