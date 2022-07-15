import { useQuery } from '@apollo/client';
import { Redirect } from '@reach/router';
import { toInteger } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getPartnerQuery } from '../../../../utils/gqlQueries';
import { Subtitle, Title } from '../../../Elements';
import EventCard, { ApolloCardEvent, LoadingEventCard } from '../../../Elements/EventCard';
import Footer from '../../../Layout/Footer';
import Header from '../../../Layout/Header';
import { PrivateRouteProps } from '../../../PrivateRoute';
import { forms } from '../EventFormPage/EventForm/FormProvider';
import * as S from './styles';

// This component is supposed to be used in a PrivateRoute and only accessible for 'festival partners'
const ManageEventsPage: React.FC<PrivateRouteProps> = ({ user }) => {
  const { t } = useTranslation();

  const { data, loading } = useQuery<{
    partner: {
      id: number;
      name: string;
      description: string;
      organization: string;
      events: ApolloCardEvent[];
    };
  }>(getPartnerQuery(user.partner?.id).query, {
    skip: !user.partner?.id,
  });

  if (!user.partner?.id) {
    alert(t('manageEventsPage.missingPartnerIdErrorMessage'));
    return <Redirect noThrow to="/" />;
  }

  return (
    <>
      <Header />
      <S.ContentContainer>
        <Title>{t('manageEventsPage.title')}</Title>
        <Subtitle>{t('manageEventsPage.subtitle')}</Subtitle>
        <S.EventsGrid>
          {data ? (
            <>
              {data.partner.events.map((event) => (
                <EventCard
                  key={event.id}
                  linkTo={`/app/manage-events/edit/${event.slug_name}/${forms[0].formKey}`}
                  eventId={toInteger(event.id)}
                  event={event}
                />
              ))}
              <S.AddEventGridElement to="/app/manage-events/new">
                {t('manageEventsPage.submitNewEventlButton')}
              </S.AddEventGridElement>
            </>
          ) : loading ? (
            <LoadingEventCard />
          ) : (
            <S.ErrorMessage>{t('manageEventsPage.failedDataFetchError')}</S.ErrorMessage>
          )}
        </S.EventsGrid>
      </S.ContentContainer>
      <Footer />
    </>
  );
};

export default ManageEventsPage;
