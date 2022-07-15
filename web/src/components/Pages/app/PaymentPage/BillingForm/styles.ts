import styled from 'styled-components';
import mq from '../../../../../constants/layout';

export const BtnRow = styled.div`
  ${mq.smUp} {
    & > button {
      width: auto;
    }
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;

export const CurrencyWrapper = styled.div`
  text-align: right;
`;

export const Title = styled.h1`
  color: #091d2c;
  line-height: 45px;
  margin-bottom: 0px;
  margin-top: 0px;
`;

export const CouponSummaryContainer = styled.div`
  padding: 15px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CouponTextContainer = styled.div`
  flex: 1;
`;

export const CouponName = styled.div`
  font-weight: 600;
`;

export const CouponDescription = styled.div``;

export const ErrorMessage = styled.div`
  color: #f94994;
  font-weight: 600;
  margin-bottom: 2rem;
`;

export const SecureTxt = styled.div`
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AnnualOffer = styled.div<{ checked: boolean }>`
  cursor: pointer;
  user-select: none;
  padding: 15px;
  border: 1px solid #dbdbdb;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  text-align: left;
  align-items: flex-start;
  margin-bottom: 40px;
  color: ${(props) => (props.checked ? '#fff' : 'inherit')};
  background-color: ${(props) => (props.checked ? '#2069fa' : 'transparent')};

  input {
    cursor: pointer;
    margin-right: 20px;
  }
`;

export const TermsTxt = styled.p`
  font-size: 11px;
  text-align: center;
  margin-top: 5px;
`;

export const stripeComponentStyle = { base: { fontSize: '14px' } };
