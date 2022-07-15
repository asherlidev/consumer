import { Redirect } from '@reach/router';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useClaimEvent } from '../../../../context/claim-event';
import { Breadcrumbs, Btn, ScrollToTop, Subtitle, Title } from '../../../Elements';
import { FeatureList, Footer, Header, PageWrapper } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import * as S from './styles';

interface Props extends PrivateRouteProps {
  slug?: string;
}

const ClaimEventConfirmationPage: React.FC<Props> = ({ slug, navigate }) => {
  const { t } = useTranslation();
  const breakpoints = useBreakpoint();
  const { claimedEvent, setClaimedEvent } = useClaimEvent();

  if (claimedEvent == null || claimedEvent.slug_name !== slug) {
    // TODO: in case claimedEvent == null, the new event should be fetched and set as claimedEvent
    // So no redirect is needed
    // Same for the other pages
    return <Redirect noThrow to={`/events/${slug}`} />;
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <PageWrapper>
        <div className="container">
          <div className="row">
            <S.Container>
              <Breadcrumbs
                links={[
                  { children: claimedEvent.name, to: `/events/${slug}` },
                  {
                    children: t('claimEventConfirmationPage.breadcrumbTitle'),
                    to: `/app/events/${slug}/claim/confirmation`,
                  },
                ]}
              />

              <Title>{t('claimEventConfirmationPage.title')}</Title>
              <Subtitle>
                {t('claimEventConfirmationPage.subtitle', { eventName: claimedEvent?.name })}
              </Subtitle>

              <FeatureList
                features={[
                  t('claimEventConfirmationPage.feature1'),
                  t('claimEventConfirmationPage.feature2'),
                  t('claimEventConfirmationPage.feature3'),
                ]}
              />

              <Btn
                label={t('claimEventConfirmationPage.continueButton')}
                type="button"
                width={breakpoints.xsDown ? '100%' : 'auto'}
                onClick={() => {
                  setClaimedEvent(undefined);
                  navigate('/app/manage-events');
                }}
              />
            </S.Container>
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default ClaimEventConfirmationPage;
