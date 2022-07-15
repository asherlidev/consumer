import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGifting } from '../../../../context/gifting';
import { RightSideImagePage } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import BillingForm from './BillingForm';

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_KEY as string);

const GiftingPaymentPage: React.FC<PrivateRouteProps> = () => {
  const { giftPlan } = useGifting();
  const { t } = useTranslation();

  return (
    <RightSideImagePage
      title={t('giftingPaymentPage.title')}
      subtitle={t('giftingPaymentPage.subtitle', {
        amount: giftPlan?.display_price,
        credits: giftPlan?.credits_awarded,
      })}
      imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1573246985/fp-content/payment-info_eecpoj_tqu62j.png"
    >
      <Elements stripe={stripePromise}>
        <BillingForm />
      </Elements>
    </RightSideImagePage>
  );
};

export default GiftingPaymentPage;
