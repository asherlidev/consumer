import React from 'react';
import { InstagramIcon } from '../../../../../Icons';
import * as S from './styles';

interface Props {
  onClick: () => void;
}

const InstagramButton: React.FC<Props> = ({ children, ...otherProps }) => (
  <S.Container size="small" {...otherProps}>
    <S.IconWrap>
      <InstagramIcon />
    </S.IconWrap>
    {children}
  </S.Container>
);

export default InstagramButton;
