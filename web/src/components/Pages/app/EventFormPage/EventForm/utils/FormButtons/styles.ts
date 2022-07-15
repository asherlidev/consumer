import styled from 'styled-components';
import { Btn } from '../../../../../../Elements';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const UndoButton = styled(Btn)`
  margin-right: 1rem;
  border: 2px solid #fa2069;
`;
