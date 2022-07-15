import styled from 'styled-components';
import colors from '../../../../../../constants/colors';

export const Grid = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);
`;

export const FormValidation = styled.div`
  color: ${colors.error};
  font-weight: 700;
`;
