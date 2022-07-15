import styled from 'styled-components';

// TODO: include SVG in project instead of getting it from cloudinary
export const DecorativeDots = styled.div<{ size: number }>`
  background-image: url(https://res.cloudinary.com/festivalpass/image/upload/v1589256428/fp-content/organic-shapes/oval-dots-1.svg);
  background-size: cover;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`;
