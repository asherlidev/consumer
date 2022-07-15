import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

interface Props {
  className?: string;
  solid: boolean;
}

const UnauthenticatedUserMenu: React.FC<Props> = ({ className, solid = false }) => {
  const { t } = useTranslation();

  return (
    <S.Container className={className} solid={solid}>
      <S.Link to="/login">
        <S.LoginButton>{t('common.login')}</S.LoginButton>
      </S.Link>
      <S.Link to="/register">
        <S.SignUpButton>{t('common.signUp')}</S.SignUpButton>
      </S.Link>
    </S.Container>
  );
};

export default UnauthenticatedUserMenu;
