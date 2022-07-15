import { PageProps } from 'gatsby';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SideImageFormPage } from '../../Layout';
import * as SideImageFormPageStyles from '../../Layout/SideImageFormPage/styles';

const ForgotPasswordConfirmationPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  return (
    <SideImageFormPage
      centered
      imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1566408291/fp-content/adult-band-concert-120066_reo9kf.jpg"
    >
      <SideImageFormPageStyles.Subheader>
        <SideImageFormPageStyles.Title>
          {t('forgotPasswordConfirmationPage.title')}
        </SideImageFormPageStyles.Title>
        <SideImageFormPageStyles.Subtitle>
          {t('forgotPasswordConfirmationPage.subtitle')}
        </SideImageFormPageStyles.Subtitle>
      </SideImageFormPageStyles.Subheader>
    </SideImageFormPage>
  );
};

export default ForgotPasswordConfirmationPage;
