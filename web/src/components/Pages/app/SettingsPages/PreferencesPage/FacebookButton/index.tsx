import React from 'react';
import { FacebookIcon } from '../../../../../Icons';
import * as S from './styles';

interface Props {
  onClick: () => void;
}

const InstagramButton: React.FC<Props> = ({ children, ...otherProps }) => (
  <S.Container size="small" {...otherProps}>
    <S.IconWrap>
      <FacebookIcon />
    </S.IconWrap>
    {children}
  </S.Container>
);

export default InstagramButton;
