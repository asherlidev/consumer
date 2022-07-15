import styled from 'styled-components';
import colors from '../../../../constants/colors';
import MiniTitle from '../MiniTitle';

export const Root = styled.section`
  display: flex;
  flex-direction: column;
  color: ${colors.darkGray};
`;

export const LogoWordMarkWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const LogoWrap = styled.div`
  font-size: 8rem;
`;

export const WordMarkWrap = styled.div`
  display: flex;
  font-size: 20rem;
  svg {
    height: 30px;
    width: 163px;
  }
`;

export const StoriesLogoMiniTitle = styled(MiniTitle)`
  position: absolute;
  left: 79px;
  bottom: -24px;
`;
