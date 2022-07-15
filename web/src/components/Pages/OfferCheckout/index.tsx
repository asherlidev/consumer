import React, { useState, useMemo, useCallback } from 'react';
import { navigate } from 'gatsby';
import { useQuery } from '@apollo/client';
import { useLocation } from '@reach/router';
import { PageProps } from 'gatsby';
import { parse } from 'query-string';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import * as S from './styles';
import BillingForm from './BillingForm';
import { Footer, Header } from '../../Layout';
import { OutboundSuperHeroSection } from '../LandingPage/SuperHeroSection';
import { getCouponSku, getOfferCheckoutQuery } from '../../../utils/gqlQueries';
import { OutboundCampaign } from '../LandingPage/SuperHeroSection/OutboundSuperHeroSection';
import { CouponSku } from '../../../types/common';
import { CenteredLoading } from '../../Elements';

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_KEY as string);

// eslint-disable-next-line no-empty-pattern
const OfferCheckout: React.FC<PageProps<{}, {}>> = ({ pageContext: {} }) => {
  const { search } = useLocation();
  const [email, setEmail] = useState('');

  const { outbound: campaignId } = useMemo(() => parse(search), [search]);

  const { data: campaignData, loading: loadingCampaign } = useQuery<{
    outboundcampaigns: OutboundCampaign[];
    promoOfferPage: {
      title: string;
      content: string;
      upsell?: any;
    };
  }>(getOfferCheckoutQuery(campaignId as string));

  const outboundCampaign =
    (campaignData?.outboundcampaigns.length || 0) >= 1
      ? ({ ...campaignData?.outboundcampaigns[0] } as OutboundCampaign)
      : undefined;

  const { data: couponData, loading: loadingCoupon } = useQuery<{
    couponskus: CouponSku[];
  }>(getCouponSku(outboundCampaign?.id || 0));

  const couponsku =
    (couponData?.couponskus.length || 0) >= 1
      ? ({ ...couponData?.couponskus[0] } as CouponSku)
      : undefined;

  const loading = loadingCampaign || loadingCoupon;

  const onOutboundSubmit = useCallback(async (email: string) => {
    setEmail(email);
    setTimeout(() => {
      document.querySelector('#offer-contact-info')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 10);
  }, []);

  const completeSignup = (includesOffer: boolean) => {
    navigate(`/offer-payment-success?id=${outboundCampaign?.campaign_id}&addon=${includesOffer}`);
  };

  if (outboundCampaign && !outboundCampaign.couponsku) {
    outboundCampaign.couponsku = couponsku;
  }

  return (
    <>
      <Header />
      {loading && <CenteredLoading />}
      {!loading && outboundCampaign && (
        <OutboundSuperHeroSection
          outboundCampaign={outboundCampaign}
          email={email}
          onSubmit={onOutboundSubmit}
        />
      )}
      {!loading && outboundCampaign && campaignData && (
        <div className="row .no-gutters">
          <S.Left className="col-md-6 col-xs-12">
            <S.JumpPlaceholder id="offer-contact-info" />
            <S.Panel className="col-xs-12 col-sm-9">
              <S.FpSubheader>
                <S.Title>{campaignData.promoOfferPage.title}</S.Title>
                <S.Subtitle>{campaignData.promoOfferPage.content}</S.Subtitle>
              </S.FpSubheader>
              <Elements stripe={stripePromise}>
                <BillingForm
                  completeSignup={completeSignup}
                  outboundCampaign={outboundCampaign}
                  email={email}
                  upsell={campaignData.promoOfferPage.upsell}
                />
              </Elements>
            </S.Panel>
          </S.Left>
          <S.Right className="col-md-6 hidden-sm">
            <S.Mask>
              <S.FpFeatureImg src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1595952329/fp-content/OfferImage.png" />
            </S.Mask>
          </S.Right>
        </div>
      )}
      <Footer />
    </>
  );
};

export default OfferCheckout;
