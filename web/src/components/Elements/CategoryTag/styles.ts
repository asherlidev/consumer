import styled from 'styled-components';
import colors from '../../../constants/colors';

export const Container = styled.span<{ disabled?: boolean; selected?: boolean }>`
  margin: 10px;
  padding: 8px 16px;
  height: 32px;
  border-radius: 32px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  background-color: ${(props) => (props.selected ? colors.blue : null)};
  color: ${(props) => (props.selected ? colors.white : colors.darkGray)};
  border: 1px solid #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 100ms ease-in-out, color 100ms ease-in-out;

  :hover {
    background-color: ${(props) => (props.disabled || props.selected ? null : '#2069fab0')};
    color: ${(props) => (props.disabled ? null : colors.white)};
  }
`;
