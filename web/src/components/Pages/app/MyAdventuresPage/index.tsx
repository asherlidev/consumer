import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { Tab } from 'react-bootstrap';

import TicketItem from './TicketItem';
import HotelItem from './HotelItem';
import EmptyEventsImage from './empty-events.svg';
import EmptyHotelsImage from './empty-hotels.svg';
import { Footer, Header } from '../../../Layout';
import { Title, Button } from '../../../Elements';
import { PrivateRouteProps } from '../../../PrivateRoute';
import * as S from './styles';

const MyAdventuresPage: React.FC<PrivateRouteProps> = ({ user }) => {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const tabActiveKey = hash === '#hotels' ? 'hotels' : 'events';

  const [upcomingReservations, pastReservations] = useMemo(() => {
    const reservations = user.reservations.sort(
      (a, b) => new Date(b.in_date).getTime() - new Date(a.in_date).getTime()
    );
    return [
      reservations.filter((res) => new Date(res.in_date).getTime() > Date.now()),
      reservations.filter((res) => new Date(res.in_date).getTime() <= Date.now()),
    ];
  }, []);

  const [upcomingEvents, pastEvents] = useMemo(() => {
    const events = user.tickets.sort(
      (a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );
    return [
      events.filter((ev) => new Date(ev.event_date).getTime() > Date.now()),
      events.filter((ev) => new Date(ev.event_date).getTime() <= Date.now()),
    ];
  }, []);

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <Title marginBottom="20px">My Adventures</Title>
          <Tab.Container activeKey={tabActiveKey} id="my-adventures-tab">
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
              <Button
                text
                outlined={true}
                onClick={() => navigate('/app/adventures')}
                color={tabActiveKey === 'events' ? 'primary' : 'default'}
              >
                Events
              </Button>
              <Button
                text
                outlined
                onClick={() => navigate('/app/adventures#hotels')}
                color={tabActiveKey === 'hotels' ? 'primary' : 'default'}
              >
                Hotels
              </Button>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="events">
                <>
                  <S.WhenTitle>Upcoming</S.WhenTitle>
                  {isEmpty(upcomingEvents) ? (
                    <EmptyState
                      image={EmptyEventsImage}
                      text="You don't have any events scheduled. Let's change that!"
                    />
                  ) : (
                    <S.GridContainer>
                      {upcomingEvents.map((ticket, i) => (
                        <TicketItem ticket={ticket} key={i} />
                      ))}
                    </S.GridContainer>
                  )}
                  <S.WhenTitle>Past</S.WhenTitle>
                  {isEmpty(pastEvents) ? (
                    <EmptyState
                      image={EmptyEventsImage}
                      text="Your past event tickets will appear here."
                    />
                  ) : (
                    <S.GridContainer>
                      {pastEvents.map((ticket, i) => (
                        <TicketItem ticket={ticket} key={i} />
                      ))}
                    </S.GridContainer>
                  )}
                </>
              </Tab.Pane>
              <Tab.Pane eventKey="hotels">
                <>
                  <S.WhenTitle>Upcoming</S.WhenTitle>
                  {isEmpty(upcomingReservations) ? (
                    <EmptyState
                      image={EmptyHotelsImage}
                      text="You don't have any trips scheduled. Let's change that!"
                    />
                  ) : (
                    <S.GridContainer>
                      {upcomingReservations.map((reservation) => (
                        <HotelItem reservation={reservation} key={reservation.itinerary_id} />
                      ))}
                    </S.GridContainer>
                  )}
                  <S.WhenTitle>Past</S.WhenTitle>
                  {isEmpty(pastReservations) ? (
                    <EmptyState
                      image={EmptyHotelsImage}
                      text="Your past hotel reservations will appear here."
                    />
                  ) : (
                    <S.GridContainer>
                      {pastReservations.map((reservation) => (
                        <HotelItem reservation={reservation} key={reservation.itinerary_id} />
                      ))}
                    </S.GridContainer>
                  )}
                </>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </S.Content>
      </S.Container>
      <Footer />
    </>
  );
};

const EmptyState: React.FC<{ text: string; image: any }> = ({ text, image }) => {
  return (
    <div
      style={{
        marginTop: '40px',
        textAlign: 'center',
        borderRadius: '16px',
        padding: '40px 20px',
        boxShadow: 'rgb(149 157 165 / 20%) 0px 8px 24px',
      }}
    >
      <img src={image} style={{ width: '80%', maxWidth: '300px' }} />
      <p style={{ fontWeight: 600, marginTop: '20px' }}>{text}</p>
    </div>
  );
};

export default MyAdventuresPage;
