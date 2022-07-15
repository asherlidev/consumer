import { graphql, Link, useStaticQuery } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AboutSectionQuery } from '../../../../../graphql-types';
import * as LandingPageS from '../landingPageStyles';
import overlayBottomLeft from './overlayBottomLeft.svg';
import overlayBottomRight from './overlayBottomRight.svg';
import overlayTopRight from './overlayTopRight.svg';
import * as S from './styles';

interface Props {
  className?: string;
}

const AboutSection: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const breakpoints = useBreakpoint();

  const data = useStaticQuery<AboutSectionQuery>(aboutSectionQuery);

  const { title, body } = data.allStrapiPage.edges[0].node;

  return (
    <LandingPageS.Section id="about" white className={className}>
      {breakpoints.smUp && (
        <>
          <S.OverlayBottomLeft src={overlayBottomLeft} alt="" />
          <S.OverlayTopRight src={overlayTopRight} alt="" />
          <S.OverlayBottomRight src={overlayBottomRight} alt="" />
        </>
      )}
      <div className="container">
        <div className="row">
          <div className="col-md-offset-2 col-md-8">
            <div className="section-heading">
              <S.Title>{title}</S.Title>
              <h3 className="wow bounceInDown" data-wow-delay="0.5s">
                {body}
              </h3>
              <Link to="/register" className="btn-get-started animated fadeInUp">
                {t('landingPage.aboutUs.buttonLabel')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LandingPageS.Section>
  );
};

export default AboutSection;

//
// Utils
//

const aboutSectionQuery = graphql`
  query AboutSection {
    allStrapiPage(filter: { name: { eq: "Home - WHAT IS FESTIVAL PASS?" } }) {
      ...PageFragment
    }
  }
`;
