import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { get, range } from 'lodash';
import React, { useCallback } from 'react';
import { WhatsDifferentSectionQuery } from '../../../../../graphql-types';
import { Title } from '../../../Elements';
import * as LandingPageS from '../landingPageStyles';
import * as S from './styles';

interface Props {
  className?: string;
}

const WhatsDifferentSection: React.FC<Props> = ({ className }) => {
  const data = useStaticQuery<WhatsDifferentSectionQuery>(whatsDifferentSectionQuery);

  const header = data.header.edges[0].node;

  const renderReason = useCallback(
    (reasonNumber: number) => {
      const { title, body } = get(data, `reason${reasonNumber}.edges[0].node`);
      return (
        <div key={reasonNumber} className={`col-sm-5 ${reasonNumber % 2 ? 'col-sm-offset-1' : ''}`}>
          <S.FpInnerRow>
            <div>
              <Img fixed={get(data, `illustration${reasonNumber}.childCloudinaryAsset.fixed`)} />
            </div>
            <S.ReasonTextContainer>
              <p>
                <strong>{title}</strong>
              </p>
              <p>{body}</p>
            </S.ReasonTextContainer>
          </S.FpInnerRow>
        </div>
      );
    },
    [data]
  );

  return (
    <LandingPageS.Section withoutTopPadding className={className}>
      <div className="container">
        <S.FpRoundBG>
          <S.FpTopHeader className="row">
            <div className="col-xs-12 col-sm-6">
              <Title>{header.title}</Title>
            </div>
            <div className="col-xs-12 col-sm-6">
              <p>{header.body}</p>
            </div>
          </S.FpTopHeader>
          <div className="row">{range(1, 3).map(renderReason)}</div>
          <div className="row">{range(3, 5).map(renderReason)}</div>
        </S.FpRoundBG>
      </div>
    </LandingPageS.Section>
  );
};

export default WhatsDifferentSection;

//
// Utils
//

const whatsDifferentSectionQuery = graphql`
  query WhatsDifferentSection {
    header: allStrapiPage(filter: { name: { eq: "Home - What's Different - Header" } }) {
      ...PageFragment
    }
    reason1: allStrapiPage(filter: { name: { eq: "Home - What's Different - Top Left" } }) {
      ...PageFragment
    }
    reason2: allStrapiPage(filter: { name: { eq: "Home - What's Different - Top Right" } }) {
      ...PageFragment
    }
    reason3: allStrapiPage(filter: { name: { eq: "Home - What's Different - Bottom Left" } }) {
      ...PageFragment
    }
    reason4: allStrapiPage(filter: { name: { eq: "Home - What's Different - Bottom Right" } }) {
      ...PageFragment
    }
    illustration1: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/WhatsDifferentSection/illustration1.png" }
    ) {
      ...WhatsDifferentIllustration
    }
    illustration2: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/WhatsDifferentSection/illustration2.png" }
    ) {
      childCloudinaryAsset {
        fixed(height: 86) {
          ...CloudinaryAssetFixed
        }
      }
    }
    illustration3: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/WhatsDifferentSection/illustration3.png" }
    ) {
      ...WhatsDifferentIllustration
    }
    illustration4: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/WhatsDifferentSection/illustration4.png" }
    ) {
      ...WhatsDifferentIllustration
    }
  }
  fragment WhatsDifferentIllustration on File {
    childCloudinaryAsset {
      fixed(height: 80) {
        ...CloudinaryAssetFixed
      }
    }
  }
`;
