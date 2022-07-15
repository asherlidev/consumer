import styled from 'styled-components';
import mq from '../../../constants/layout';

export const Container = styled.div`
  font-size: 1.4rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  margin-bottom: 10px;
  margin-top: 10px;

  & > p > img {
    max-width: 100%;
  }

  ${mq.smUp} {
    margin-bottom: 30px;
    margin-top: 30px;
  }
`;
