import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { findIndex } from 'lodash';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelectPlan } from '../../../../context/select-plan';
import { RightSideImagePage } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import BillingForm from './BillingForm';

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_KEY as string);

const PaymentPage: React.FC<PrivateRouteProps> = () => {
  const { selectedPlan, annualPlans, trackInitiateCheckout, amounts } = useSelectPlan();
  const { t } = useTranslation();

  useEffect(() => {
    trackInitiateCheckout();
  }, [trackInitiateCheckout]);

  return (
    <RightSideImagePage
      title={t('paymentPage.title')}
      subtitle={
        findIndex(annualPlans, { strapiId: selectedPlan.strapiId }) > -1
          ? t('paymentPage.annualPlanSubtitle', {
              amount: amounts.baseAmount,
              credits: selectedPlan.credits_awarded || 0,
              planName: selectedPlan.display_name,
            })
          : t('paymentPage.subtitle', {
              amount: amounts.baseAmount,
              planName: selectedPlan.display_name,
            })
      }
      imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1573246985/fp-content/payment-info_eecpoj_tqu62j.png"
    >
      <Elements stripe={stripePromise}>
        <BillingForm />
      </Elements>
    </RightSideImagePage>
  );
};

export default PaymentPage;
