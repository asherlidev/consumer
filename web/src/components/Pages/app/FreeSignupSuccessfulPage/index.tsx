import { navigate } from 'gatsby';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import colors from '../../../../constants/colors';
import { Btn } from '../../../Elements';
import { FeatureList, RightSideImagePage } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';

const FreeSignupSuccessfulPage: React.FC<PrivateRouteProps> = () => {
  const { t } = useTranslation();

  return (
    <RightSideImagePage
      title={t('freeSignupSuccessfulPage.title')}
      subtitle={
        <Trans i18nKey="freeSignupSuccessfulPage.subtitle">
          Let the adventure begin. You are now a FREE Member of Festival Pass! A confirmation email
          has been sent to your inbox. What’s next? <a href="/app/invite">Invite your friends!</a>{' '}
          As a FREE Member, you will earn rewards for all friends that sign up using your link/code.
          Give them additional credits when they sign up and earn up credits for yourself!
        </Trans>
      }
      imageUrl="https://res.cloudinary.com/festivalpass/image/upload/r_20/v1588521793/fp-content/welcome-let-the-adventure-begin.png"
    >
      <FeatureList
        features={[
          t('freeSignupSuccessfulPage.bullet1'),
          <Trans i18nKey="freeSignupSuccessfulPage.bullet2">
            You are a FREE Member – Upgrade to <a href="/select-plan">founding member</a> status for
            additional credits and benefits
          </Trans>,
        ]}
      />
      <Btn onClick={() => navigate('/app/invite')}>{t('freeSignupSuccessfulPage.primaryBtn')}</Btn>
      <Btn background={colors.white} onClick={() => navigate('/events')}>
        {t('freeSignupSuccessfulPage.secondaryBtn')}
      </Btn>
    </RightSideImagePage>
  );
};

export default FreeSignupSuccessfulPage;
