import { find, last } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelectPlan } from '../../../../../../context/select-plan';
import { Plan } from '../../../../../../context/select-plan/SelectPlanProvider';
import { useToast } from '../../../../../../context/toast';
import { useUser } from '../../../../../../context/user';
import { FetchStatus } from '../../../../../../types/common';
import * as http from '../../../../../../utils/httpClient';
import { BodyText, Button, Title } from '../../../../../Elements';
import { ModalBody, ModalHeader } from '../../../../../Layout';
import checked from '../../../../app/EventFormPage/EventForm/utils/CheckboxField/checked.svg';
import * as SelectPlanS from '../../../../SelectPlanPage/styles';
import * as S from './styles';

interface Props {
  hasPaymentMethods: boolean;
  onSuccess: () => void;
  currentSubscription: string | undefined | null;
  popupAuto?: boolean;
  getCredit?: boolean;
  showModal: boolean;
  setShowModal: (state: boolean) => void;
}

const UpdateMembershipModal: React.FC<Props> = ({
  hasPaymentMethods,
  onSuccess,
  currentSubscription,
  popupAuto,
  getCredit,
  showModal,
  setShowModal,
}) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [updateStatus, setUpdateStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const { addToast } = useToast();
  const { allPlans, freePlans, monthlyPlans, annualPlans, calculateAnnualPlanBenefit } =
    useSelectPlan();
  const [selectedPlan, setSelectedPlan] = useState<Plan>(
    (find(allPlans, { strapiId: user.subscription?.id }) || last(monthlyPlans)) as Plan
  );

  useEffect(() => {
    if (popupAuto) {
      setShowModal(true);
    }
  }, [popupAuto]);

  const missingPaymentMethod = useMemo(
    () => !!find(freePlans, { strapiId: user.subscription?.id }) && !hasPaymentMethods,
    [freePlans, user.subscription?.id, hasPaymentMethods]
  );

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const updateMembership = useCallback(async () => {
    if (!getCredit && selectedPlan.strapiId === user.subscription?.id) {
      toggleModal();
      return;
    }

    if (missingPaymentMethod) {
      addToast(
        t('settingsPage.payments.updateMembershipButton.modal.missingPaymentMethodWarning'),
        { type: 'info' }
      );
      toggleModal();
      return;
    }

    setUpdateStatus(FetchStatus.Loading);

    try {
      const { promise } = http.customFetch<any>(
        `${process.env.GATSBY_STRAPI_API_URL}/billing/membership/update/${user?.id}${
          currentSubscription ? '/' + currentSubscription : ''
        }`,
        {
          method: `${currentSubscription ? 'PUT' : 'POST'}`, // PUT is used when a user has an existing subscription and post is when there is no existing subscription
          body: http.json({ planId: selectedPlan.stripe_plan_id }),
        }
      );

      await promise;

      setUpdateStatus(FetchStatus.Success);
      toggleModal();
      onSuccess();
    } catch (error) {
      console.error(error);
      setUpdateStatus(FetchStatus.Error);
    }
  }, [
    selectedPlan.strapiId,
    selectedPlan.stripe_plan_id,
    user.subscription?.id,
    user.id,
    missingPaymentMethod,
    addToast,
    t,
    currentSubscription,
    onSuccess,
  ]);

  const renderPlan = useCallback(
    (plan: Plan) => {
      const {
        strapiId,
        bonus_tickets,
        credits_awarded,
        interval,
        display_price,
        referral_multiplier,
        display_name,
      } = plan;

      return (
        <SelectPlanS.PlanContainer key={strapiId as number}>
          <S.ArtBox
            onClick={() => setSelectedPlan(plan)}
            isSelected={selectedPlan.strapiId === strapiId}
          >
            {strapiId === selectedPlan.strapiId && (
              <SelectPlanS.CheckedCircleImage src={checked} width="32" alt="Checked circle" />
            )}
            <S.ArtBoxBigTitle>{`$${display_price}`}</S.ArtBoxBigTitle>
            <S.ArtBoxDescriptionContainer>
              <SelectPlanS.ArtBoxDescription>
                <strong>{display_name}</strong>
              </SelectPlanS.ArtBoxDescription>

              <SelectPlanS.ArtBoxDescription>
                <strong>
                  {credits_awarded} {t('selectPlanPage.planCard.credits')}
                </strong>{' '}
                {t('selectPlanPage.planCard.per')} {`${interval}`}
              </SelectPlanS.ArtBoxDescription>

              <SelectPlanS.ArtBoxDescription isHighlighted={!!bonus_tickets}>
                {t(
                  bonus_tickets
                    ? 'selectPlanPage.planCard.bonusTickets.included'
                    : 'selectPlanPage.planCard.bonusTickets.notIncluded'
                )}
              </SelectPlanS.ArtBoxDescription>

              {interval === 'year' && (
                <SelectPlanS.ArtBoxDescription>
                  {t('selectPlanPage.planCard.annualBenefit', calculateAnnualPlanBenefit(plan))}
                </SelectPlanS.ArtBoxDescription>
              )}

              <SelectPlanS.ArtBoxDescription>
                <strong>{referral_multiplier}x</strong> {t('selectPlanPage.planCard.referralBonus')}
              </SelectPlanS.ArtBoxDescription>
            </S.ArtBoxDescriptionContainer>
          </S.ArtBox>
        </SelectPlanS.PlanContainer>
      );
    },
    [calculateAnnualPlanBenefit, selectedPlan.strapiId, t]
  );

  return (
    <Modal show={showModal} onHide={toggleModal}>
      <ModalHeader onClose={toggleModal} />
      <ModalBody footerheightinpx={73}>
        <Title>{t('settingsPage.payments.updateMembershipButton.modal.title')}</Title>
        <BodyText>{t('settingsPage.payments.updateMembershipButton.modal.subtitle')}</BodyText>

        {updateStatus === FetchStatus.Error && (
          <S.WarningText>
            {t('settingsPage.payments.updateMembershipButton.modal.errorMessage')}
          </S.WarningText>
        )}

        <SelectPlanS.SectionContainer>
          <Title>{t('settingsPage.payments.updateMembershipButton.modal.freeMemberships')}</Title>
        </SelectPlanS.SectionContainer>
        {freePlans.map(renderPlan)}

        {missingPaymentMethod && (
          <S.WarningText>
            {t('settingsPage.payments.updateMembershipButton.modal.missingPaymentMethodWarning')}
          </S.WarningText>
        )}

        <SelectPlanS.SectionContainer>
          <Title>{t('selectPlanPage.sections.monthlyMemberships')}</Title>
        </SelectPlanS.SectionContainer>

        {monthlyPlans.map(renderPlan)}

        <SelectPlanS.SectionContainer>
          <Title>{t('selectPlanPage.sections.annualMemberships')}</Title>
        </SelectPlanS.SectionContainer>

        {annualPlans.map(renderPlan)}
      </ModalBody>
      <Modal.Footer>
        <div>
          <Button text onClick={toggleModal}>
            {t('settingsPage.payments.updateMembershipButton.modal.cancelBtn')}
          </Button>
          <Button
            color="primary"
            loading={updateStatus === FetchStatus.Loading}
            onClick={updateMembership}
          >
            {t('settingsPage.payments.updateMembershipButton.modal.submitBtn')}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateMembershipModal;
