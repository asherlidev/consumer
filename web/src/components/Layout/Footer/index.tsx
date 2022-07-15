import React from 'react';
import { useTranslation } from 'react-i18next';
import { facebook, helpDesk, instagram, snapchat, twitter } from '../../../constants/urls';
import * as S from './styles';

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <S.Container className={className}>
      <S.Column>
        <S.Logo
          src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1566025698/fp-content/fp-18_ovytfj.svg"
          width="120"
          alt="Festival Pass logo"
        />
        <S.Copyright>{`© ${new Date().getFullYear()} ${t('footer.copyright')}`}</S.Copyright>
      </S.Column>

      <S.Column>
        <S.ColumnHeader>{t('footer.getHelp')}</S.ColumnHeader>
        <S.ExternalLink href={helpDesk} target="_blank" rel="noopener">
          {t('footer.faqs')}
        </S.ExternalLink>
        <S.Link to="/about-us">{t('header.aboutUs')}</S.Link>
        <S.Link to="/events">{t('footer.searchFestivals')}</S.Link>
        <S.Link to="/terms">{t('common.termsOfService')}</S.Link>
        <S.Link to="/privacy">{t('common.privacyPolicy')}</S.Link>
      </S.Column>

      <S.Column>
        <S.ColumnHeader>{t('footer.getInvolved')}</S.ColumnHeader>
        <S.Link to="/partners-register">{t('footer.becomePartner')}</S.Link>
        <S.Link to="/app/invite">{t('footer.inviteFriends')}</S.Link>
      </S.Column>

      <S.Column>
        <S.ColumnHeader>{t('footer.getUpdated')}</S.ColumnHeader>
        <S.SocialIcons>
          <a href={instagram} target="_blank" rel="noreferrer">
            <img
              alt="instagram"
              src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1566690597/fp-content/insttagram-button_op6uhr.svg"
              width="36"
            />
          </a>
          <a href={snapchat} target="_blank" rel="noreferrer">
            <img
              alt="snapchat"
              src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1568401275/fp-content/snapchat-button_shmy1b.svg"
              width="36"
            />
          </a>
          <a href={facebook} target="_blank" rel="noreferrer">
            <img
              alt="facebook"
              src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1566690596/fp-content/facebook-button_zbrbkr.svg"
              width="36"
            />{' '}
          </a>
          <a href={twitter} target="_blank" rel="noreferrer">
            <img
              alt="twitter"
              src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1568401275/fp-content/twitter-button_xvebr2.svg"
              width="36"
            />{' '}
          </a>
        </S.SocialIcons>
      </S.Column>
    </S.Container>
  );
};

export default Footer;
