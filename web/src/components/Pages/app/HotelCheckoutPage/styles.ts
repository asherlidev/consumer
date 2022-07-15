import styled from 'styled-components';
import colors from '../../../../constants/colors';
import mq from '../../../../constants/layout';

export const Container = styled.div`
  padding: 40px 40px 0px 40px;
  margin: 40px auto auto auto;
  display: flex;
  gap: 48px;
  justify-content: center;
  ${mq.smDown} {
    flex-direction: column-reverse;
    padding: 12px;
  }
`;

export const CreditWrapper = styled.div`
  width: 618px;
  height: 100%;
  ${mq.smDown} {
    width: 100%;
  }
`;

export const CheckoutBoxWrapper = styled.div`
  width: 373px;
  height: 100%;
  ${mq.smDown} {
    width: 100%;
  }
`;
