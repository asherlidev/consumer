import { Link } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React from 'react';
import festivalPassLogo from './festivalPassLogo.svg';
import * as S from './styles';

interface Props {
  imageUrl: string; // TODO: improvement is to use gatsby-image
  captionText: string;
}

const SideCaptionImagePage: React.FC<Props> = ({ imageUrl, captionText, children }) => {
  const breakpoints = useBreakpoint();

  return (
    <S.Container>
      <div className="row">
        {breakpoints.mdUp && (
          <div className="col-md-6">
            <S.Mask>
              <Link to="/">
                <S.Logo src={festivalPassLogo} />
              </Link>
              <S.FeatureImg src={imageUrl} />
              <S.CaptionTxt>{captionText}</S.CaptionTxt>
            </S.Mask>
          </div>
        )}
        {children}
      </div>
    </S.Container>
  );
};

export default SideCaptionImagePage;
