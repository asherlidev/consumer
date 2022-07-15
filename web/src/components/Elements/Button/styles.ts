import { get } from 'lodash';
import styled from 'styled-components';
import colors from '../../../constants/colors';

const SIZES = {
  large: {
    fontSize: '2rem',
    lineHeight: 2.5,
    padding: '0 25px',
    minHeight: '52px',
  },
  medium: {
    fontSize: '1.4rem',
    lineHeight: 3,
    padding: '0 12px',
    minHeight: '40px',
  },
  small: {
    fontSize: '1rem',
    lineHeight: 2.8,
    padding: '0 12px',
    minHeight: '20px',
  },
};

const OUTLINED_VARIANT_COLOR_MAP = {
  default: {
    bg: 'transparent',
    color: colors.darkGray,
    borderColor: colors.gray,
  },
  primary: {
    bg: 'transparent',
    color: colors.primary,
    borderColor: colors.primary,
  },
};

const CONTAINED_VARIANT_COLOR_MAP = {
  default: {
    bg: colors.lightGray,
    color: colors.lightGray,
  },
  primary: {
    bg: colors.primary,
    color: colors.primaryContrast,
  },
  black: {
    bg: colors.black,
    color: colors.white,
  },
};

const TEXT_VARIANT_COLOR_MAP = {
  default: {
    bg: colors.lightGray,
    color: colors.darkGray,
  },
  primary: {
    bg: colors.primary,
    color: colors.primary,
  },
  black: {
    bg: colors.black,
    color: colors.white,
  },
};

const ButtonBase = styled.button<{
  size: 'small' | 'medium' | 'large';
  color: 'default' | 'primary' | 'black';
  bg?: 'white' | 'black';
  loading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  margin: 0;
  white-space: pre;
  padding: ${({ size }) => get(SIZES, [size, 'padding'], null)};
  line-height: ${({ size }) => get(SIZES, [size, 'lineHeight'], null)};
  font-size: ${({ size }) => get(SIZES, [size, 'fontSize'], null)};
  min-height: ${({ size }) => get(SIZES, [size, 'minHeight'], null)};
  pointer-events: ${({ loading }) => (loading ? 'none' : 'all')};
`;

export const OutlinedButton = styled(ButtonBase)`
  border-radius: 8px;
  border: 1px solid ${({ color }) => get(OUTLINED_VARIANT_COLOR_MAP, [color, 'borderColor'], null)};
  background-color: ${({ color }) => get(OUTLINED_VARIANT_COLOR_MAP, [color, 'bg'], null)};
  color: ${({ color }) => get(OUTLINED_VARIANT_COLOR_MAP, [color, 'color'], null)};
`;

export const TextButton = styled(ButtonBase)`
  background-color: transparent;
  color: ${({ color }) => get(TEXT_VARIANT_COLOR_MAP, [color, 'color'], null)};

  &:hover,
  &:active {
    background-color: ${({ color }) => get(TEXT_VARIANT_COLOR_MAP, [color, 'bg']) + '1c'};
    color: ${({ color }) => get(TEXT_VARIANT_COLOR_MAP, [color, 'color'], null)};
  }
`;

export const ContainedButton = styled(ButtonBase)`
  color: ${({ bg, color }) =>
    bg && color
      ? get(colors, color, null)
      : get(CONTAINED_VARIANT_COLOR_MAP, [color, 'color'], null)};
  background-color: ${({ bg, color }) =>
    !!bg ? get(colors, bg) : get(CONTAINED_VARIANT_COLOR_MAP, [color, 'bg'], null)};

  &:hover,
  &:active {
    color: ${({ color }) => get(CONTAINED_VARIANT_COLOR_MAP, [color, 'color'], null)};
  }
`;

export const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  margin-right: 5px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
