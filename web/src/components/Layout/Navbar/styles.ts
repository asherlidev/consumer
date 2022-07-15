import { Link } from 'gatsby';
import styled from 'styled-components';
import mq from '../../../constants/layout';

export const BottomNavbar = styled.nav`
  left: 0;
  bottom: 0;
  position: sticky;
  width: 100vw;
  background-color: white;
  z-index: 5;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0 8px;

  ${mq.smUp} {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: #454f57;
  text-decoration: none;
`;

export const NavItem = styled.div<{ isActive?: boolean }>`
  width: 80px;
  padding: 12px 0 8px 0;
  opacity: ${(props) => (props.isActive ? 1 : 0.45)};
  font-weight: ${(props) => (props.isActive ? 600 : 400)};
`;

export const ItemIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const ItemText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #454f57;
`;
