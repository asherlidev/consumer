import styled, { css } from 'styled-components';
import colors from '../../../../constants/colors';
import mq from '../../../../constants/layout';
import { NavLink as NavLinkComponent } from '../../../Elements';
import { MOBILE_HEADER_LINKS_HEIGHT_IN_PX, TOTAL_DESKTOP_HEADER_HEIGHT_IN_PX } from '../constants';

export const NavLink = styled(NavLinkComponent)`
  color: ${colors.white};
  opacity: 0.7;
  border-bottom: 2px solid transparent;
  text-shadow: 0px 0px 1px transparent;
  transition: border-bottom-color 200ms ease-in-out, text-shadow 200ms ease-in-out;
  padding: 1.5rem 2rem;
  display: inline-block;

  ${mq.smUp} {
    font-size: 14px;
    padding: 28px 16px;
    display: block;
  }

  :active,
  :hover,
  :focus,
  :visited {
    color: ${colors.white};
    text-decoration: none;
  }

  &.active,
  :hover {
    text-shadow: 0px 0px 1px ${colors.white};
    border-bottom: 2px solid ${colors.white};
  }
`;

export const solidContainerCss = css`
  ${mq.smDown} {
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #e7e7e7;
  }

  ${NavLink} {
    color: ${colors.darkGray};

    :active,
    :hover,
    :focus,
    :visited {
      color: ${colors.darkGray};
    }

    &.active,
    :hover {
      text-shadow: 0px 0px 1px ${colors.darkGray};
      border-bottom: 2px solid ${colors.blue};
    }
  }
`;

export const Container = styled.div<{ solid: boolean }>`
  ${mq.smDown} {
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    background: rgba(0, 0, 0, 0.3);
    transition: all 0.5s;
    position: absolute;
    top: ${TOTAL_DESKTOP_HEADER_HEIGHT_IN_PX}px;
    left: 0;
    right: 0;
    height: ${MOBILE_HEADER_LINKS_HEIGHT_IN_PX}px;
  }

  ${mq.smUp} {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  ${(props) => props.solid && solidContainerCss};
`;
