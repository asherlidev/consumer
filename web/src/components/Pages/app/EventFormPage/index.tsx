import { Redirect } from '@reach/router';
import { toString } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer, Header, PageWrapper } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import { EventFormPageContent, EventFormProvider, EventPreviewProvider } from './EventForm';

const EventFormPage: React.FC<PrivateRouteProps> = ({ user }) => {
  const { t } = useTranslation();

  const partnerId = useMemo(() => user.partner?.id, [user.partner?.id]);

  if (!partnerId) {
    alert(t('manageEventsPage.missingPartnerIdErrorMessage'));
    return <Redirect noThrow to="/" />;
  }

  return (
    <>
      <Header />
      <EventFormProvider partnerId={toString(partnerId)}>
        <EventPreviewProvider>
          <PageWrapper>
            <EventFormPageContent />
          </PageWrapper>
        </EventPreviewProvider>
      </EventFormProvider>
      <Footer />
    </>
  );
};

export default EventFormPage;
