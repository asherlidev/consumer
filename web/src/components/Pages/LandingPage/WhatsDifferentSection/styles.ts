import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const FpRoundBG = styled.div`
  background-color: #fff;
  border-radius: 41px;
  box-shadow: -15px 15px #bfd5fd;
  height: auto;
  min-height: 600px;
  padding: 20px;
  text-align: left;
  margin-bottom: 50px;

  ${mq.smUp} {
    padding: 40px;
  }
`;

export const FpTopHeader = styled.div`
  ${mq.smUp} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    text-align: left;
  }
`;

export const FpInnerRow = styled.div`
  text-align: center;

  ${mq.smUp} {
    text-align: left;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: row;
    margin-top: 40px;
  }
`;

export const ReasonTextContainer = styled.div`
  ${mq.smUp} {
    margin-left: 40px;
  }
`;
