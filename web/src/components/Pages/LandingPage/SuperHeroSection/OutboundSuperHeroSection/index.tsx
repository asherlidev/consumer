import { Field, Formik } from 'formik';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { get } from 'lodash';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { OutboundSuperHeroSectionQuery } from '../../../../../../graphql-types';
import { CloudinaryImage, CouponSku } from '../../../../../types/common';
import { Btn, FormikInput } from '../../../../Elements';
import OrganicOverlayImages from '../OrganicOverlayImages';
import * as S from './styles';

export interface OutboundCampaign {
  // TODO: auto-generate these types from graphql schema
  id?: number;
  campaign_id: string;
  cta_button_label: string;
  headline: string;
  headline_2: string;
  subtitle: string;
  body_content: string;
  hero_image?: CloudinaryImage;
  couponsku?: CouponSku;
}

interface Props {
  className?: string;
  outboundCampaign: OutboundCampaign;
  email: string;
  onSubmit: (email: string) => Promise<void>;
}

const OutboundSuperHeroSection: React.FC<Props> = ({
  className,
  outboundCampaign: { cta_button_label, headline, headline_2, subtitle, body_content, hero_image },
  email,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async ({ email }, { setSubmitting }) => {
      await onSubmit(email);
      setSubmitting(false);
    },
    [onSubmit]
  );

  const data = useStaticQuery<OutboundSuperHeroSectionQuery>(outboundSuperHeroSectionQuery);

  return (
    <section className={className}>
      <OrganicOverlayImages withoutBottomRightOverlay />

      <S.BackgroundWrapper
        backgroundUrl={hero_image?.url || get(data, 'illustration.childCloudinaryAsset.fluid')?.src}
        role="img"
        aria-label="Hero"
      >
        <S.ContentWrapper>
          <S.Content>
            <S.WhiteTxtBg>
              <S.Title>{headline}</S.Title>
            </S.WhiteTxtBg>
            <S.WhiteTxtBg>
              <S.Title>{headline_2}</S.Title>
            </S.WhiteTxtBg>
            <S.HeroBodyTxt>{subtitle}</S.HeroBodyTxt>
            <S.HeroBodyTxt>{body_content}</S.HeroBodyTxt>

            <Formik
              onSubmit={handleSubmit}
              initialValues={{ email: email || '' }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email(t('common.emailField.errorMessages.email'))
                  .required(t('common.emailField.errorMessages.required')),
              })}
            >
              {({ isSubmitting }) => (
                <S.SignupForm id="outbound-presignup-form">
                  <S.HeroFooter>
                    <Field
                      disabled={isSubmitting}
                      name="email"
                      component={FormikInput}
                      placeholder={t('common.emailField.placeholder')}
                    />
                    <Btn
                      label={cta_button_label}
                      type="submit"
                      isLoading={isSubmitting}
                      width="auto"
                      className="animated fadeInUp"
                    />
                  </S.HeroFooter>
                </S.SignupForm>
              )}
            </Formik>
          </S.Content>
        </S.ContentWrapper>
      </S.BackgroundWrapper>
    </section>
  );
};

export default OutboundSuperHeroSection;

//
// Utils
//

const outboundSuperHeroSectionQuery = graphql`
  query outboundSuperHeroSectionQuerySection {
    illustration: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/OutboundSuperHeroSection/illustration.jpg" }
    ) {
      childCloudinaryAsset {
        fluid {
          ...CloudinaryAssetFluid
        }
      }
    }
  }
`;
