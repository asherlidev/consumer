import React from 'react';
import * as S from './styles';

interface Props {
  color?: string;
}

const Subtitle: React.FC<Props> = ({ color, children, ...otherProps }) => (
  <S.Container color={color} {...otherProps}>
    {children}
  </S.Container>
);

export default Subtitle;
