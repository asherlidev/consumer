import { navigate, useStaticQuery } from 'gatsby';
import { head, orderBy } from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { useGifting } from '../../../../../context/gifting';
import { GiftPlan } from '../../../../../context/gifting/GiftingProvider';
import { BodyText, Btn, Title } from '../../../../Elements';
import checked from '../../../app/EventFormPage/EventForm/utils/CheckboxField/checked.svg';
import * as LandingPageS from '../../landingPageStyles';
import { InboundCampaign } from '../InboundSuperHeroSection';
import { gql, useMutation, useQuery } from '@apollo/client';
import * as S from './styles';

export interface GiftingCampaign extends InboundCampaign {
  giftproducts: GiftPlan[];
}

interface Props {
  className?: string;
  campaign_id: string;
}

const GiftingSuperHeroSection: React.FC<Props> = ({ className, campaign_id }) => {
  const nd = gql`
  query inboundcampaigns {
    inboundcampaigns(where: { campaign_id: "${campaign_id}" }) {
      name
      campaign_id
      cta_button_label
      super_hero_content
      giftproducts{
        id
        name
        description
        display_name
        display_price
        interval
        bonus_tickets
        credits_awarded
        referral_multiplier
        stripe_plan_id
      }
    }
  }`;

  const { data, loading, error } = useQuery<any>(nd);

  const { giftPlan, setGiftPlan } = useGifting();

  const onSubmit = useCallback(() => {
    navigate('/gifting/payment');
  }, []);

  const sortedGiftPlans = useMemo(
    () => orderBy(data?.inboundcampaigns[0]?.giftproducts, ['credits_awarded'], ['asc']),
    [data?.inboundcampaigns[0]?.giftproducts]
  );

  useEffect(() => {
    if (data?.inboundcampaigns[0]?.giftproducts.length > 0) {
      setGiftPlan(head(data?.inboundcampaigns[0]?.giftproducts) as GiftPlan);
    }
  }, [data]);

  const renderPlan = useCallback(
    (plan: GiftPlan, index: number) => {
      const { id, interval, bonus_tickets, display_price, credits_awarded, referral_multiplier } =
        plan;
      return (
        <S.ArtBox
          id={`plan-${index}`}
          key={id}
          onClick={() => setGiftPlan(plan)}
          active={giftPlan?.id === id}
        >
          {giftPlan?.id === id && (
            <S.CheckedCircleImage id="checked" src={checked} width="32" alt="Checked circle" />
          )}
          <div>
            <S.ArtBoxBigTitle>{`$${display_price}`}</S.ArtBoxBigTitle>
          </div>
          <S.ArtBoxDescriptionContainer>
            <S.ArtBoxDescription>
              <strong>{credits_awarded} credits</strong> per {`${interval}`}
            </S.ArtBoxDescription>
            <S.ArtBoxDescription>
              {bonus_tickets ? 'Bonus tickets' : 'No bonus tickets'}
            </S.ArtBoxDescription>
            <S.ArtBoxDescription>
              <strong>{referral_multiplier}x</strong> referral bonus
            </S.ArtBoxDescription>
            <S.ArtBoxDescription>
              <strong>{interval === 'year' ? '12-month membership' : ''}</strong>
            </S.ArtBoxDescription>
          </S.ArtBoxDescriptionContainer>
        </S.ArtBox>
      );
    },
    [data, giftPlan]
  );

  return (
    <LandingPageS.Section id="super-hero-section" white className={className}>
      <div className="container">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <div className="section-heading">
              <Title>{data?.inboundcampaigns[0]?.name}</Title>

              <BodyText>
                <ReactMarkdown>{data?.inboundcampaigns[0]?.super_hero_content}</ReactMarkdown>
              </BodyText>

              <S.PlansGrid>{sortedGiftPlans.map(renderPlan)}</S.PlansGrid>
              {/* <S.PlansGrid>{data.inboundcampaigns.campaign_id}</S.PlansGrid> */}

              <Btn
                label={data?.inboundcampaigns[0]?.cta_button_label}
                type="button"
                onClick={onSubmit}
                className="animated fadeInUp"
              />
            </div>
          </div>
        </div>
      </div>
    </LandingPageS.Section>
  );
};

export default GiftingSuperHeroSection;
