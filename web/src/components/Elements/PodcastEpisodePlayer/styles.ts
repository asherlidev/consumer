import styled from 'styled-components';
import colors from '../../../constants/colors';
import mq from '../../../constants/layout';
import { IconButton } from '../../Elements';

export const ProgressWrap = styled.div`
  color: ${colors.primary};
  height: 0;
  overflow: visible;
  font-size: 2rem;

  ${mq.smDown} {
    position: relative;
    top: 63px;
  }
`;

export const PlayPauseButton = styled(IconButton)`
  padding: 8px;
  font-size: 4rem;
  transition: box-shadow 100ms ease-out;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);

  &:active {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  }
`;

export const WaveWrap = styled.div`
  margin: 10px 0;
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
  align-items: center;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
