import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import colors from '../../../../constants/colors';

export const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  color: ${colors.darkGray};
  font-size: 12px;
`;

export const MembershipDetails = styled.span`
  opacity: 0.7;
`;

export const solidContainerCss = css`
  ${UserInformation} {
    color: ${colors.darkGray};
  }
`;

export const Container = styled.div<{ solid: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: right;
  margin-right: 10px;

  ${(props) => props.solid && solidContainerCss};
`;

export const ModalNavLink = styled(Link)`
  color: ${colors.textDefault};
  font-size: 16px;
  padding-top: 32px;
  display: block;
`;

export const LogoutButton = styled.button`
  color: ${colors.darkGray};
  border: 1px solid #dbdbdb;
  height: 32px;
  border-radius: 11px;
  line-height: 0;
  background-color: transparent;
  margin-bottom: 0;
  margin-top: 32px;
`;
