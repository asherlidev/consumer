import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, PageProps, graphql } from 'gatsby';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';

import { StoriesEpisodeDetails } from '../../../../gatsby-node';
import { Breadcrumbs, Button, PodcastEpisodePlayer } from '../../Elements';
import {
  CircleOutlineIcon,
  PlusIcon,
  TriangleIconAlternate,
  TriangleOutlineIconAlternate,
} from '../../Icons';
import { Footer, Header, PageWrapper } from '../../Layout';
import * as S from './styles';

const StoriesEpisodesPage: React.FC<PageProps<{}, { episode: StoriesEpisodeDetails }>> = ({
  pageContext: { episode },
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <PageWrapper>
        <S.TransparentBlobBg>
          <S.BlueSquare>
            <S.PlusIconTopWrap>
              <PlusIcon />
            </S.PlusIconTopWrap>
            <S.DecorativeDotsWhite />
            <S.CircleIconWrap>
              <CircleOutlineIcon r={300} />
            </S.CircleIconWrap>
          </S.BlueSquare>
          <S.Container>
            <S.BreadcrumbsWrap>
              <Breadcrumbs
                links={[
                  { children: capitalize(t('storiesPage.introSection.title')), to: '/stories' },
                  { children: episode.title, to: `/stories/${episode.slug}` },
                ]}
              />
            </S.BreadcrumbsWrap>
            <S.Paper>
              {episode.audio && <PodcastEpisodePlayer episode={episode} />}
              <S.IconAccentGroup1>
                <TriangleOutlineIconAlternate />
                <TriangleIconAlternate />
              </S.IconAccentGroup1>
              {episode.content && (
                <S.Content>
                  <ReactMarkdown children={episode.content} remarkPlugins={[remarkGfm]} />
                </S.Content>
              )}
            </S.Paper>
            <S.AllEpisodesButtonWrap>
              <Button as={Link} to="/stories#latest-episodes" color="primary">
                {t('storiesEpisodePage.latestEpisodesButton')}
              </Button>
            </S.AllEpisodesButtonWrap>
          </S.Container>
        </S.TransparentBlobBg>
        <S.DecorativeDotsBlue />
        <S.PlusIconBottomWrap>
          <PlusIcon />
        </S.PlusIconBottomWrap>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default StoriesEpisodesPage;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
