import styled from 'styled-components';
import colors from '../../../../../../constants/colors';
import mq from '../../../../../../constants/layout';
import { NavLink } from '../../../../../Elements';

export const Container = styled.div`
  ${mq.smDown} {
    white-space: nowrap;
    overflow: auto;
    border-bottom: 1px solid #e7e7e7;
  }
`;

export const MenuItem = styled(NavLink)<{ disabled: boolean }>`
  padding: 1.5rem 2rem;
  display: block;
  color: #454f57;
  text-shadow: 0px 0px 1px transparent;
  border-right: 2px solid transparent;
  transition: border-color 200ms ease-in-out, color 200ms ease-in-out;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  &:focus,
  &:hover {
    text-decoration: none;
  }

  :hover:not(.active):not([disabled]) {
    border-right: 2px solid ${colors.primary};
    text-shadow: 0px 0px 1px ${colors.primary};
    color: ${colors.primary};
    opacity: 0.6;
  }

  &.active {
    text-shadow: 0px 0px 1px ${colors.primary};
    border-right: 2px solid ${colors.primary};
    color: ${colors.primary};
  }

  ${mq.smDown} {
    display: inline-block;
    border-right: 0 !important;
    border-bottom: 2px solid transparent;

    :hover:not(.active):not([disabled]) {
      border-bottom: 2px solid ${colors.primary};
    }

    &.active {
      border-bottom: 2px solid ${colors.primary};
    }
  }
`;
