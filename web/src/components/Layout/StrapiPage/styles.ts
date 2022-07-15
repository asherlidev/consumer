import styled from 'styled-components';
import mq from '../../../constants/layout';

export const Content = styled.div`
  padding: 30px;

  ${mq.smUp} {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  text-align: left;
  padding: 0;
  width: 100%;

  & > div {
    margin-bottom: 40px;
  }
`;
