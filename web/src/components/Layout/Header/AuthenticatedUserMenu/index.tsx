import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React, { useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../context/auth';
import { useUser } from '../../../../context/user';
import { ProfileImage } from '../../../Elements';
import { ModalBody, ModalHeader } from '../../Modal';
import { OverlayBottomRight, OverlayTopRight } from '../../OverlayImages';
import menuModalOverlayBottomRight from './menuModalOverlayBottomRight.svg';
import menuModalOverlayTopRight from './menuModalOverlayTopRight.svg';
import * as S from './styles';

interface Props {
  className?: string;
  solid: boolean;
}

const AuthenticatedUserMenu: React.FC<Props> = ({ className, solid = false }) => {
  const { t } = useTranslation();
  const breakpoints = useBreakpoint();
  const { logout } = useAuth();
  const { user } = useUser();
  const [showMenuModal, setShowMenuModal] = useState(false);

  const renderUserInformation = useMemo(
    () => (
      <S.UserInformation>
        <strong>
          <span>{`${user?.first_name} ${user?.last_name}`}</span>
        </strong>
        <S.MembershipDetails>
          {user?.subscription?.display_name || ''} &#183; {user?.credit_balance || 0}{' '}
          {t('common.credits')}
        </S.MembershipDetails>
      </S.UserInformation>
    ),
    [user?.first_name, user?.last_name, user?.subscription?.display_name, user?.credit_balance, t]
  );

  return (
    <>
      <S.Container className={className} solid={solid} onClick={() => setShowMenuModal(true)}>
        {breakpoints.smUp && user && renderUserInformation}
        <ProfileImage />
      </S.Container>

      <Modal
        show={showMenuModal}
        onHide={() => setShowMenuModal(false)}
        className="animated bounceIn"
      >
        <ModalHeader onClose={() => setShowMenuModal(false)} />
        <ModalBody>
          {user && renderUserInformation}
          <S.ModalNavLink to="/app/settings/account">{t('header.settingsLink')}</S.ModalNavLink>
          <S.ModalNavLink to="/app/adventures">{t('header.ticketsLink')}</S.ModalNavLink>
          <S.ModalNavLink to="/app/wishlists">{t('header.wishlistsLink')}</S.ModalNavLink>
          {user?.partner?.id && (
            <S.ModalNavLink to="/app/manage-events">{t('header.manageEventsLink')}</S.ModalNavLink>
          )}
          <S.LogoutButton onClick={logout}>{t('header.logoutLink')}</S.LogoutButton>
        </ModalBody>
        <OverlayTopRight alt="Menu modal overlay top right" src={menuModalOverlayTopRight} />
        <OverlayBottomRight
          alt="Menu modal overlay bottom right"
          src={menuModalOverlayBottomRight}
        />
      </Modal>
    </>
  );
};

export default AuthenticatedUserMenu;
