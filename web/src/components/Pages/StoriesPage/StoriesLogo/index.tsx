import React from 'react';
import { Logo } from '../../../Elements';
import { WordMark } from '../../../Icons';
import * as S from './styles';

interface Props {}

const StoriesLogo: React.FC<Props> = (props) => {
  // TODO: add translations

  return (
    <S.Root {...props}>
      <S.LogoWordMarkWrap>
        <S.LogoWrap>
          <Logo />
        </S.LogoWrap>
        <S.WordMarkWrap>
          <WordMark />
        </S.WordMarkWrap>
        <S.StoriesLogoMiniTitle color="secondary">Stories</S.StoriesLogoMiniTitle>
      </S.LogoWordMarkWrap>
    </S.Root>
  );
};

export default StoriesLogo;
