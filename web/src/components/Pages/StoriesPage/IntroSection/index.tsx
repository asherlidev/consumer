import { graphql, Link, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StoriesIntroSectionQuery } from '../../../../../graphql-types';
import { Button, Logo } from '../../../Elements';
import { WordMark } from '../../../Icons';
import MiniTitle from '../MiniTitle';
import appleMusicCtaSvg from './appleMusicCta.svg';
import spotifyCtaSvg from './spotifyCta.svg';
import * as S from './styles';

interface Props {
  className?: string;
}

const IntroSection: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  const data = useStaticQuery<StoriesIntroSectionQuery>(storiesIntroSectionQuery);

  return (
    <S.Root
      Tag="section"
      className={className}
      fluid={data?.background?.childCloudinaryAsset?.fluid as FluidObject}
      role="img"
      aria-label="Intro"
    >
      <S.ContentTop>
        <S.LogoWrap>
          <Logo />
        </S.LogoWrap>
        <S.WordMarkWrap>
          <WordMark />
        </S.WordMarkWrap>

        <MiniTitle color="secondary">{t('storiesPage.introSection.title')}</MiniTitle>

        <h2>
          <S.WhiteTextBlock>{t('storiesPage.introSection.headlineP1')}</S.WhiteTextBlock>
          <br />
          <S.WhiteTextBlock>{t('storiesPage.introSection.headlineP2')}</S.WhiteTextBlock>
        </h2>
        <Button as={Link} to="#about" size="large" color="primary">
          {t('storiesPage.introSection.learnMoreButton')}
        </Button>
      </S.ContentTop>

      <S.ContentBottom>
        <Button
          as="a"
          href="https://open.spotify.com/show/2MM1Hu96zHwC7EDzyo2no8?si=wvRzWbIqRk6t1QWWcCDg0Q"
          target="_blank"
          bg="black"
        >
          <S.SpotifyImg src={spotifyCtaSvg} alt={t('storiesPage.introSection.spofityButtonAlt')} />
        </Button>
        <S.AppleMusicButton
          as="a"
          href="https://podcasts.apple.com/us/podcast/festivalpass-stories/id1515349498"
          target="_blank"
          bg="black"
        >
          <img src={appleMusicCtaSvg} alt={t('storiesPage.introSection.appleMusicButtonAlt')} />
        </S.AppleMusicButton>
      </S.ContentBottom>
    </S.Root>
  );
};

export default IntroSection;

//
// Utils
//

const storiesIntroSectionQuery = graphql`
  query StoriesIntroSection {
    background: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/StoriesPage/IntroSection/background.png" }
    ) {
      childCloudinaryAsset {
        fluid {
          ...CloudinaryAssetFluid
        }
      }
    }
  }
`;
