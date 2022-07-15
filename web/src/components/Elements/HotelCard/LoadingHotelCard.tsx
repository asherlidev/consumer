import React from 'react';
import defaultLoadingSpinner from '../Btn/defaultLoadingSpinner.svg';
import * as S from './styles';

const LoadingEventCard: React.FC = () => (
  <S.LoadingArtbox>
    <S.CenteredLoading>
      <img src={defaultLoadingSpinner} width="32" alt="Loading" />
    </S.CenteredLoading>
  </S.LoadingArtbox>
);

export default LoadingEventCard;
