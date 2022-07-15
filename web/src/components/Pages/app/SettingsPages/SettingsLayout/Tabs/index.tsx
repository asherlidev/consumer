import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

interface Props {}

const Tabs: React.FC<Props> = () => {
  const { t } = useTranslation();

  return (
    <S.Nav>
      <S.FpLink to="/app/settings/account">{t('settingsPage.subHeader.account')}</S.FpLink>
      <S.FpLink to="/app/settings/badges">{t('settingsPage.subHeader.badges')}</S.FpLink>
      <S.FpLink to="/app/settings/preferences">{t('settingsPage.subHeader.preferences')}</S.FpLink>
      <S.FpLink to="/app/settings/payments">{t('settingsPage.subHeader.payments')}</S.FpLink>
      <S.FpLink to="/app/settings/password">{t('settingsPage.subHeader.password')}</S.FpLink>
      <S.FpLink to="/app/settings/recommendations">
        {t('settingsPage.subHeader.recommendations')}
      </S.FpLink>
    </S.Nav>
  );
};

export default Tabs;
