import styled from 'styled-components';
import colors from '../../../../constants/colors';
import { CROWDFUNDING_BANNER_HEIGHT_IN_PX } from '../constants';
import mq from '../../../../constants/layout';
import { NavLink as NavLinkComponent } from '../../../Elements';

export const Container = styled.section`
  background-color: rgb(248, 73, 124);
  color: ${colors.white};
  height: ${CROWDFUNDING_BANNER_HEIGHT_IN_PX}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ExternalLink = styled.a`
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  color: ${colors.white} !important;
`;

export const NavLink = styled(NavLinkComponent)`
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  color: ${colors.white} !important;
  cursor: pointer;
  border: none;
  text-decoration: none;
  outline: none;

  &:focus,
  a:hover {
    text-decoration: none;
  }
`;
