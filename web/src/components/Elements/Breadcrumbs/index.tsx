import { GatsbyLinkProps } from 'gatsby';
import React from 'react';
import * as S from './styles';

interface Props {
  links: GatsbyLinkProps<{}>[];
}

const Breadcrumbs: React.FC<Props> = ({ links, ...otherProps }) => (
  <S.Container {...otherProps}>
    {links.map((link, index) => (
      <span key={index}>
        <S.Crumb {...link} />
        {index < links.length - 1 && <S.Separator>/</S.Separator>}
      </span>
    ))}
  </S.Container>
);

export default Breadcrumbs;
