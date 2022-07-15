import Img from 'gatsby-image';
import styled from 'styled-components';

export const Image = styled(Img)<{
  height?: string | number;
}>`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
  display: block;
  width: 100%;
  height: ${({ height: h }) => (typeof h === 'number' ? h + 'px' : h)};
`;
