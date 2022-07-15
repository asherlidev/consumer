import { Field, Form, Formik } from 'formik';
import { navigate } from 'gatsby';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { usePresignup } from '../../../../../context/presignup';
import { useReferral } from '../../../../../context/referral';
import { BodyText, Btn, FormikInput, Title } from '../../../../Elements';
import * as LandingPageS from '../../landingPageStyles';
import OrganicOverlayImages from '../OrganicOverlayImages';

interface Props {
  className?: string;
  referralCode: string;
}

const ReferralSuperHeroSection: React.FC<Props> = ({ className, referralCode }) => {
  const { t } = useTranslation();
  const { setReferralCode, referralUserDisplayName } = useReferral();
  const { savedEmail, savePresignupInDb } = usePresignup();

  useEffect(() => {
    setReferralCode(referralCode);
  }, [setReferralCode, referralCode]);

  const onSubmit = useCallback(
    async ({ email }, { setSubmitting }) => {
      await savePresignupInDb(email);
      setSubmitting(false);
      navigate('/register');
    },
    [savePresignupInDb]
  );

  return (
    <LandingPageS.Section white className={className}>
      <OrganicOverlayImages />
      <div className="container">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <div className="section-heading">
              <Title>{t('landingPage.referralSuperHeroSection.hello')}</Title>
              <BodyText>
                <strong>{referralUserDisplayName}</strong>{' '}
                {t('landingPage.referralSuperHeroSection.p1')}
              </BodyText>
              <BodyText>{t('landingPage.referralSuperHeroSection.p2')}</BodyText>
              <Formik
                onSubmit={onSubmit}
                initialValues={{ email: savedEmail || '' }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email(t('common.emailField.errorMessages.email'))
                    .required(t('common.emailField.errorMessages.required')),
                })}
              >
                {({ isSubmitting }) => (
                  <Form id="referral-presignup-form">
                    <Field
                      label={t('common.emailField.label')}
                      disabled={isSubmitting}
                      name="email"
                      component={FormikInput}
                      placeholder={t('common.emailField.placeholder')}
                    />
                    <Btn
                      label={t('landingPage.referralSuperHeroSection.getStarted')}
                      type="submit"
                      isLoading={isSubmitting}
                      className="animated fadeInUp"
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </LandingPageS.Section>
  );
};

export default ReferralSuperHeroSection;
