import React, { useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../../../context/user';
import { FetchStatus } from '../../../../../../types/common';
import * as http from '../../../../../../utils/httpClient';
import { BodyText, Button, Title } from '../../../../../Elements';
import { ModalBody, ModalHeader } from '../../../../../Layout';

interface Props {
  paymentMethodId: string;
  onSuccess: () => void;
}

const RemovePaymentMethodButton: React.FC<Props> = ({ paymentMethodId, onSuccess }) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [deleteStatus, setDeleteStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [showModal, setShowModal] = useState(false);

  const deletePaymentMethod = useCallback(async () => {
    setDeleteStatus(FetchStatus.Loading);

    try {
      const { promise } = http.customFetch<any>(
        `${process.env.GATSBY_STRAPI_API_URL}/payment-methods/${user?.id}/${paymentMethodId}`,
        {
          method: 'DELETE',
        }
      );

      await promise;

      setDeleteStatus(FetchStatus.Success);

      onSuccess();
    } catch (error) {
      console.error(error);
      setDeleteStatus(FetchStatus.Error);
    }
  }, [user?.id, paymentMethodId, onSuccess]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Button outlined size="small" onClick={toggleModal}>
        {t('settingsPage.payments.removePaymentMethodButton.buttonText')}
      </Button>

      <Modal show={showModal} onHide={toggleModal}>
        <ModalHeader onClose={toggleModal} />
        <ModalBody>
          <Title>
            {t('settingsPage.payments.removePaymentMethodButton.confirmationModal.title')}
          </Title>
          <BodyText>
            {t('settingsPage.payments.removePaymentMethodButton.confirmationModal.subtitle')}
          </BodyText>
          <div>
            <Button text onClick={toggleModal}>
              {t('settingsPage.payments.removePaymentMethodButton.confirmationModal.cancelBtn')}
            </Button>
            <Button
              color="primary"
              loading={deleteStatus === FetchStatus.Loading}
              onClick={deletePaymentMethod}
            >
              {t('settingsPage.payments.removePaymentMethodButton.confirmationModal.submitBtn')}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default RemovePaymentMethodButton;
