import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  padding: 40px;
  margin-top: 40px;

  ${mq.smUp} {
    margin-left: 20%;
    margin-right: 20%;
  }
`;
