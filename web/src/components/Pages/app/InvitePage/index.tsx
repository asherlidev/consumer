import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { isEmpty, range } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { User } from '../../../../context/user/UserProvider';
import * as storage from '../../../../utils/storage';
import { BodyText, Btn, Subtitle, Title } from '../../../Elements';
import { ModalBody, ModalHeader } from '../../../Layout';
import Footer from '../../../Layout/Footer';
import Header from '../../../Layout/Header';
import { OverlayBottomLeft } from '../../../Layout/OverlayImages';
import { PrivateRouteProps } from '../../../PrivateRoute';
import modalOverlayBottomLeft from './modalOverlayBottomLeft.svg';
import * as S from './styles';

const showedModalStorageKey = 'fp__InvitePage_showedModal';

const InvitePage: React.FC<PrivateRouteProps> = ({ user }) => {
  const { t } = useTranslation();
  const breakpoints = useBreakpoint();
  const [copiedClipboardContentKey, setCopiedClipboardContentKey] = useState<
    'referral_code' | 'referral_url' | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [showedModal, setShowedModal] = useState<boolean>(
    () => !!storage.loadFromLocalStorage<boolean>(showedModalStorageKey)
  );

  useEffect(() => {
    let timer: number;

    if (!showedModal && user.isPaidSubscriber) {
      timer = setTimeout(() => {
        setShowModal(true);
        updateShowedModal(true);
      }, 3000);
    }

    return () => {
      if (timer != null) {
        clearTimeout(timer);
      }
    };
  }, [user, showedModal]);

  const updateShowedModal = (newValue: boolean) => {
    storage.saveInLocalStorage(showedModalStorageKey, newValue);
    setShowedModal(newValue);
  };

  // Listen to changes in localStorage in order to adapt to actions from other browser tabs
  // This way the user only gets to see the modal once
  useEffect(() => {
    const handleChange = () => {
      updateShowedModal(!!storage.loadFromLocalStorage(showedModalStorageKey));
    };

    window.addEventListener('storage', handleChange, false);

    return () => {
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
    updateShowedModal(true);
  };

  const renderReferralStatus = useCallback(
    (referral: User) => {
      if (referral.isPaidSubscriber) {
        return t('invitePage.referral.referralStatus.paidMember');
      } else if (referral.confirmed) {
        return t('invitePage.referral.referralStatus.basicMember');
      } else {
        return t('invitePage.referral.referralStatus.notConfirmed');
      }
    },
    [t]
  );

  const renderReferralEarnedAmount = useCallback(
    (referral: User) =>
      referral.isPaidSubscriber
        ? `+${user.membership === 'Founding' ? 12 : 6} ${t('Credits')}`
        : `0 ${t('Credits')}`,
    [user, t]
  );

  const renderReferral = useCallback(
    (referral: User) => (
      <S.ReferralsTableRow className="row" key={referral.id}>
        <p className="col-xs-6 col-sm-4">{`${referral.first_name} ${referral.last_name}`}</p>
        <p className="hidden-xs col-sm-4">{renderReferralStatus(referral)}</p>
        <S.ReferralEarnedAmountContainer
          className="col-xs-6 col-sm-4"
          isPositiveAmount={!!referral.isPaidSubscriber}
        >
          {renderReferralEarnedAmount(referral)}
        </S.ReferralEarnedAmountContainer>
      </S.ReferralsTableRow>
    ),
    [renderReferralStatus, renderReferralEarnedAmount]
  );

  const renderCopiableTextSection = useCallback(
    ({
      className,
      label,
      copiableText,
      clipboardContentKey,
    }: {
      className: string;
      label: string;
      copiableText: string;
      clipboardContentKey: 'referral_code' | 'referral_url';
    }) => (
      <S.CopiableTextSection className={className}>
        <p>
          <strong>{label}</strong>
        </p>
        <S.CodeContainer className="col-xs-9">
          <span>{copiableText}</span>
          <CopyToClipboard
            text={copiableText}
            onCopy={() => setCopiedClipboardContentKey(clipboardContentKey)}
          >
            <S.CopyButton className="btn">
              {copiedClipboardContentKey === clipboardContentKey
                ? t('invitePage.referral.copiedButtonLabel')
                : t('invitePage.referral.copyButtonLabel')}
            </S.CopyButton>
          </CopyToClipboard>
        </S.CodeContainer>
      </S.CopiableTextSection>
    ),
    [copiedClipboardContentKey, t]
  );

  return (
    <>
      <S.Container>
        <Header />
        <div className="row no-gutter">
          <S.LeftPanel className="col-sm-6 col-xs-12 col-lg-5 col-lg-offset-1">
            <S.Subheader>
              <Title>{t('invitePage.title')}</Title>
              <Subtitle>{t('invitePage.subtitle')}</Subtitle>
            </S.Subheader>

            <section className="row">
              {range(1, 4).map((nr: number) => (
                <div key={nr} className="col-sm-4 text-center">
                  <S.Circle>{nr}</S.Circle>
                  <p>
                    <strong>{t(`invitePage.option${nr}.strong`)}</strong>{' '}
                    {t(`invitePage.option${nr}.text`)}
                  </p>
                </div>
              ))}
            </section>

            <section className="mar-top20">
              <S.ShareRow>
                <p>
                  <strong>{t('invitePage.referral.share')}</strong>
                </p>
                <div>
                  <S.FacebookButton
                    url={user.referral_url}
                    quote={t('invitePage.referral.socialShareTitle')}
                  >
                    <FacebookIcon size={48} />
                  </S.FacebookButton>
                  <S.TwitterButton
                    url={user.referral_url}
                    title={t('invitePage.referral.socialShareTitle')}
                  >
                    <TwitterIcon size={48} />
                  </S.TwitterButton>
                </div>
              </S.ShareRow>
            </section>

            {renderCopiableTextSection({
              className: 'mar-top20',
              label: t('invitePage.referral.coupon'),
              copiableText: user.referral_code,
              clipboardContentKey: 'referral_code',
            })}

            {renderCopiableTextSection({
              className: 'mar-top40',
              label: t('invitePage.referral.link'),
              copiableText: user.referral_url,
              clipboardContentKey: 'referral_url',
            })}

            {!isEmpty(user.referrals) && (
              <S.ReferralsSection>
                <hr />
                <S.ReferralsTableHeader className="row">
                  <p className="col-xs-6 col-sm-4">
                    <strong>{t('invitePage.referral.friend')}</strong>
                  </p>
                  <p className="hidden-xs col-sm-4">
                    <strong>{t('invitePage.referral.status')}</strong>
                  </p>
                  <p className="col-xs-6 col-sm-4">
                    <strong>{t('invitePage.referral.earned')}</strong>
                  </p>
                </S.ReferralsTableHeader>
                {user.referrals.map(renderReferral)}
              </S.ReferralsSection>
            )}
          </S.LeftPanel>
          <S.RightPanel className="col-lg-offset-1 col-sm-6 col-lg-5 hidden-xs">
            <S.Mask>
              <S.FeatureImage
                src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1568415939/fp-content/story-web_e6zqyn.png"
                src-set="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1568416277/fp-content/story-web_2x_snlrcd.png"
              />
            </S.Mask>
          </S.RightPanel>
        </div>
        <Footer />
      </S.Container>

      <Modal show={showModal} onHide={closeModal}>
        <ModalHeader onClose={closeModal} />
        <ModalBody>
          <Title>{t('invitePage.modal.title')}</Title>
          <BodyText>{t('invitePage.modal.subtitle')}</BodyText>
          <S.ModalCreditsText>
            {t('invitePage.modal.creditsText', { credits: user.credit_balance })}
          </S.ModalCreditsText>
          <S.ButtonContainer>
            <Btn
              width={breakpoints.xsDown ? '100%' : '200px'}
              label={t('invitePage.modal.confirmButtonLabel')}
              onClick={closeModal}
            />
          </S.ButtonContainer>
        </ModalBody>
        <OverlayBottomLeft alt="Modal overlay bottom left" src={modalOverlayBottomLeft} />
      </Modal>
    </>
  );
};

export default InvitePage;
