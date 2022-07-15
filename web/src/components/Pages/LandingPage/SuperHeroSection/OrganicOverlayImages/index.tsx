import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React from 'react';
import { OverlayTopLeft } from '../../../../Layout/OverlayImages';
import overlayBottomRight from './overlayBottomRight.svg';
import overlayTopLeft from './overlayTopLeft.svg';
import * as S from './styles';

interface Props {
  withoutBottomRightOverlay?: boolean;
}

const OrganicOverlayImages: React.FC<Props> = ({ withoutBottomRightOverlay = false }) => {
  const breakpoints = useBreakpoint();

  return breakpoints.smUp ? (
    <>
      <OverlayTopLeft src={overlayTopLeft} alt="" />
      {!withoutBottomRightOverlay && <S.OverlayBottomRight src={overlayBottomRight} alt="" />}
    </>
  ) : null;
};

export default OrganicOverlayImages;
