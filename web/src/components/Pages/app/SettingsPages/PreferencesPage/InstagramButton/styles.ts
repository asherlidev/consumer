import styled from 'styled-components';
import { Button } from '../../../../../Elements';

export const Container = styled(Button)`
  background: radial-gradient(circle at 40% 128%, #eb6645 14%, #cf3092 89%);
  color: white;
  margin: 0;
  white-space: pre;
  padding: 0 24px;
  line-height: 3;
  font-size: 1.4rem;
  min-height: 40px;

  &:hover {
    color: white;
  }
`;

export const IconWrap = styled.div`
  display: inline-flex;
  font-size: 2.2rem;
  margin-right: 5px;
`;
