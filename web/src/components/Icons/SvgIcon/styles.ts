import styled from 'styled-components';

export const Container = styled.svg`
  user-select: none;
  height: 1em;
  width: 1em;
  display: inline-block;
  fill: ${(props) => props.fill};
  flex-shrink: 0;
  outline: none;
`;
