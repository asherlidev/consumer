import { PageProps } from 'gatsby';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Btn } from '../../Elements';
import { SideImageFormPage } from '../../Layout';
import * as SideImageFormPageStyles from '../../Layout/SideImageFormPage/styles';

const ResetPasswordConfirmationPage: React.FC<PageProps> = ({ location, navigate }) => {
  const { t } = useTranslation();

  const goToLoginPage = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <SideImageFormPage
      centered
      imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1566408291/fp-content/adult-band-concert-120066_reo9kf.jpg"
    >
      <SideImageFormPageStyles.Subheader>
        <SideImageFormPageStyles.Title>
          {t('resetPasswordConfirmationPage.title')}
        </SideImageFormPageStyles.Title>
        <SideImageFormPageStyles.Subtitle>
          {t('resetPasswordConfirmationPage.subtitle')}
        </SideImageFormPageStyles.Subtitle>
      </SideImageFormPageStyles.Subheader>

      <Btn
        onClick={goToLoginPage}
        type="button"
        label={t('resetPasswordConfirmationPage.buttonLabel')}
      />
    </SideImageFormPage>
  );
};

export default ResetPasswordConfirmationPage;
