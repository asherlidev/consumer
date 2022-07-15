import { Field, Form, Formik } from 'formik';
import { navigate } from 'gatsby';
import { stringifyUrl } from 'query-string';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import * as Yup from 'yup';
import { usePresignup } from '../../../../../context/presignup';
import { BodyText, Btn, FormikInput, Title } from '../../../../Elements';
import * as LandingPageS from '../../landingPageStyles';

export interface InboundCampaign {
  // TODO: auto-generate these types from graphql schema
  name: string;
  campaign_id: string;
  super_hero_content: string;
  cta_button_label: string;
}

interface Props {
  className?: string;
  inboundCampaign: InboundCampaign;
}

const InboundSuperHeroSection: React.FC<Props> = ({
  className,
  inboundCampaign: { name, cta_button_label, super_hero_content },
}) => {
  const { t } = useTranslation();
  const { savedEmail, savePresignupInDb } = usePresignup();

  const onSubmit = useCallback(
    async ({ email }, { setSubmitting }) => {
      await savePresignupInDb(email);
      setSubmitting(false);
      navigate(stringifyUrl({ url: '/register', query: { src: 'presignup' } }));
    },
    [savePresignupInDb]
  );

  return (
    <LandingPageS.Section id="super-hero-section" white className={className}>
      <div className="container">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <div className="section-heading">
              <Title>{name}</Title>

              <BodyText>
                <ReactMarkdown>{super_hero_content}</ReactMarkdown>
              </BodyText>

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
                  <Form id="inbound-presignup-form">
                    <Field
                      label={t('common.emailField.label')}
                      disabled={isSubmitting}
                      name="email"
                      component={FormikInput}
                      placeholder={t('common.emailField.placeholder')}
                    />
                    <Btn
                      label={cta_button_label}
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

export default InboundSuperHeroSection;
