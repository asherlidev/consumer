import styled from 'styled-components';
import mq from '../../../constants/layout';
import {
  TOTAL_DESKTOP_HEADER_HEIGHT_IN_PX,
  TOTAL_MOBILE_HEADER_HEIGHT_IN_PX,
} from '../Header/constants';

export const PageWrapper = styled.div<{ backgroundColor?: string }>`
  padding-top: ${TOTAL_MOBILE_HEADER_HEIGHT_IN_PX}px;
  background-color: ${(props) => props.backgroundColor || '#f7f7f7'};
  min-height: 100vh;
  text-align: left;

  ${mq.smUp} {
    padding-top: ${TOTAL_DESKTOP_HEADER_HEIGHT_IN_PX}px;
  }
`;
