import React from 'react';
import * as S from './styles';

interface Props {
  color: 'primary' | 'secondary';
}

const MiniTitle: React.FC<Props> = ({ color, children, ...otherProps }) => (
  <S.Container color={color} {...otherProps}>
    {children}
  </S.Container>
);

export default MiniTitle;
