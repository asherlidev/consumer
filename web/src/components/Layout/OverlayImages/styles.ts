import styled, { css } from 'styled-components';
import zIndex from '../../../constants/zIndex';

const commonOverlayCss = css`
  position: absolute;
  border: none;
  border-radius: 0;
  box-shadow: none;
  pointer-events: none;
`;

export const OverlayTopRight = styled.img`
  ${commonOverlayCss};
  z-index: ${zIndex.lowerOverlay};
  top: 0;
  right: 0;
`;

export const OverlayBottomRight = styled.img`
  ${commonOverlayCss};
  z-index: ${zIndex.upperOverlay};
  bottom: 0;
  right: 0;
`;

export const OverlayTopLeft = styled.img`
  ${commonOverlayCss};
  z-index: ${zIndex.lowerOverlay};
  top: 0;
  left: 0;
`;

export const OverlayBottomLeft = styled.img`
  ${commonOverlayCss};
  z-index: ${zIndex.lowerOverlay};
  bottom: 0;
  left: 0;
`;
