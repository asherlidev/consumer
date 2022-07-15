import styled from 'styled-components';
import colors from '../../../constants/colors';

export const Button = styled.button<{
  background?: string;
  hoverBackground?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
  fontSize?: string;
  disabled?: boolean;
  fontWeight?: number;
  borderRadius?: string | number;
  borderColor?: string;
  noMR?: boolean;
  noFullWidth?: boolean;
}>`
  background-color: ${(props) =>
    props.disabled ? colors.darkGray : props.background || colors.primary};
  color: ${(props) => {
    if (props.color) {
      return props.color;
    }
    return props.background === colors.white ? colors.primary : colors.white;
  }};
  border-color: ${(props) => {
    if (props.disabled) {
      return colors.darkGray;
    }
    if (props.borderColor) return props.borderColor;
    return props.background ? props.background : colors.primary;
  }};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '8px')};
  width: ${(props) => {
    if (props.width) return props.width;
    if (props.noFullWidth) return 'unset';
    return '100%';
  }};
  margin-top: 10px;
  padding: 0 6px;
  font-size: ${(props) => props.fontSize || null};
  height: ${(props) => props.height || '56px'};
  font-weight: ${(props) => props.fontWeight || 500};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => (props.noMR ? '0px' : '5px')};

  &:hover {
    background: ${(props) => {
      if (props.disabled) {
        return colors.darkGray;
      }
      return props.hoverBackground || colors.backgroundGray;
    }};
  }

  & img {
    margin: 1px;
    width: ${(props) => props.fontSize || '14px'};
  }

  &:focus {
    outline: 0;
  }
`;
