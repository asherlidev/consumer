import styled from 'styled-components';
import { MediaSize, mediaSizesInPxMap } from '../../../constants/layout';

export const Container = styled.div<{ maxWidth: MediaSize }>`
  max-width: ${({ maxWidth: mediaSize }) => mediaSizesInPxMap[mediaSize]}px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
`;
