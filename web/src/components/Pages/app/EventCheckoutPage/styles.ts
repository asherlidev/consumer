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

export const EventSection = styled.div`
  display: flex;
  padding: 0px;
  margin: auto;
  width: 1119px;
  justify-content: flex-start;
  padding: 0px 40px 0px 40px;
  & > div {
    padding: 16px;
  }

  ${mq.smDown} {
    padding: 12px;
  }
`;

export const ListTitle = styled.p`
  font-size: 26px;
  font-weight: 700;
  color: #3a3a3a;
`;

export const CreditWrapper = styled.div`
  height: 100%;
  width: 618px;
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
