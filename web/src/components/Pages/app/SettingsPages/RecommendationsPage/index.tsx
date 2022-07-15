import React from 'react';
import { useTranslation } from 'react-i18next';
import { PrivateRouteProps } from '../../../../PrivateRoute';
import Layout from '../SettingsLayout';
import NewsletterOptInForm from './NewsletterOptInForm';
import NewsletterPreview from './NewsletterPreview';
import * as S from './styles';

const SettingsRecommendationsPage: React.FC<PrivateRouteProps> = ({ user }) => {
  const { t } = useTranslation();
  return (
    <Layout title={t('settingsPage.title')}>
      <S.BodySection>
        <NewsletterOptInForm user={user} />
        <NewsletterPreview />
      </S.BodySection>
    </Layout>
  );
};

export default SettingsRecommendationsPage;
