import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const FpOuterRow = styled.div`
  ${mq.smUp} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    text-align: left;
  }
`;

export const TitleContainer = styled.div`
  margin-bottom: 40px;
`;

export const StepNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const StepNumberCircle = styled.div`
  background-color: #fff;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
`;
