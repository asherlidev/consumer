import { Field, Form, Formik } from 'formik';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { get, range } from 'lodash';
import { stringifyUrl } from 'query-string';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { FoundingMemberSectionQuery } from '../../../../../graphql-types';
import { usePresignup } from '../../../../context/presignup';
import { Btn, FormikInput } from '../../../Elements';
import * as LandingPageS from '../landingPageStyles';
import overlayTopLeft from './overlayTopLeft.svg';
import overlayTopRight from './overlayTopRight.svg';
import * as S from './styles';

interface Props {
  className?: string;
}

const FoundingMemberSection: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const breakpoints = useBreakpoint();
  const { savedEmail, savePresignupInDb } = usePresignup();

  const data = useStaticQuery<FoundingMemberSectionQuery>(foundingMemberSectionQuery);

  const onSubmit = useCallback(
    async ({ email }, { setSubmitting }) => {
      await savePresignupInDb(email);
      setSubmitting(false);
      navigate(stringifyUrl({ url: '/register', query: { src: 'presignup' } }));
    },
    [savePresignupInDb]
  );

  const renderReason = useCallback(
    (reasonNumber: number) => {
      const { title, body } = get(data, `reason${reasonNumber}.edges[0].node`);
      return (
        <div key={reasonNumber} className="col-sm-6">
          <div>
            <Img fixed={get(data, `illustration${reasonNumber}.childCloudinaryAsset.fixed`)} />
          </div>
          <S.ReasonTitle>{title}</S.ReasonTitle>
          <p>{body}</p>
        </div>
      );
    },
    [data]
  );

  return (
    <LandingPageS.Section id="membership" white className={className}>
      {breakpoints.smUp && (
        <>
          <S.OverlayTopLeft src={overlayTopLeft} alt="" />
          <S.OverlayTopRight src={overlayTopRight} alt="" />
        </>
      )}
      <div className="container">
        <div className="row">
          <S.FpLeft className="col-xs-12 col-md-6">
            <div className="wow bounceInLeft">
              <Img
                fluid={data.festivalAtmosphereCollage?.childCloudinaryAsset?.fluid as FluidObject}
                alt={t('landingPage.foundingMember.festivalAtmosphereCollageAlt')}
              />
            </div>
          </S.FpLeft>
          <div className="col-xs-12 col-md-6">
            <div className="wow bounceInLeft">
              <div className="row">
                <h2>{t('landingPage.foundingMember.title')}</h2>
              </div>
              <div className="row">{range(1, 5).map(renderReason)}</div>
              <div className="row">
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
                    <Form>
                      <S.FpFormRow className="row">
                        <div className="col-sm-6 col-xs-12">
                          <Field
                            disabled={isSubmitting}
                            name="email"
                            component={FormikInput}
                            placeholder={t('common.emailField.placeholder')}
                          />
                        </div>
                        <div className="col-sm-6 col-xs-12">
                          <Btn
                            label={t('landingPage.foundingMember.buttonLabel')}
                            type="submit"
                            isLoading={isSubmitting}
                            className="animated fadeInUp"
                          />
                        </div>
                      </S.FpFormRow>
                    </Form>
                  )}
                </Formik>
                <S.SmallTxt>{t('landingPage.foundingMember.footNote')}</S.SmallTxt>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingPageS.Section>
  );
};

export default FoundingMemberSection;

//
// Utils
//

const foundingMemberSectionQuery = graphql`
  query FoundingMemberSection {
    reason1: allStrapiPage(
      filter: { name: { eq: "Home - Why become founding member - Top Left" } }
    ) {
      ...PageFragment
    }
    reason2: allStrapiPage(
      filter: { name: { eq: "Home - Why become founding member - Top Right" } }
    ) {
      ...PageFragment
    }
    reason3: allStrapiPage(
      filter: { name: { eq: "Home - Why become founding member - Bottom Left" } }
    ) {
      ...PageFragment
    }
    reason4: allStrapiPage(
      filter: { name: { eq: "Home - Why become founding member - Bottom Right" } }
    ) {
      ...PageFragment
    }
    illustration1: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/FoundingMemberSection/illustration1.png" }
    ) {
      ...FoundingMemberIllustration
    }
    illustration2: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/FoundingMemberSection/illustration2.png" }
    ) {
      ...FoundingMemberIllustration
    }
    illustration3: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/FoundingMemberSection/illustration3.png" }
    ) {
      ...FoundingMemberIllustration
    }
    illustration4: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/FoundingMemberSection/illustration4.png" }
    ) {
      ...FoundingMemberIllustration
    }
    festivalAtmosphereCollage: file(
      sourceInstanceName: { eq: "images" }
      relativePath: {
        eq: "components/Pages/LandingPage/FoundingMemberSection/festival-atmosphere-collage.png"
      }
    ) {
      childCloudinaryAsset {
        fluid {
          ...CloudinaryAssetFluid
        }
      }
    }
  }
  fragment FoundingMemberIllustration on File {
    childCloudinaryAsset {
      fixed(height: 22) {
        ...CloudinaryAssetFixed
      }
    }
  }
`;
