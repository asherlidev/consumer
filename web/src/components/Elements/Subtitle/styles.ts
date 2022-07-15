import styled from 'styled-components';

export const Container = styled.p<{ color?: string }>`
  font-size: 16px;
  line-height: 30px;
  color: ${(props) => props.color || '#454f57'};
  margin-left: 0;
`;
