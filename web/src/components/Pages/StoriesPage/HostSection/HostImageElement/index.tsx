import React from 'react';
import { PlusIcon } from '../../../../Icons';
import * as S from './styles';

interface Props {
  hostImageSrc: string;
}

const HostImgElement: React.FC<Props> = ({ hostImageSrc, ...otherProps }) => (
  <S.Container {...otherProps}>
    <S.HostImg src={hostImageSrc} />
    <S.DecorativeDotsBlue size={200} />
    <S.PlusIconTopWrap>
      <PlusIcon />
    </S.PlusIconTopWrap>
    <S.PlusIconBottomWrap>
      <PlusIcon />
    </S.PlusIconBottomWrap>
  </S.Container>
);

export default HostImgElement;
