import styled from 'styled-components';
import colors from '../../../../../../constants/colors';
import { NavLink } from '../../../../../Elements';

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  flex-wrap: wrap;
  margin-top: 24px;
`;

export const FpLink = styled(NavLink)`
  padding: 8px 16px;
  height: 32px;
  background-color: transparent;
  color: ${colors.darkGray};
  border-radius: 32px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.11);
  transition: box-shadow 100ms linear;
  margin-top: 10px;
  margin-bottom: 10px;

  :not(:last-child) {
    margin-right: 10px;
  }

  &.active {
    color: ${colors.white};
    background-color: ${colors.blue};
  }

  &:hover {
    background-color: ${colors.blue};
    color: #ffffff;
  }

  &:active {
    box-shadow: none;
  }

  & > span {
    color: #454f57;
  }
`;
