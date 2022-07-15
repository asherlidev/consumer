import styled from 'styled-components';

export { ClickableWrapper } from '../GatsbyEventImageGallery/styles';

export const Container = styled.div`
  position: relative;
`;

export const CoverImage = styled.div<{ backgroundUrl: string }>`
  margin: 20px 0 40px 0;
  border-radius: 16px;
  background-color: #2c2c2c;
  background: url(${(props) => props.backgroundUrl});
  background-position: center;
  background-size: cover;
  height: 410px;
  width: 100%;
`;
