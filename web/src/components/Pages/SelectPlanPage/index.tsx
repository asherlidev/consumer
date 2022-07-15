import { navigate, PageProps } from 'gatsby';
import { last } from 'lodash';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Btn, Subtitle, Title } from '../../../components/Elements';
import { useAuth } from '../../../context/auth';
import { useSelectPlan } from '../../../context/select-plan';
import { Plan } from '../../../context/select-plan/SelectPlanProvider';
import { Footer, Header } from '../../Layout';
import checked from '../app/EventFormPage/EventForm/utils/CheckboxField/checked.svg';
import * as S from './styles';

const SelectPlanPage: React.FC<PageProps<{}>> = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const {
    monthlyPlans,
    annualPlans,
    selectedPlan,
    setSelectedPlan,
    calculateAnnualPlanBenefit,
  } = useSelectPlan();

  const handleSubmit = useCallback(() => {
    if (selectedPlan.order === 0) {
      navigate('/app/free-signup-successful');
    } else {
      navigate('/app/payment');
    }
  }, [selectedPlan.order]);

  const renderPlan = useCallback(
    (plan: Plan) => {
      const {
        strapiId,
        bonus_tickets,
        credits_awarded,
        order,
        interval,
        display_price,
        referral_multiplier,
        display_name,
      } = plan;

      const { annualBenefitAmount, annualBenefitPercentage } = calculateAnnualPlanBenefit(plan);

      return (
        <S.PlanContainer key={strapiId as number}>
          <S.ArtBox onClick={() => setSelectedPlan(plan)} isSelected={selectedPlan.order === order}>
            {order === selectedPlan.order && (
              <S.CheckedCircleImage src={checked} width="32" alt="Checked circle" />
            )}
            <S.ArtBoxBigTitle>{`$${display_price}`}</S.ArtBoxBigTitle>
            <S.ArtBoxDescriptionContainer>
              <S.ArtBoxDescription>
                <strong>{display_name}</strong>
              </S.ArtBoxDescription>

              <S.ArtBoxDescription>
                <strong>
                  {credits_awarded} {t('selectPlanPage.planCard.credits')}
                </strong>{' '}
                {t('selectPlanPage.planCard.per')} {`${interval}`}
              </S.ArtBoxDescription>

              <S.ArtBoxDescription isHighlighted={!!bonus_tickets}>
                {t(
                  bonus_tickets
                    ? 'selectPlanPage.planCard.bonusTickets.included'
                    : 'selectPlanPage.planCard.bonusTickets.notIncluded'
                )}
              </S.ArtBoxDescription>

              {interval === 'year' && (
                <S.ArtBoxDescription>
                  {t('selectPlanPage.planCard.annualBenefit', {
                    annualBenefitAmount,
                    annualBenefitPercentage,
                  })}
                </S.ArtBoxDescription>
              )}

              <S.ArtBoxDescription>
                <strong>{referral_multiplier}x</strong> {t('selectPlanPage.planCard.referralBonus')}
              </S.ArtBoxDescription>
            </S.ArtBoxDescriptionContainer>
          </S.ArtBox>
        </S.PlanContainer>
      );
    },
    [calculateAnnualPlanBenefit, selectedPlan.order, setSelectedPlan, t]
  );

  return (
    <>
      <Header />

      <S.ContentContainer>
        <S.TitleContainer>
          <Title>
            {t(
              isAuthenticated
                ? 'selectPlanPage.title.authenticated'
                : 'selectPlanPage.title.unauthenticated'
            )}
          </Title>
          <Subtitle>
            {isAuthenticated
              ? t('selectPlanPage.subtitle.authenticated', {
                  maximumAnnualBenefitAmount: calculateAnnualPlanBenefit(last(annualPlans) as Plan)
                    .annualBenefitAmount,
                })
              : t('selectPlanPage.subtitle.unauthenticated')}
          </Subtitle>
        </S.TitleContainer>

        <S.SectionContainer>
          <Title>{t('selectPlanPage.sections.monthlyMemberships')}</Title>
        </S.SectionContainer>

        <S.PlansGrid>{monthlyPlans.map(renderPlan)}</S.PlansGrid>

        <S.FreeSignupLink to="/app/free-signup-successful">
          {t('selectPlanPage.submitSection.confirmFreePlanButtonText')} &#8250;&#8250;
        </S.FreeSignupLink>

        <S.SectionContainer>
          <Title>{t('selectPlanPage.sections.annualMemberships')}</Title>
        </S.SectionContainer>

        <S.PlansGrid>{annualPlans.map(renderPlan)}</S.PlansGrid>

        <S.SubmitButtonsContainer>
          <Btn
            width="100%"
            label={t('selectPlanPage.submitSection.confirmPaidPlanButtonText')}
            onClick={handleSubmit}
          />
          <S.FreeSignupLink to="/app/free-signup-successful">
            {t('selectPlanPage.submitSection.confirmFreePlanButtonText')} &#8250;&#8250;
          </S.FreeSignupLink>
          <S.SmallTxt>
            {t('selectPlanPage.submitSection.extraInformation', {
              lastMontlyTierAmount: ((last(monthlyPlans) as Plan).amount || 0) / 100,
              lastAnnualTierAmount: ((last(annualPlans) as Plan).amount || 0) / (100 * 12),
              lastAnnualTierCredits: (last(annualPlans) as Plan).credits_awarded,
            })}
          </S.SmallTxt>
        </S.SubmitButtonsContainer>

        <S.FormFooter className="row">
          <S.FooterLink to="/terms" target="_blank">
            {t('common.termsOfService')}
          </S.FooterLink>{' '}
          &nbsp;{' '}
          <S.FooterLink to="/privacy" target="_blank">
            {t('common.privacyPolicy')}
          </S.FooterLink>
        </S.FormFooter>
      </S.ContentContainer>

      <Footer />
    </>
  );
};

export default SelectPlanPage;
