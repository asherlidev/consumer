import React from 'react';
import * as S from './styles';

interface Props {}

const Loading: React.FC<Props> = (props) => (
  <S.Container {...props}>
    <S.BounceCircle1 />
    <S.BounceCircle2 />
  </S.Container>
);

export default Loading;
