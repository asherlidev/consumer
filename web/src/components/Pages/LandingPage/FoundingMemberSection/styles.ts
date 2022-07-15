import styled from 'styled-components';
import mq from '../../../../constants/layout';
import {
  OverlayTopLeft as TopLeft,
  OverlayTopRight as TopRight,
} from '../../../Layout/OverlayImages';

export const FpFormRow = styled.div`
  ${mq.smUp} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const FpLeft = styled.div`
  ${mq.smUp} {
    & > img {
      width: 100%;
    }
  }
`;

export const SmallTxt = styled.span`
  font-size: 10px;
  font-style: italic;
`;

export const ReasonTitle = styled.strong`
  margin-top: 15px;
`;

export const OverlayTopRight = styled(TopRight)`
  top: 30%;
  height: 30%;

  ${mq.mdUp} {
    top: 10%;
  }
`;

export const OverlayTopLeft = styled(TopLeft)`
  right: 0;
  height: 50%;

  ${mq.mdUp} {
    height: 100%;
  }
`;
