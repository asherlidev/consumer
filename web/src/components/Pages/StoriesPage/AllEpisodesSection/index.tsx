import { Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StoriesEpisodeSummary } from '..';
import { Button, Title } from '../../../Elements';
import { CardMedia } from '../../../Elements/Card';
import { PodcastIcon } from '../../../Icons';
import * as S from './styles';

interface Props {
  episodes: StoriesEpisodeSummary[];
}

const AllEpisodesSection: React.FC<Props> = ({ episodes }) => {
  const breakpoints = useBreakpoint();
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll((x) => !x);

  const episodesLimit = useMemo(() => {
    if (breakpoints.mdDown) {
      return 3;
    }
    if (breakpoints.lgDown) {
      return 6;
    }
    return 9;
  }, [breakpoints.lgDown, breakpoints.mdDown]);

  return (
    <S.Root id="all-episodes">
      <S.Container>
        <S.Toolbar>
          <S.TitleWrap>
            <Title>{t('storiesPage.allEpisodesSection.title')}</Title>
          </S.TitleWrap>
          {episodes.length > episodesLimit && (
            <div>
              <S.TopButton text color="primary" size="large" onClick={toggleShowAll}>
                {showAll
                  ? t('storiesPage.allEpisodesSection.showLessButton')
                  : t('storiesPage.allEpisodesSection.seeAllButton')}
              </S.TopButton>
            </div>
          )}
        </S.Toolbar>
        <S.CardGrid>
          {episodes
            .slice(0, showAll ? episodes.length : episodesLimit)
            .map(({ strapiId, title, coverPhoto, date, slug }) => (
              <S.EpisodeCard key={strapiId}>
                <CardMedia image={coverPhoto.fluid as FluidObject} height="100%" />
                <S.EpisodeCardContent>
                  <S.PodcastDate>{moment(date).format('MMMM Do, YYYY')}</S.PodcastDate>
                  <S.EpisodeCardTitle>{title}</S.EpisodeCardTitle>
                  <S.CardActions>
                    <Button
                      as={Link}
                      to={`/stories/${slug}`}
                      text
                      color="primary"
                      icon={<PodcastIcon />}
                      size="small"
                    >
                      {t('storiesPage.common.listenNowButton')}
                    </Button>
                  </S.CardActions>
                </S.EpisodeCardContent>
              </S.EpisodeCard>
            ))}
        </S.CardGrid>
        {episodes.length > episodesLimit && (
          <S.BottomButtonWrap>
            <Button text color="primary" size="large" onClick={toggleShowAll}>
              {showAll
                ? t('storiesPage.allEpisodesSection.showLessButton')
                : t('storiesPage.allEpisodesSection.seeAllButton')}
            </Button>
          </S.BottomButtonWrap>
        )}
      </S.Container>
    </S.Root>
  );
};

export default AllEpisodesSection;
