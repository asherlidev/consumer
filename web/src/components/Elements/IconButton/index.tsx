import React from 'react';
import * as S from './styles';

interface Props extends React.ButtonHTMLAttributes<any> {
  color?: 'default' | 'primary';
}

const IconButton: React.FC<Props> = ({ color = 'default', children, ...otherProps }) => (
  <S.Container color={color} {...otherProps}>
    {children}
  </S.Container>
);

export default IconButton;
