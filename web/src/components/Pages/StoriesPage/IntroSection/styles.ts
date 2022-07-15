import BackgroundImage from 'gatsby-background-image';
import styled from 'styled-components';
import colors from '../../../../constants/colors';
import mq from '../../../../constants/layout';
import { Button } from '../../../Elements';
import {
  TOTAL_DESKTOP_HEADER_HEIGHT_IN_PX,
  TOTAL_MOBILE_HEADER_HEIGHT_IN_PX,
} from '../../../Layout/Header/constants';

export const SpotifyImg = styled.img`
  height: 48px;
`;

export const AppleMusicButton = styled(Button)`
  padding: 6px 12px;
`;

export const Root = styled(BackgroundImage)`
  display: grid;
  grid-template-rows: 1fr 100px;
  background-size: cover;
  height: calc(100vh - ${TOTAL_MOBILE_HEADER_HEIGHT_IN_PX}px + 50px);
  background-color: #f7f7f7;
  text-align: left;

  ${mq.smUp} {
    height: calc(100vh - ${TOTAL_DESKTOP_HEADER_HEIGHT_IN_PX}px);
  }
`;

export const ContentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 100px 0 40px;

  ${mq.smDown} {
    padding: 40px 0 40px;
  }
`;

export const ContentBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  > button {
    margin: 0 10px;
  }
`;

export const LogoWrap = styled.div`
  font-size: 9rem;
  margin-bottom: 10px;
`;

export const WordMarkWrap = styled.div`
  font-size: 16rem;
  display: flex;
  margin-bottom: 5px;
  color: ${colors.white};
  svg {
    height: 30px;
  }
`;

export const WhiteTextBlock = styled.span`
  background-color: white;
  color: black;
  font-size: 2rem;
  display: inline-flex;
  padding: 6px;
  margin: 0 0 6px;
`;
