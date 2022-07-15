import { graphql, useStaticQuery } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';
import { get, range } from 'lodash';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HowItWorksSectionQuery } from '../../../../../graphql-types';
import { BodyText, Title } from '../../../Elements';
import * as LandingPageS from '../landingPageStyles';
import * as S from './styles';

interface Props {
  className?: string;
}

const HowItWorksSection: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  const data = useStaticQuery<HowItWorksSectionQuery>(howItWorksSectionQuery);

  const renderStepContent = useCallback(
    (stepNumber: number) => (
      <div className="col-xs-12 col-sm-5">
        <div>
          <S.StepNumberContainer className="col-xs-12 hidden-sm hidden-md hidden-lg">
            <S.StepNumberCircle>{stepNumber}</S.StepNumberCircle>
          </S.StepNumberContainer>
          <h4>
            <strong>{t(`landingPage.howItWorks.step${stepNumber}.title`)}</strong>
          </h4>
          <BodyText>{t(`landingPage.howItWorks.step${stepNumber}.body`)}</BodyText>
        </div>
      </div>
    ),
    [t]
  );

  const renderStepIllustration = useCallback(
    (stepNumber: number) => (
      <div className="hidden-xs col-sm-5">
        <Img
          fixed={
            get(data, [`illustration${stepNumber}`, 'childCloudinaryAsset', 'fixed']) as FixedObject
          }
        />
      </div>
    ),
    [data]
  );

  return (
    <LandingPageS.Section id="how" withoutTopPadding className={className}>
      <div className="container">
        <LandingPageS.FpHiw>
          <S.TitleContainer>
            <Title>{t('landingPage.howItWorks.title')}</Title>
            <small>{t('landingPage.howItWorks.subtitle')}</small>
          </S.TitleContainer>

          {range(1, 6).map((stepNumber) => (
            <S.FpOuterRow key={stepNumber} className="row">
              {(stepNumber % 2 ? renderStepContent : renderStepIllustration)(stepNumber)}
              {renderStepNumber(stepNumber)}
              {(stepNumber % 2 ? renderStepIllustration : renderStepContent)(stepNumber)}
            </S.FpOuterRow>
          ))}
        </LandingPageS.FpHiw>
      </div>
    </LandingPageS.Section>
  );
};

export default HowItWorksSection;

//
// Utils
//

const renderStepNumber = (stepNumber: number) => (
  <S.StepNumberContainer className="hidden-xs col-sm-2">
    <S.StepNumberCircle>{stepNumber}</S.StepNumberCircle>
  </S.StepNumberContainer>
);

const howItWorksSectionQuery = graphql`
  query HowItWorksSection {
    illustration1: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/HowItWorksSection/illustration1.png" }
    ) {
      ...HowItWorksIllustration
    }
    illustration2: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/HowItWorksSection/illustration2.png" }
    ) {
      ...HowItWorksIllustration
    }
    illustration3: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/HowItWorksSection/illustration3.png" }
    ) {
      ...HowItWorksIllustration
    }
    illustration4: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/HowItWorksSection/illustration4.png" }
    ) {
      ...HowItWorksIllustration
    }
    illustration5: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/HowItWorksSection/illustration5.png" }
    ) {
      ...HowItWorksIllustration
    }
  }
  fragment HowItWorksIllustration on File {
    childCloudinaryAsset {
      fixed(height: 322) {
        ...CloudinaryAssetFixed
      }
    }
  }
`;
