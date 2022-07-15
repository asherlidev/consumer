import React from 'react';
import * as S from './styles';

interface Props {
  className?: string;
}

const BodyText: React.FC<Props> = ({ className, children, ...otherProps }) => (
  <S.Container
    className={`wow bounceInDown ${className || ''}`}
    data-wow-delay="0.5s"
    {...otherProps}
  >
    {children}
  </S.Container>
);

export default BodyText;
