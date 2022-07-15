import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { OurStorySectionQuery } from '../../../../../graphql-types';
import { BodyText } from '../../../Elements';
import * as LandingPageS from '../landingPageStyles';
import * as S from './styles';

interface Props {
  className?: string;
}

const OurStorySection: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  const data = useStaticQuery<OurStorySectionQuery>(ourStorySectionQuery);

  return (
    <LandingPageS.Section white withoutTopPadding className={className}>
      <div className="container">
        <div className="item active">
          <div className="row">
            <S.Col className="col-xs-12 col-md-5">
              <div className="wow bounceInLeft">
                <h2>{t('landingPage.ourStory.title')}</h2>
                <BodyText>{t('landingPage.ourStory.p1')}</BodyText>
                <BodyText>{t('landingPage.ourStory.p2')}</BodyText>
                <BodyText>{t('landingPage.ourStory.p3')}</BodyText>
                <BodyText>{t('landingPage.ourStory.p4')}</BodyText>
                <BodyText>{t('landingPage.ourStory.p5')}</BodyText>
              </div>
            </S.Col>
            <div className="col-xs-12 col-md-5">
              <div className="wow bounceInRight">
                <Img
                  fluid={data.illustration?.childCloudinaryAsset?.fluid as FluidObject}
                  alt={t('landingPage.ourStory.illustrationAlt')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingPageS.Section>
  );
};

export default OurStorySection;

//
// Utils
//

const ourStorySectionQuery = graphql`
  query OurStorySection {
    illustration: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/OurStorySection/illustration.png" }
    ) {
      childCloudinaryAsset {
        fluid {
          ...CloudinaryAssetFluid
        }
      }
    }
  }
`;
