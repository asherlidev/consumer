import styled from 'styled-components';
import mq from '../../../constants/layout';
import colors from '../../../constants/colors';
import { PageWrapper } from '../../Layout';
import DecorativeDots from './DecorativeDots';

export const Content = styled(PageWrapper)`
  text-align: center;
`;

export const CircleIconWrap = styled.div`
  font-size: 48rem;
  color: white;
  position: absolute;
  right: -22%;
  top: -31px;
  opacity: 0.5;
`;

export const PlusIconWrap = styled.div`
  position: absolute;
  color: white;
  opacity: 0.3;
  font-size: 3rem;
`;

export const PlusIconTopWrap = styled(PlusIconWrap)`
  top: 56px;
  left: 16%;
`;

export const PlusIconBottomWrap = styled(PlusIconWrap)`
  bottom: 50%;
  right: 36px;
`;

// TODO: include the svg in the project
export const DecorativeDotsWhite = styled(DecorativeDots)`
  background-image: url(https://res.cloudinary.com/festivalpass/image/upload/v1589256428/fp-content/organic-shapes/oval-dots-1.svg);
  position: absolute;
  bottom: 20%;
  left: ${({ size }) => (size / 3) * -1}px;
  opacity: 0.4;
`;

// TODO: include the svg in the project
export const TransparentBlobBg = styled.div`
  padding: 0 0 40px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(https://res.cloudinary.com/festivalpass/image/upload/v1589154125/fp-content/organic-shapes/transparent-blob-1.png);
`;

export const BlueSquareContainer = styled.div`
  position: relative;
  ${mq.smDown} {
    overflow: hidden;
  }
`;

export const BLUE_SQUARE_MAX_WIDTH = 1200;

export const BlueSquare = styled.div`
  margin: auto;
  max-width: 100%;
  padding: 60px 0;
  background-color: ${colors.blue};
  border-radius: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 1000px;
  max-width: ${BLUE_SQUARE_MAX_WIDTH}px;
  position: absolute;
  left: 50%;
  margin-left: ${(BLUE_SQUARE_MAX_WIDTH / 2) * -1}px;
  width: -webkit-fill-available;
  overflow: hidden;
`;
