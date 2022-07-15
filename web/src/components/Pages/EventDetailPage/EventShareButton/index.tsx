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

interface Props {
  className?: string;
  text?: string;
}

const EventShareButton: React.FC<Props> = ({ className, text }) => {
  const { t } = useTranslation();
  const { href } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const shareContent = text
    ? `Check out this ${text} from Festival Pass!`
    : 'Check out this event from Festival Pass!';
  const shareContentHeading = text
    ? `Share this ${text} with friends`
    : 'Share this event with friends';

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Btn
        label="Share"
        height="40px"
        fontSize="14px"
        img={shareIcon}
        className={className}
        color={colors.textDefault}
        background={colors.transparent}
        onClick={onOpen}
      />
      <Modal show={isOpen} onHide={onClose} className="animated bounceIn">
        <ModalHeader onClose={onClose} />
        <ModalBody>
          <div style={{ textAlign: 'left' }}>
            <S.ShareModalHeading>{shareContentHeading}</S.ShareModalHeading>
            <div className="mar-top40">
              <p>
                <strong>Social Media</strong>
              </p>
              <S.FacebookButton url={href} quote={shareContent}>
                <FacebookIcon size={48} borderRadius={14} />
              </S.FacebookButton>
              <S.TwitterButton url={href} title={shareContent}>
                <TwitterIcon size={48} borderRadius={14} />
              </S.TwitterButton>
              <S.RedditButton url={href} title={shareContent}>
                <RedditIcon size={48} borderRadius={14} />
              </S.RedditButton>
            </div>
            <div className="mar-top20">
              <p>
                <strong>Messaging & Email</strong>
              </p>
              <S.EmailButton url={href} subject={shareContent}>
                <EmailIcon size={48} borderRadius={14} />
              </S.EmailButton>
              <a href={`sms:&body=${shareContent} ${href}`}>
                <S.IMessageButton>
                  <S.IMessageIcon src={iMessageIcon} />
                </S.IMessageButton>
              </a>
              <S.MessengerButton url={href} appId="477578572788198">
                <FacebookMessengerIcon size={48} borderRadius={14} />
              </S.MessengerButton>
              <S.WhatsappButton url={href} title={shareContent}>
                <WhatsappIcon size={48} borderRadius={14} />
              </S.WhatsappButton>
            </div>
            <div className="mar-top20">
              <p>
                <strong>Copy link</strong>
              </p>
              <S.LinkContainer>
                <S.Link>{href}</S.Link>
                <div>
                  <CopyToClipboard text={href} onCopy={() => setIsCopied(true)}>
                    <S.CopyButton>
                      {isCopied
                        ? t('invitePage.referral.copiedButtonLabel')
                        : t('invitePage.referral.copyButtonLabel')}
                    </S.CopyButton>
                  </CopyToClipboard>
                </div>
              </S.LinkContainer>
            </div>
          </div>
        </ModalBody>
        <OverlayTopRight alt="Menu modal overlay top right" src={modalOverlayTopRight} />
        <OverlayBottomRight alt="Menu modal overlay bottom right" src={modalOverlayBottomRight} />
      </Modal>
    </>
  );
};

export default EventShareButton;

/**
 * TODO
 * - Message (SMS) button
 * - Update each button default content (quote, hashtag, title)
 */
