import styled from 'styled-components';
import colors from '../../../constants/colors';

const COLOR_MAP = {
  default: {
    bg: colors.lightGray,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  primary: {
    bg: colors.primary,
    color: colors.primaryContrast,
  },
};

export const Container = styled.button<{ color: 'default' | 'primary' }>`
  display: inline-flex;
  flex: 0 0 auto;
  padding: 12px;
  overflow: visible;
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
  background-color: ${(props) => COLOR_MAP[props.color].bg};
  color: ${(props) => COLOR_MAP[props.color].color};
`;
