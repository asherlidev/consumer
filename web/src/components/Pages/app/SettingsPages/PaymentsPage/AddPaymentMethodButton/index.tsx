import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, PaymentMethod } from '@stripe/stripe-js';
import React, { useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from '../../../../../Elements';
import { ModalBody, ModalHeader } from '../../../../../Layout';
import CreditCardForm from '../CreditCardForm';
import * as S from './styles';

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_KEY as string);

interface Props {
  onSuccess: (newPaymentMethod: PaymentMethod) => void;
  setPopupAuto: (state: boolean) => void;
  popupAuto: boolean;
  needLabel: boolean;
}

const AddPaymentMethodButton: React.FC<Props> = ({
  onSuccess,
  popupAuto,
  setPopupAuto,
  needLabel,
}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    if (setPopupAuto && typeof setPopupAuto == 'function') {
      setPopupAuto(false);
    }

    setShowModal((prev) => !prev);
  };

  const onCompleteCreditCardForm = useCallback(
    (newPaymentMethod: PaymentMethod) => {
      onSuccess(newPaymentMethod);
      setShowModal(false);
    },
    [onSuccess]
  );

  return (
    <>
      <S.AddMethodIconButton onClick={toggleModal}>
        <S.PlusIcon />
      </S.AddMethodIconButton>
      {needLabel && <span>Add Payment Method</span>}
      <Modal show={popupAuto || showModal} onHide={toggleModal}>
        <ModalHeader onClose={toggleModal} />
        <ModalBody>
          <Title>{t('settingsPage.payments.addPaymentMethod.modal.title')}</Title>
          <BodyText>{t('settingsPage.payments.addPaymentMethod.modal.subtitle')}</BodyText>
          <Elements stripe={stripePromise}>
            <CreditCardForm onClose={onCompleteCreditCardForm} />
          </Elements>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddPaymentMethodButton;
