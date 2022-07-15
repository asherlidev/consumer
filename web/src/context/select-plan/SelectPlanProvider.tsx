import { graphql, useStaticQuery } from 'gatsby';
import { filter, findIndex, last, map, toInteger } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SelectPlanQuery, StrapiProduct } from '../../../graphql-types';
import { CouponSku } from '../../types/common';
import * as http from '../../utils/httpClient';
import { useSessionStorage } from '../../utils/storage';
import { useAnalytics } from '../analytics';

type ContextValue = {
  selectedPlan: Plan;
  allPlans: Plan[];
  freePlans: Plan[];
  monthlyPlans: Plan[];
  annualPlans: Plan[];
  amounts: {
    baseAmount: number;
    discount: number;
    totalAmount: number;
  };
  coupon: string;
  couponValidation: {
    couponToValidate: string;
    validationData?: Coupon;
    validationMessage: string;
  };
  isCurrentCouponValid: boolean;
  setCoupon: (newCoupon: string) => void;
  setSelectedPlan: (plan: Plan) => void;
  trackInitiateCheckout: () => void;
  trackPaymentSuccessful: () => void;
  getTierIndex: (plan: Plan) => number;
  calculateAnnualPlanBenefit: (annualPlan: Plan) => {
    annualBenefitAmount: number;
    annualBenefitPercentage: number;
  };
};

const SelectPlanContext = React.createContext<ContextValue | undefined>(undefined);

