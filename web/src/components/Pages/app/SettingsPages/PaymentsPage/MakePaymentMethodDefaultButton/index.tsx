import React, { useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../../../context/user';
import { FetchStatus } from '../../../../../../types/common';
import * as http from '../../../../../../utils/httpClient';
import { BodyText, Button, Title } from '../../../../../Elements';
import { ModalBody, ModalHeader } from '../../../../../Layout';
import * as S from './styles';

interface Props {
  paymentMethodId: string;
  onSuccess: () => void;
}

const MakePaymentMethodDefaultButton: React.FC<Props> = ({ paymentMethodId, onSuccess }) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [showModal, setShowModal] = useState(false);

  const makeDefaultPaymentMethod = useCallback(async () => {
    setStatus(FetchStatus.Loading);

    try {
      const { promise } = http.customFetch<any>(
        `${process.env.GATSBY_STRAPI_API_URL}/payment-methods/${user?.id}/${paymentMethodId}/default`,
        {
          method: 'PUT',
        }
      );

      await promise;

      setStatus(FetchStatus.Success);

      onSuccess();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      setStatus(FetchStatus.Error);
    }
  }, [user?.id, paymentMethodId, onSuccess]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <S.StyledButton outlined size="small" onClick={toggleModal}>
        {t('settingsPage.payments.makePaymentMethodDefaultButton.buttonText')}
      </S.StyledButton>

      <Modal show={showModal} onHide={toggleModal}>
        <ModalHeader onClose={toggleModal} />
        <ModalBody>
          <Title>
            {t('settingsPage.payments.makePaymentMethodDefaultButton.confirmationModal.title')}
          </Title>
          <BodyText>
            {t('settingsPage.payments.makePaymentMethodDefaultButton.confirmationModal.subtitle')}
          </BodyText>
          <div>
            <Button text onClick={toggleModal}>
              {t(
                'settingsPage.payments.makePaymentMethodDefaultButton.confirmationModal.cancelBtn'
              )}
            </Button>
            <Button
              color="primary"
              loading={status === FetchStatus.Loading}
              onClick={makeDefaultPaymentMethod}
            >
              {t(
                'settingsPage.payments.makePaymentMethodDefaultButton.confirmationModal.submitBtn'
              )}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default MakePaymentMethodDefaultButton;
