import React from 'react';
import * as S from './styles';

const SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ref, children, ...otherProps }) => (
  <S.Container fill="currentColor" {...otherProps}>
    {children}
  </S.Container>
);

export default SvgIcon;
