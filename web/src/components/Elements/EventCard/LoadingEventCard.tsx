import React from 'react';
import defaultLoadingSpinner from '../Btn/defaultLoadingSpinner.svg';
import * as S from './styles';

interface Props {}

const LoadingEventCard: React.FC<Props> = (props) => (
  <S.LoadingArtbox {...props}>
    <S.CenteredLoading>
      <img src={defaultLoadingSpinner} width="32" alt="Loading" />
    </S.CenteredLoading>
  </S.LoadingArtbox>
);

export default LoadingEventCard;
