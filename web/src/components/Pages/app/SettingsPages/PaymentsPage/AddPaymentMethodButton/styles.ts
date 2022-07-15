import styled from 'styled-components';
import { IconButton } from '../../../../../Elements';
import { PlusButtonIcon } from '../../../../../Icons';

export const AddMethodIconButton = styled(IconButton)`
  border-radius: 9999px;
  font-weight: 600;
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  transition: all 250ms;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: 1.2;
  outline: none;
  height: 3rem;
  min-width: 3rem;
  font-size: 1.125rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: #edf2f7;
  padding: 0;
  height: 45px;
  width: 45px;
  color: #718096;
  margin-bottom: 0;
  margin-right: 8px;

  :hover {
    background-color: #e2e8f0;
    color: #23527c;
  }
`;

export const PlusIcon = styled(PlusButtonIcon)`
  user-select: none;
  height: 1em;
  width: 1em;
  display: inline-block;
  fill: currentColor;
  flex-shrink: 0;
  outline: none;
  font-size: 2rem;
`;
