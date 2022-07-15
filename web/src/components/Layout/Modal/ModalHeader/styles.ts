import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import zIndex from '../../../../constants/zIndex';

export const ModalTitle = styled(Modal.Title)`
  margin-bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalCloseButton = styled.button`
  z-index: ${zIndex.aboveOverlay};
  background: transparent;
  margin-bottom: 0;
  border: 0;
  padding: 15px;
`;
