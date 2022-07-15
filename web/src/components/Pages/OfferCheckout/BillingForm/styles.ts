import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const FpBtn = styled.button`
  background-color: #fa2069;
  color: #fff;
  border-radius: 16px;
  margin-top: 10px;
  height: 56px;
  font-weight: bold;
`;

export const FpInput = styled.input`
  border: none;
  background-color: #f7f7f7;
  border-bottom: 1px solid #454f57;
  border-radius: 0px !important;
  width: 100%;
  margin-left: 0px;
  &:hover {
    border-bottom: 1px solid #fa2069;
  }
`;

export const FpBtnRow = styled.div`
  @media (${mq.smUp}) {
    & > button {
      width: auto;
    }
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;

export const Title2 = styled.h1`
  color: #091d2c;
  line-height: 45px;
  margin-bottom: 0px;
  margin-top: 0px;
`;

export const ErrorMsg = styled.span`
  color: #f94994;
`;

export const FpTermsTxt = styled.div`
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FpAnnualOffer = styled.div<{ checked: boolean }>`
  cursor: pointer;
  padding: 15px;
  border: 1px solid #dbdbdb;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 40px;
  color: ${(props) => (props.checked ? '#fff' : 'inherit')};
  background-color: ${(props) => (props.checked ? '#2069fa' : 'transparent')};

  & > input {
    margin-right: 20px;
  }

  & > div {
    text-align: left;
  }

  & > div:last-child {
    margin-left: 15px;
  }
`;

export const SmallTxt = styled.span`
  font-size: 10px;
  font-style: italic;
  margin-top: 10px;
`;

export const FpLink = styled.a`
  &:hover {
    color: #fa2069;
    font-size: 11px;
  }
`;

// hotfix for the form field alignment
export const FirstLastInputWrapper = styled.div`
  & > div {
    margin-top: 20px;
    margin-bottom: 0;
  }
`;

// hotfix for the form field alignment
export const FirstLastRowWrapper = styled.div``;
