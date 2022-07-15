import { Link, navigate } from 'gatsby';
import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import colors from '../../../../constants/colors';
import { useSelectPlan } from '../../../../context/select-plan';
import { Btn } from '../../../Elements';
import { FeatureList, RightSideImagePage } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';

const PaymentSuccessfulPage: React.FC<PrivateRouteProps> = ({ user: { isPrepaidSubscriber } }) => {
  const { t } = useTranslation();
  const { trackPaymentSuccessful, selectedPlan } = useSelectPlan();

  useEffect(() => {
    // When this page renders, the customer finished paying for his plan so we track the purchase
    trackPaymentSuccessful();
  }, [trackPaymentSuccessful]);

  return (
    <RightSideImagePage
      title={t('paymentSuccessfulPage.title')}
      subtitle={
        <Trans i18nKey="paymentSuccessfulPage.subtitle">
          You are now have the {{ planName: selectedPlan.display_name }} Festival Pass! A
          confirmation email has been sent to your inbox. What’s next?{' '}
          <Link to="/app/invite">Invite your friends!</Link> As a Founding Member, you will earn 2X
          rewards, for a limited time, for all friends that sign up using your link/code. Give them
          6 additional credits when they sign up and earn 12 additional credits for yourself!
        </Trans>
      }
      imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1573246985/fp-content/payment-info_eecpoj_tqu62j.png"
    >
      <FeatureList
        features={[
          t('paymentSuccessfulPage.bullet1'),
          t('paymentSuccessfulPage.bullet2'),
          isPrepaidSubscriber
            ? t('paymentSuccessfulPage.bullet3Annual', {
                planName: selectedPlan.display_name,
                creditAmount: selectedPlan.credits_awarded,
              })
            : t('paymentSuccessfulPage.bullet3'),
        ]}
      />
      <Btn onClick={() => navigate('/app/invite')}>{t('paymentSuccessfulPage.primaryBtn')}</Btn>
      <Btn background={colors.white} onClick={() => navigate('/events')}>
        {t('paymentSuccessfulPage.secondaryBtn')}
      </Btn>
    </RightSideImagePage>
  );
};

export default PaymentSuccessfulPage;
