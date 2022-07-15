import React from 'react';
import Loading from './Loading';
import * as S from './styles';

interface Props {}

const CenteredLoading: React.FC<Props> = (props) => (
  <S.CenteredLoadingContainer {...props}>
    <Loading />
  </S.CenteredLoadingContainer>
);

export default CenteredLoading;
