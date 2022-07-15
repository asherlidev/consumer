import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const Heading = styled.div`
  max-width: 400px;
`;

export const Description = styled.div`
  max-width: 370px;
`;

export const InfoSection = styled.div`
  width: 100%;
  ${mq.smUp} {
    max-width: 50%;
  }
`;

export const BookingSection = styled.div`
  display: none;
  padding: 12px;
  ${mq.smUp} {
    display: block;
  }
`;
