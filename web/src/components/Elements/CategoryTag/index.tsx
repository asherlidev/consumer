import React from 'react';
import * as S from './styles';

interface Props {
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const CategoryTag: React.FC<Props> = ({ children, ...otherProps }) => (
  <S.Container {...otherProps}>{children}</S.Container>
);

export default CategoryTag;
