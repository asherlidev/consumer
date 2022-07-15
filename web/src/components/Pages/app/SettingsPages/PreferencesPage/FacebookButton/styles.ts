import styled from 'styled-components';
import colors from '../../../../../../constants/colors';
import { Button } from '../../../../../Elements';

export const Container = styled(Button)`
  background-color: ${colors.blue};
  color: ${colors.white};
  margin: 0;
  white-space: pre;
  padding: 0 24px;
  line-height: 3;
  font-size: 1.4rem;
  min-height: 40px;

  &:hover {
    color: ${colors.white};
  }
`;

export const IconWrap = styled.div`
  display: inline-flex;
  font-size: 2.2rem;
  margin-right: 5px;
`;
