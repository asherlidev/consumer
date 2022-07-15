import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Link, navigate } from 'gatsby';
import { noop } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReferral } from '../../../../../context/referral';
import { useSelectPlan } from '../../../../../context/select-plan';
import { Plan } from '../../../../../context/select-plan/SelectPlanProvider';
import { useUser } from '../../../../../context/user';
import { User } from '../../../../../context/user/UserProvider';
import { amountToText } from '../../../../../utils/amounts';
import * as http from '../../../../../utils/httpClient';
import { Btn, Input } from '../../../../Elements';
import { LockIcon } from '../../../../Icons';
import * as S from './styles';

interface Props {}

const BillingForm: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { user, setUser } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const { referralUser } = useReferral();
  const {
    monthlyPlans,
    annualPlans,
    selectedPlan,
    setSelectedPlan,
    amounts,
    isCurrentCouponValid,
    coupon,
    couponValidation,
    setCoupon,
    getTierIndex,
    calculateAnnualPlanBenefit,
  } = useSelectPlan();
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false); // TODO: use Formik
  const [billingDetails, setBillingDetails] = useState<BillingDetailsFormValues>({
    name: '',
    zipcode: '',
  });

  const unmounted = useRef(false);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.persist();
      setBillingDetails((oldBillingDetails) => ({
        ...oldBillingDetails,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleCouponChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();
      setCoupon(event.target.value);
    },
    [setCoupon]
  );

  // TODO: use Formik
  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage('');

    const cardNumberElement = elements?.getElement(CardNumberElement);

    if (!stripe || !elements || !cardNumberElement || !user) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setSubmitting(true);

    try {
      const { token } = await stripe.createToken(cardNumberElement);

      const payload = {
        token: token?.id,
        customer_id: user.stripe_id,
        plan_id: selectedPlan.stripe_plan_id,
        ref_id: referralUser?.id || null,
        product_id: selectedPlan.strapiId,
        user_id: user.id,
      };

      if (isCurrentCouponValid) {
        payload.coupon = coupon;
      }

      const { promise } = http.customFetch<BillSubscriptionResponse>(
        `${process.env.GATSBY_STRAPI_API_URL}/bill-subscription`,
        {
          method: 'POST',
          body: http.json(payload),
        }
      );

      const response = await promise;

      if ('message' in response) {
        console.error(response.message);
        setErrorMessage(response.message);
      } else {
        setUser(response);
        navigate('/app/payment-successful');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.message);
    }

    if (!unmounted.current) {
      setSubmitting(false);
    }
  };

  const relevantMonthlyPlan: Plan = useMemo(() => monthlyPlans[getTierIndex(selectedPlan)], [
    getTierIndex,
    monthlyPlans,
    selectedPlan,
  ]);
  const relevantAnnualPlan: Plan = useMemo(() => annualPlans[getTierIndex(selectedPlan)], [
    annualPlans,
    getTierIndex,
    selectedPlan,
  ]);

  const toggleAnnualPlan = useCallback(() => {
    setSelectedPlan(selectedPlan === relevantAnnualPlan ? relevantMonthlyPlan : relevantAnnualPlan);
  }, [setSelectedPlan, selectedPlan, relevantAnnualPlan, relevantMonthlyPlan]);

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="form-group">
        <Input
          label={t('billingForm.name.label')}
          type="text"
          name="name"
          id="name"
          placeholder={t('billingForm.name.placeholder')}
          onChange={handleChange}
          value={billingDetails.name}
          required
        />
        <div className="founding-member-form">
          <label>{t('billingForm.cardNumber.label')}</label>
          <CardNumberElement
            className="founding-member-form-stripe"
            options={{
              style: S.stripeComponentStyle,
            }}
          />
        </div>
      </div>
      <div className="form-group row" style={{ marginBottom: -20 }}>
        <div className="col-sm-6 founding-member-form">
          <label>{t('billingForm.expirationDate.label')}</label>
          <CardExpiryElement
            className="founding-member-form-stripe"
            options={{
              style: S.stripeComponentStyle,
            }}
          />
        </div>
        <div className="col-sm-6 founding-member-form">
          <label>{t('billingForm.cvc.label')}</label>
          <CardCvcElement
            className="founding-member-form-stripe"
            options={{
              style: S.stripeComponentStyle,
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <Input
            label={t('billingForm.zipcode.label')}
            type="text"
            className="founding-member-form"
            name="zipcode"
            id="zipcode"
            placeholder={t('billingForm.zipcode.placeholder')}
            onChange={handleChange}
            value={billingDetails.zipcode}
            required
          />
        </div>
        <div className="col-sm-6">
          <Input
            label={t('billingForm.coupon.label')}
            type="text"
            className="founding-member-form"
            name="coupon"
            id="coupon"
            placeholder={t('billingForm.coupon.placeholder')}
            onChange={handleCouponChange}
            value={coupon}
          />
        </div>
      </div>

      <S.AnnualOffer
        className="row"
        checked={selectedPlan === relevantAnnualPlan}
        onClick={toggleAnnualPlan}
      >
        <input type="checkbox" checked={selectedPlan === relevantAnnualPlan} onChange={noop} />
        <div>
          <p>
            <strong>
              {t('billingForm.annualPlanOffer.title', {
                benefitPercentage: calculateAnnualPlanBenefit(relevantAnnualPlan)
                  .annualBenefitPercentage,
                credits: relevantAnnualPlan.credits_awarded,
              })}
            </strong>
          </p>
          <p>
            {t('billingForm.annualPlanOffer.subtitle', {
              amount: (relevantAnnualPlan.amount || 0) / 100,
              planName: relevantAnnualPlan.display_name,
            })}
          </p>
        </div>
      </S.AnnualOffer>

      {isCurrentCouponValid && couponValidation?.validationData && (
        <S.CouponSummaryContainer className="row">
          <S.CouponTextContainer>
            <S.CouponName>{couponValidation?.validationData?.name}</S.CouponName>
            <S.CouponDescription>
              {couponValidation?.validationData?.description}
            </S.CouponDescription>
          </S.CouponTextContainer>
          <S.CurrencyWrapper>
            <S.Title>- ${amountToText(amounts.discount)}</S.Title>
            <span>{t('billingForm.coupon.discount')}</span>
          </S.CurrencyWrapper>
        </S.CouponSummaryContainer>
      )}

      <S.ErrorMessage>{errorMessage || t(couponValidation.validationMessage)}</S.ErrorMessage>

      <S.BtnRow>
        <Btn
          label={t('common.join2')}
          isLoading={submitting}
          disabled={submitting}
          type="button"
          onClick={handleSubmit}
        />
        <div>
          <S.Title>${amountToText(amounts.totalAmount)}</S.Title>
          <span>{t('billingForm.charge')}</span>
        </div>
      </S.BtnRow>

      <S.SecureTxt>
        <LockIcon />
        &nbsp; {t('billingForm.secureNotice')}
      </S.SecureTxt>

      <S.TermsTxt className="row">
        <Link to="/terms" target="_blank">
          {t('common.termsOfService')}
        </Link>{' '}
        &nbsp;{' '}
        <Link to="/privacy" target="_blank">
          {t('common.privacyPolicy')}
        </Link>
      </S.TermsTxt>
    </form>
  );
};

export default BillingForm;

//
// Utils
//

interface BillingDetailsFormValues {
  name: string;
  zipcode: string;
}

type BillSubscriptionResponse =
  | {
      message: string;
    }
  | User;
