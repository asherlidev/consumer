import styled from 'styled-components';

export const Container = styled.div<{ disabled: boolean }>`
  position: relative;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  padding: 2rem 0;
  user-select: none;
`;

export const CheckboxInput = styled.input`
  opacity: 0;
  width: 1px;
  height: 1px;
  position: absolute;
  left: 0;
  top: 0;
`;

export const Label = styled.span`
  color: #091d2c;
  font-weight: 500;
  padding-left: 1rem;
`;
