import { FixedObject } from 'gatsby-image';
import React from 'react';
import * as S from './styles';

interface Props {
  title: string;
  picture: FixedObject;
}

const PlayerContainer: React.FC<Props> = ({ children, title, picture }) => (
  <S.Container>
    <div>
      <S.EpisodeImage fixed={picture} />
    </div>
    <div>
      <S.EpisodeTitle>{title}</S.EpisodeTitle>
      {children}
    </div>
  </S.Container>
);

export default PlayerContainer;
