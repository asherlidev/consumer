import React from 'react';
import { Modal } from 'react-bootstrap';
import { ModalHeaderProps } from 'react-bootstrap/ModalHeader';
import fpHeaderLogoBlack from '../../fpHeaderLogoBlack.svg';
import closeIcon from './closeIcon.svg';
import * as S from './styles';

interface Props extends ModalHeaderProps {
  className?: string;
  onClose: () => void;
}

const ModalHeader: React.FC<Props> = ({ className, onClose, ...otherProps }) => (
  <Modal.Header className={className} {...otherProps}>
    <S.ModalTitle>
      <img alt="Festival Pass logo" src={fpHeaderLogoBlack} />
      <S.ModalCloseButton onClick={onClose}>
        <img alt="close icon" src={closeIcon} width="15" />
      </S.ModalCloseButton>
    </S.ModalTitle>
  </Modal.Header>
);

export default ModalHeader;
