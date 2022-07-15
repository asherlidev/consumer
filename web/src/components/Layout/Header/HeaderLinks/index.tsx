import { useMatch } from '@reach/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../context/auth';
import { useUser } from '../../../../context/user';
import * as S from './styles';
// import useIsClient from '../../../../utils/useIsClient';
interface Props {
  className?: string;
  solid: boolean;
}

const HeaderLinks: React.FC<Props> = ({ className, solid = false }) => {
  const { t } = useTranslation();
  const currentlyInSettings = useMatch('/app/settings/*');
  const currentlyManagingEvents = useMatch('/app/manage-events/*');
  const { user } = useUser();
  const { isAuthenticated } = useAuth();

  return (
    <S.Container className={className} solid={solid}>
      {isAuthenticated ? (
        <>
          <S.NavLink to={`/gifting/${process.env.GATSBY_DEFAULT_GIFT_CAMPAIGN}`}>
            <img
              src="https://res.cloudinary.com/festivalpass/image/upload/v1575725948/fp-content/icons/ico-gift_gkledr.svg"
              width="28"
              height="24"
              alt="Gift icon"
            />
            <strong>{t('header.buyGift')}</strong>
          </S.NavLink>
          <S.NavLink to="/events">{t('header.festivalsLink')}</S.NavLink>
          <S.NavLink to="/venues">{t('header.venuesLink')}</S.NavLink>
          <S.NavLink to="/hotels">{t('header.hotelsLink')}</S.NavLink>
          <S.NavLink to="/talents">{t('header.talentsLink')}</S.NavLink>
          <S.NavLink to="/stories">{t('header.stories')}</S.NavLink>
          <S.NavLink to="/app/invite">{t('header.inviteLink')}</S.NavLink>
          <S.NavLink to="/app/adventures">{t('header.ticketsLink')}</S.NavLink>
          {!user?.isPaidSubscriber && (
            <S.NavLink
              to="/select-plan"
              style={{ color: '#fa2069', textShadow: '0px 0px 1px #fa2069' }}
            >
              {t('header.paymentLink')}
            </S.NavLink>
          )}
          {currentlyInSettings && !currentlyManagingEvents && (
            <S.NavLink to="/app/settings">{t('header.settingsLink')}</S.NavLink>
          )}
          {currentlyManagingEvents && user?.partner?.id && (
            <S.NavLink to="/app/manage-events">{t('header.manageEventsLink')}</S.NavLink>
          )}
        </>
      ) : (
        <>
          <S.NavLink to={`/gifting/${process.env.GATSBY_DEFAULT_GIFT_CAMPAIGN}`}>
            <img
              src="https://res.cloudinary.com/festivalpass/image/upload/v1575725948/fp-content/icons/ico-gift_gkledr.svg"
              width="28"
              height="24"
              alt="Gift icon"
            />
            <strong>{t('header.buyGift')}</strong>
          </S.NavLink>
          <S.NavLink to="/about-us">{t('header.aboutUs')}</S.NavLink>
          <S.NavLink to="/stories">{t('header.stories')}</S.NavLink>
          <S.NavLink to="/events">{t('header.festivals')}</S.NavLink>
          <S.NavLink to="/venues">{t('header.venuesLink')}</S.NavLink>
          <S.NavLink to="/hotels">{t('header.hotelsLink')}</S.NavLink>
          <S.NavLink to="/talents">{t('header.talentsLink')}</S.NavLink>
          <S.NavLink to="/select-plan">{t('header.pricing')}</S.NavLink>
          <S.NavLink to="/partners-register">{t('header.festivalOwners')}</S.NavLink>
        </>
      )}
    </S.Container>
  );
};

export default HeaderLinks;
