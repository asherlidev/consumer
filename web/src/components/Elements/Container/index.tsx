import React from 'react';
import { MediaSize } from '../../../constants/layout';
import * as S from './styles';

interface Props {
  maxWidth?: MediaSize;
}

const Container: React.FC<Props> = ({ maxWidth = 'md', children, ...otherProps }) => (
  <S.Container maxWidth={maxWidth} {...otherProps}>
    {children}
  </S.Container>
);

export default Container;
