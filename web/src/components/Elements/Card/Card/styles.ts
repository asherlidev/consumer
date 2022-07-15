import styled from 'styled-components';
import colors from '../../../../constants/colors';

export const Container = styled.div<{ maxWidth?: number | string }>`
  text-align: left;
  overflow: hidden;
  border-radius: 8px;
  background-color: ${colors.white};
  max-width: ${(props) =>
    typeof props.maxWidth === 'number' ? props.maxWidth + 'px' : props.maxWidth};
`;
