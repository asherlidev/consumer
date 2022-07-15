import styled from 'styled-components';

const COLOR_MAP = {
  primary: '#f50756',
  secondary: '#00b8ec',
};

export const Container = styled.h1<{ color: 'primary' | 'secondary' }>`
  text-transform: uppercase;
  color: ${(props) => COLOR_MAP[props.color]};
  font-size: 1.8rem;
  letter-spacing: 3px;
  font-weight: 900;
  margin: 0 0 25px;
`;
