import styled from 'styled-components';
import colors from '../../../../../constants/colors';

export const CodeContainer = styled.code`
  background-color: #f2f2f2 !important;
  padding: 5px 22px;
  color: #091d2c;
  font-size: 16px;
  font-weight: bold;
  height: 42px;
  border-radius: 12px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const ChipRow = styled.div`
  display: flex;

  > div {
    margin-right: 10px;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: right;
  margin-right: 10px;
`;

export const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  color: ${colors.darkGray};
  font-size: 12px;
  min-width: 128px;
`;

export const MembershipDetails = styled.span`
  opacity: 0.7;
`;

export const DisconnectLink = styled.span`
  cursor: pointer;
`;
