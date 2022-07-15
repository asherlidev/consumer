import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import festivalPassLogo from './festivalPassLogo.svg';
import * as S from './styles';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Logo src={festivalPassLogo} alt="FestivalPass logo" height="120" width="120" />
      <h1>{t('notFoundPage.title')}</h1>
      <S.CaptionText>{t('notFoundPage.subtitle')}</S.CaptionText>
      <Link to="/">{t('notFoundPage.link')}</Link>
    </S.Container>
  );
};

export default NotFoundPage;