const SelectPlanProvider: React.FC<{}> = (props) => {
  const { trackWithFbPixel, addToGtmDatalayer } = useAnalytics();

  const data = useStaticQuery<SelectPlanQuery>(selectPlanQuery);

  const plans = useMemo(() => map(data.plans.edges, 'node'), [data.plans.edges]);
  const freePlans = useMemo(() => plans.filter(({ amount }) => !amount), [plans]);
  const monthlyPlans = useMemo(
    () => plans.filter(({ amount, interval }) => amount && amount > 0 && interval === 'month'),
    [plans]
  );
  const annualPlans = useMemo(() => filter(plans, { interval: 'year' }), [plans]);

  const [selectedPlan, setSelectedPlan] = useSessionStorage<Plan>(
    'fp__SelectPlanProvider_selectedPlan',
    last(monthlyPlans)
  );

  const [trackedInitiateCheckout, setTrackedInitiateCheckout] = useSessionStorage<boolean>(
    'fp__SelectPlanProvider_trackedInitiateCheckout',
    false
  );

  const [trackedPaymentSuccessful, setTrackedPaymentSuccessful] = useSessionStorage<boolean>(
    'fp__SelectPlanProvider_trackedPaymentSuccessful',
    false
  );

  const [coupon, setCoupon] = useState<string>('');
  const [couponValidation, setCouponValidation] = useState<{
    couponToValidate: string;
    validationData?: Coupon;
    validationMessage: string;
  }>({ couponToValidate: coupon, validationMessage: '' });

  const validateCoupon = async (couponToValidate: string, productId: number): Promise<any> => {
    setCouponValidation({ couponToValidate, validationMessage: '' });

    if (couponToValidate === '') {
      return;
    }

    try {
      const { promise } = http.customFetch<ValidateCouponResponse>(
        `${process.env.GATSBY_STRAPI_API_URL}/coupons/validate`,
        {
          method: 'POST',
          body: http.json({ coupon: couponToValidate, product_id: productId }),
        }
      );

      const response = await promise;

      if ('message' in response) {
        setCouponValidation({ couponToValidate, validationMessage: response.message });
      } else {
        setCouponValidation({
          couponToValidate,
          validationData: response.data,
          validationMessage: '',
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getTierIndex = useCallback(
    (plan: Plan) => {
      // This code assumes that there are the same amount of paid monthly plans as there are annual plans,
      // and that each monthly plan has a corresponding annual plan (tiers concept)
      const annualPlanIndex = findIndex(annualPlans, { strapiId: plan.strapiId });
      const paidMonthlyPlanIndex = findIndex(monthlyPlans, { strapiId: plan.strapiId });
      return Math.max(annualPlanIndex, paidMonthlyPlanIndex); // One of them will be -1
    },
    [annualPlans, monthlyPlans]
  );

  const calculateAnnualPlanBenefit = useCallback((plan: Plan) => {
    const tierIndex = getTierIndex(plan);
    const relevantMonthlyPlan = monthlyPlans[tierIndex];
    const relevantAnnualPlan = annualPlans[tierIndex];
    const annualBenefitAmount =
      relevantMonthlyPlan && relevantMonthlyPlan.amount
        ? (12 * toInteger(relevantMonthlyPlan.amount) - toInteger(relevantAnnualPlan.amount)) / 100
        : 0;
    const annualBenefitPercentage =
      relevantMonthlyPlan && relevantMonthlyPlan.amount
        ? Math.round(
            (100 *
              (12 * toInteger(relevantMonthlyPlan.amount) - toInteger(relevantAnnualPlan.amount))) /
              (12 * toInteger(relevantMonthlyPlan.amount))
          )
        : 0;
    return {
      annualBenefitAmount,
      annualBenefitPercentage,
    };
  }, []);

  useEffect(() => {
    if (couponValidation?.validationData) {
      // This section will update the validation error messages whenever a new coupon validation object is available or the selected plan changes (e.g. by clicking the annual subscription box)

      let validationMessage = '';

      if (!couponValidation.validationData?.isActive) {
        // Passing the translation key is a workaround to the fact that the translation function (t) is not accessible in the context providers
        validationMessage = 'billingForm.coupon.errorMessages.notActive';
      } else if (couponValidation.validationData?.isRedeemed) {
        validationMessage = 'billingForm.coupon.errorMessages.redeemed';
      } else if (
        couponValidation.validationData?.couponsku?.eligible_product &&
        couponValidation.validationData?.couponsku?.eligible_product !== selectedPlan?.strapiId
      ) {
        validationMessage = 'billingForm.coupon.errorMessages.notEligible';
      }

      if (validationMessage !== couponValidation.validationMessage) {
        setCouponValidation((prevCouponValidation) => ({
          ...prevCouponValidation,
          validationMessage,
        }));
      }
    }
  }, [
    couponValidation.validationData?.couponsku?.eligible_product,
    couponValidation?.validationData,
    selectedPlan?.strapiId,
  ]);

  useEffect(() => {
    const handler = setTimeout(() => {
      validateCoupon(coupon, selectedPlan?.strapiId as number);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [coupon, selectedPlan?.strapiId]);

  const isCurrentCouponValid = useMemo(
    () =>
      !!(
        coupon &&
        couponValidation.couponToValidate === coupon &&
        !couponValidation?.validationMessage
      ),
    [coupon, couponValidation]
  );

  const amounts = useMemo(() => {
    const baseAmountInCents = selectedPlan?.amount || 0;
    let discountInCents = 0;

    if (isCurrentCouponValid) {
      if (couponValidation?.validationData?.amount_off) {
        discountInCents = Math.min(baseAmountInCents, couponValidation.validationData.amount_off);
      } else if (couponValidation?.validationData?.percent_off) {
        discountInCents = Math.min(
          baseAmountInCents,
          (couponValidation.validationData.percent_off / 100) * baseAmountInCents
        );
      }
    }

    return {
      baseAmount: baseAmountInCents / 100,
      discount: discountInCents / 100,
      totalAmount: (baseAmountInCents - discountInCents) / 100,
    };
  }, [
    selectedPlan?.amount,
    isCurrentCouponValid,
    couponValidation?.validationData?.amount_off,
    couponValidation?.validationData?.percent_off,
  ]);

  const trackInitiateCheckout = useCallback(() => {
    if (!trackedInitiateCheckout && selectedPlan) {
      setTrackedInitiateCheckout(true);

      trackWithFbPixel('InitiateCheckout', {
        value: amounts.totalAmount,
        currency: 'USD',
      });
    }
  }, [
    amounts.totalAmount,
    selectedPlan,
    setTrackedInitiateCheckout,
    trackWithFbPixel,
    trackedInitiateCheckout,
  ]);

  const trackPaymentSuccessful = useCallback(() => {
    if (!trackedPaymentSuccessful && selectedPlan) {
      setTrackedPaymentSuccessful(true);

      trackWithFbPixel('Purchase', {
        value: amounts.totalAmount,
        currency: 'USD',
      });

      addToGtmDatalayer({
        event: 'purchase',
        ecommerce: {
          purchase: {
            actionField: {
              id: selectedPlan.id,
              affiliation: 'Festival Pass Website',
              revenue: amounts.totalAmount,
            },
            products: [
              {
                name: selectedPlan.name,
                id: selectedPlan.id,
                price: amounts.totalAmount,
                brand: 'Festival Pass',
                variant: selectedPlan.type,
                quantity: 1,
                ...(isCurrentCouponValid ? { coupon } : {}),
              },
            ],
          },
        },
      });
    }
  }, [
    trackedPaymentSuccessful,
    selectedPlan,
    setTrackedPaymentSuccessful,
    trackWithFbPixel,
    amounts.totalAmount,
    addToGtmDatalayer,
    isCurrentCouponValid,
    coupon,
  ]);

  const value = useMemo(
    () => ({
      allPlans: plans,
      freePlans,
      monthlyPlans,
      annualPlans,
      selectedPlan: selectedPlan as Plan,
      amounts,
      coupon,
      setCoupon,
      couponValidation,
      isCurrentCouponValid,
      setSelectedPlan,
      trackInitiateCheckout,
      trackPaymentSuccessful,
      getTierIndex,
      calculateAnnualPlanBenefit,
    }),
    [
      plans,
      freePlans,
      monthlyPlans,
      annualPlans,
      selectedPlan,
      amounts,
      coupon,
      couponValidation,
      isCurrentCouponValid,
      setSelectedPlan,
      trackInitiateCheckout,
      trackPaymentSuccessful,
      getTierIndex,
      calculateAnnualPlanBenefit,
    ]
  );

  return <SelectPlanContext.Provider value={value} {...props} />;
};

const useSelectPlan = (): ContextValue => {
  const context = useContext(SelectPlanContext);
  if (context === undefined) {
    throw new Error('useSelectPlan must be used within an SelectPlanProvider');
  }
  return context;
};

export { useSelectPlan, SelectPlanProvider };

//
// Utils
//

export type Plan = Pick<
  StrapiProduct,
  | 'strapiId'
  | 'name'
  | 'description'
  | 'credits_awarded'
  | 'amount'
  | 'interval'
  | 'display_name'
  | 'display_price'
  | 'stripe_plan_id'
  | 'order'
  | 'referral_multiplier'
  | 'bonus_tickets'
  | 'isPrepaidAnnualPlan'
>;

const selectPlanQuery = graphql`
  query SelectPlan {
    plans: allStrapiProduct(
      filter: { isActive: { eq: true }, order: { ne: null } }
      sort: { order: ASC, fields: order }
    ) {
      edges {
        node {
          strapiId
          name
          description
          credits_awarded
          amount
          interval
          display_name
          display_price
          stripe_plan_id
          order
          referral_multiplier
          bonus_tickets
          isPrepaidAnnualPlan
        }
      }
    }
  }
`;

type Coupon = {
  id: number;
  name: string;
  description: string;
  code: string;
  duration: 'once' | 'forever' | 'repeating';
  percent_off: number | null;
  created_at: string;
  updated_at: string;
  amount_off: number | null;
  user: any;
  isRedeemed: boolean;
  isActive: boolean;
  product_id: number | null;
  couponsku: CouponSku | null;
  emailTo: string | null;
  first_name: string | null;
  last_name: string | null;
  outboundcampaign: any;
  coupon_id: string;
  includeHat: boolean;
  charge_id: string;
  duration_in_months: number | null;
};

type ValidateCouponResponse =
  | {
      success: true;
      data: Coupon;
    }
  | { success: false; message: string }
  | { error: string; message: string; statusCode: number };
