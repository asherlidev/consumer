import { Link, navigate, PageProps } from 'gatsby';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Btn } from '../../../Elements';
import { RightSideImagePage } from '../../../Layout';
import * as S from '../../../Layout/RightSideImagePage/styles';

const GiftingPaymentSuccessfulPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  return (
    <RightSideImagePage
      title={t('giftingPaymentSuccessfulPage.title')}
      subtitle={t('giftingPaymentSuccessfulPage.subtitle')}
      imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1573246985/fp-content/payment-info_eecpoj_tqu62j.png"
    >
      <S.Subtitle>
        <Trans
          i18nKey="giftingPaymentSuccessfulPage.content"
          components={[<Link to="/register">https://www.festivalpass.com/register</Link>]}
        />
      </S.Subtitle>
      <Btn onClick={() => navigate('/events')}>{t('giftingPaymentSuccessfulPage.primaryBtn')}</Btn>
    </RightSideImagePage>
  );
};

export default GiftingPaymentSuccessfulPage;
