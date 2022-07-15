import styled from 'styled-components';
import colors from '../../../../constants/colors';
import {
  OverlayBottomLeft as BottomLeft,
  OverlayBottomRight as BottomRight,
  OverlayTopRight as TopRight,
} from '../../../Layout/OverlayImages';

export const Title = styled.p`
  opacity: 0.9;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${colors.darkGray};
  text-transform: uppercase;
`;

export const OverlayBottomLeft = styled(BottomLeft)`
  bottom: -50%;
  height: 100%;
`;

export const OverlayTopRight = styled(TopRight)`
  top: -40%;
  height: 100%;
`;

export const OverlayBottomRight = styled(BottomRight)`
  bottom: -70%;
  height: 100%;
`;
