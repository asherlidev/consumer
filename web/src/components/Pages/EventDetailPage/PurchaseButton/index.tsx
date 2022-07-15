import React, { useState } from 'react';
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FacebookMessengerIcon,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  RedditIcon,
  EmailIcon,
} from 'react-share';

import colors from '../../../../constants/colors';
import shareIcon from '../EventDetailPageContent/icons/shareIcon.svg';
import iMessageIcon from './imessageIcon.svg';
import modalOverlayTopRight from '../../../Layout/Header/AuthenticatedUserMenu/menuModalOverlayTopRight.svg';
import modalOverlayBottomRight from '../../../Layout/Header/AuthenticatedUserMenu/menuModalOverlayBottomRight.svg';
import { Btn } from '../../../Elements';
import { ModalBody, ModalHeader } from '../../../Layout/Modal';
import { OverlayBottomRight, OverlayTopRight } from '../../../Layout/OverlayImages';
import * as S from './styles';
import { useUser } from '../../../../context/user';

interface Props {
  className?: string;
}

const PurchaseButton: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const { href } = useLocation();
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const shareContent = 'Check out this event from Festival Pass!';

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Btn
        label={t('eventDetailPageContent.tickets.completePurchase')}
        height="54px"
        width="100%"
        fontSize="16px"
        fontWeight={600}
        color={colors.white}
        background={colors.error}
        hoverBackground={colors.error}
        onClick={onOpen}
      />
      <Modal show={isOpen} onHide={onClose} className="animated bounceIn">
        <ModalHeader onClose={onClose} />
        <ModalBody>
          <div style={{ textAlign: 'left' }}>
            <S.ShareModalHeading>
              You have now: {user?.credit_balance || 0} {t('common.credits')}
            </S.ShareModalHeading>
            <div className="mar-top40">
              <p>{t('eventDetailPageContent.tickets.seatPrice')}</p>
              <p>
                2 {t('eventDetailPageContent.tickets.seats')} x 55 = 110{' '}
                {t('eventDetailPageContent.tickets.credits')}
              </p>
              <p>
                {t('eventDetailPageContent.tickets.totalPrice')}: 110{' '}
                {t('eventDetailPageContent.tickets.credits')}
              </p>
              <div className="text-center">
                <Btn
                  label={t('eventDetailPageContent.tickets.go')}
                  height="40px"
                  fontSize="16px"
                  color={colors.white}
                  background={colors.error}
                  hoverBackground={colors.error}
                  onClick={onClose}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <OverlayTopRight alt="Menu modal overlay top right" src={modalOverlayTopRight} />
        <OverlayBottomRight alt="Menu modal overlay bottom right" src={modalOverlayBottomRight} />
      </Modal>
    </>
  );
};

export default PurchaseButton;

/**
 * TODO
 * - Message (SMS) button
 * - Update each button default content (quote, hashtag, title)
 */
