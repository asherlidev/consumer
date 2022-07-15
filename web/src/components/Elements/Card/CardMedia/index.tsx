import { FluidObject } from 'gatsby-image';
import React from 'react';
import * as S from './styles';

interface Props {
  image: FluidObject;
  height?: string | number;
}

const CardMedia: React.FC<Props> = ({ image, children, ...otherProps }) => (
  <S.Image fluid={image} {...otherProps}>
    {children}
  </S.Image>
);

export default CardMedia;
