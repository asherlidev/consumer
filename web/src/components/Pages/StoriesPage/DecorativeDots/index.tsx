import React from 'react';
import * as S from './styles';

interface Props {
  size?: number;
}

const DecorativeDots: React.FC<Props> = ({ size = 300, ...otherProps }) => (
  <S.DecorativeDots size={size} {...otherProps} />
);

export default DecorativeDots;
