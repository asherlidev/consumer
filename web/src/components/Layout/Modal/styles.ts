import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import mq from '../../../constants/layout';
import zIndex from '../../../constants/zIndex';

export const ModalBody = styled(Modal.Body)<{ footerheightinpx?: number }>`
  padding: 20px;
  max-height: ${(props) => `calc(
    100vh - 2px /* modal top and bottom borders */ - 80px /* modal header */ - 1px
      /* modal header bottom border */ - 40px /* modal top and bottom margin */ - ${
        props.footerheightinpx || 0
      }px)`};
  overflow-y: auto;
  z-index: ${zIndex.aboveOverlay};

  ${mq.smUp} {
    padding: 40px;
    max-height: ${(props) => `calc(
    100vh - 2px /* modal top and bottom borders */ - 80px /* modal header */ - 1px
      /* modal header bottom border */ - 80px /* modal top and bottom margin */ - ${
        props.footerheightinpx || 0
      }px)`};
  }
`;
