import React from 'react';
import * as S from './styles';

interface Props {
  color?: keyof typeof S.COLOR_MAP;
  marginBottom?: string;
}

const Title: React.FC<Props> = ({ color = 'default', children, marginBottom, ...otherProps }) => (
  <S.Container color={color} marginBottom={marginBottom} {...otherProps}>
    {children}
  </S.Container>
);

export default Title;
