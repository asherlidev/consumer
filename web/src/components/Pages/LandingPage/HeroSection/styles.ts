import Img from 'gatsby-image';
import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const CarouselImage = styled(Img)`
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
`;

export const CenteredContent = styled.div`
  text-align: center;
`;

export const HeroText = styled.h2`
  color: #fff;
  margin-bottom: 30px;
  font-size: 48px;
  font-weight: 700;

  ${mq.smDown} {
    font-size: 36px;
  }
`;

export const WatchVideoButton = styled.button`
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1px;
  padding: 12px 32px;
  border-radius: 3px;
  transition: 0.5s;
  color: #fff;
  animation-delay: 0.8s;
  background: #fa2069;
  border: 2px solid #fa2069;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  :hover {
    background: #f94994;
    color: #fff;
    text-decoration: none;
  }

  img {
    margin-right: 10px;
  }
`;
