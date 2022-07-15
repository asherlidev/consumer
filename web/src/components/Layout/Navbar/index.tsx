import React from 'react';
import { useLocation } from '@reach/router';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';

import { useAuth } from '../../../context/auth';
import * as navbarIcons from '../../Icons/Navbar';
import * as S from './styles';

const Navbar: React.FC = () => {
  const breakpoints = useBreakpoint();
  const { isAuthenticated } = useAuth();

  return (
    <S.BottomNavbar>
      {!isAuthenticated && (
        <NavItem
          link="/"
          label="Home"
          activeIcon={navbarIcons.HomeActive}
          inactiveIcon={navbarIcons.HomeInactive}
        />
      )}
      <NavItem
        link="/search"
        label="Search"
        activeIcon={navbarIcons.SearchActive}
        inactiveIcon={navbarIcons.SearchInactive}
      />
      <NavItem
        link="/events"
        label="Events"
        activeIcon={navbarIcons.EventsActive}
        inactiveIcon={navbarIcons.EventsInactive}
      />
      {isAuthenticated && (
        <NavItem
          link="/app/adventures"
          label="Adventures"
          activeIcon={navbarIcons.MyTicketsActive}
          inactiveIcon={navbarIcons.MyTicketsInactive}
        />
      )}
      {/* Intercom custom launcher tab */}
      {breakpoints.xsDown && (
        <a id="intercom-navbar-launcher">
          <S.NavItem isActive={false}>
            <S.ItemIcon src={navbarIcons.MoreInactive} />
            <S.ItemText>Support</S.ItemText>
          </S.NavItem>
        </a>
      )}
    </S.BottomNavbar>
  );
};

interface NavItemProps {
  link: string;
  label: string;
  activeIcon: any;
  inactiveIcon: any;
}

const NavItem: React.FC<NavItemProps> = ({ link, label, activeIcon, inactiveIcon }) => {
  const { pathname } = useLocation();
  const isActive = link === '/' ? pathname === '/' : pathname.startsWith(link);

  return (
    <S.NavLink to={link}>
      <S.NavItem isActive={isActive}>
        <S.ItemIcon src={isActive ? activeIcon : inactiveIcon} />
        <S.ItemText>{label}</S.ItemText>
      </S.NavItem>
    </S.NavLink>
  );
};

export default Navbar;
