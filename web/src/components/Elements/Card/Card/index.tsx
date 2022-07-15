import React from 'react';
import * as S from './styles';

interface Props {
  maxWidth?: number | string;
}

const Card: React.FC<Props> = ({ children, ...otherProps }) => (
  <S.Container {...otherProps}>{children}</S.Container>
);

export default Card;
