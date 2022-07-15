import styled from 'styled-components';
import colors from '../../../constants/colors';
import DecorativeDots from '../StoriesPage/DecorativeDots';

const CONTAINER_PADDING_TOP = '120px';
const CONTAINER_PADDING_BOTTOM = '40px';
const MAX_WIDTH = '900px';
const BLUE_SQUARE_MAX_WIDTH = 1200;

export const Content = styled.div`
  margin-top: 20px;
`;

export const DataStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 100%;
  font-size: 3rem;
  transition: opacity 100ms ease;
`;

export const ProgressWrapper = styled(DataStateWrapper)`
  color: ${colors.primary};
`;

// TODO: see if this is duplicate (stories page)
// TODO: replace with local svg
export const DecorativeDotsBlue = styled(DecorativeDots)`
  background-image: url(https://res.cloudinary.com/festivalpass/image/upload/v1589256428/fp-content/organic-shapes/oval-dots-2.svg);
  position: absolute;
  right: -100px;
  bottom: -100px;
  opacity: 0.5;
`;

export const CircleIconWrap = styled.div`
  font-size: 48rem;
  color: white;
  position: absolute;
  right: -22%;
  top: -31px;
  opacity: 0.5;
`;

export const DecorativeDotsWhite = styled(DecorativeDots)`
  background-image: url(https://res.cloudinary.com/festivalpass/image/upload/v1589256428/fp-content/organic-shapes/oval-dots-1.svg);
  position: absolute;
  bottom: 20%;
  left: ${({ size }) => (size / 3) * -1}px;
  opacity: 0.4;
`;

export const BlueSquare = styled.div`
  margin: auto;
  max-width: 100%;
  padding: 60px 0;
  background-color: ${colors.blue};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50vh;
  max-width: ${BLUE_SQUARE_MAX_WIDTH}px;
  position: absolute;
  left: 50%;
  margin-left: ${(BLUE_SQUARE_MAX_WIDTH / 2) * -1}px;
  width: -webkit-fill-available;
  overflow: hidden;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.4);
`;

export const Paper = styled.div`
  border-radius: 8px;
  padding: 30px;
  background-color: ${colors.white};
  position: relative;
  box-shadow: 0px 5px 72px rgba(0, 0, 0, 0.1);
  text-align: left;
  z-index: 1;
  width: 100%;
  min-height: 50vh;
`;

// TODO: replace with local image
export const TransparentBlobBg = styled.div`
  padding: 0 0 40px;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(https://res.cloudinary.com/festivalpass/image/upload/v1589154125/fp-content/organic-shapes/transparent-blob-1.png);
`;

export const Container = styled.div`
  min-height: calc(100vh - ${CONTAINER_PADDING_TOP + CONTAINER_PADDING_BOTTOM});
  margin: auto;
  max-width: ${MAX_WIDTH};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${CONTAINER_PADDING_TOP} 20px ${CONTAINER_PADDING_BOTTOM};
`;

export const IconAccentGroup1 = styled.div`
  position: absolute;
  bottom: 22px;
  right: 54px;
  font-size: 4rem;
  color: ${colors.blue};
  display: grid;
  grid-template-columns: repeat(2, 11px);
  z-index: 100;
`;

export const PlusIconWrap = styled.div`
  position: absolute;
  color: white;
  opacity: 0.3;
  font-size: 3rem;
`;

export const PlusIconTopWrap = styled(PlusIconWrap)`
  top: 104px;
  left: 40%;
`;

export const PlusIconBottomWrap = styled(PlusIconWrap)`
  bottom: 104px;
  left: 15%;
  color: ${colors.blue};
  transform: rotate(45deg);
  opacity: 0.25;
`;

export const BreadcrumbsWrap = styled.div`
  z-index: 1;
  color: ${colors.white};
  text-align: left;
  align-self: start;
  a {
    color: ${colors.white};
  }
`;

export const AllEpisodesButtonWrap = styled.div`
  padding-top: 50px;
`;
