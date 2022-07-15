import styled from 'styled-components';
import colors from '../../../constants/colors';

export default styled.h3`
  font-size: 1.6rem;
  padding: 0 15px;
  margin: 15px 0 10px;
  display: block;
  font-weight: 600;
  color: ${colors.textDefault};

  &:hover {
    color: ${colors.textDefault};
  }
`;
