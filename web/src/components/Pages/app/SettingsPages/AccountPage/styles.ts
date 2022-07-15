import styled from 'styled-components';
import mq from '../../../../../constants/layout';

export const SettingRow = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 30px;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;

export const ProfileSummary = styled.div`
  color: #454f57;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

export const ProfilePictureInput = styled.input`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  width: 100%;
  z-index: 1;
  cursor: pointer;
`;

export const AccountSummary = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  color: #454f57;
  font-size: 12px;
  text-align: left;

  ${mq.smUp} {
    display: flex;
    flex-direction: column;
    margin: 10px;
    color: #454f57;
    font-size: 12px;
    text-align: left;
  }
`;

export const Name = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const Membership = styled.span`
  opacity: 0.7;
`;

export const Email = Membership;

export const FormContainer = styled.div`
  padding: 1.5rem;
`;
