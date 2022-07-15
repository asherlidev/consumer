import { Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StoriesEpisodeSummary } from '..';
import { Button, CardContent, CardMedia, CardTitle } from '../../../Elements';
import { PodcastIcon } from '../../../Icons';
import * as S from './styles';

interface Props {
  episodes: StoriesEpisodeSummary[];
}

const LatestEpisodesSection: React.FC<Props> = ({ episodes, ...otherProps }) => {
  const { t } = useTranslation();

  return (
    <S.Root id="latest-episodes" {...otherProps}>
      <S.EpisodesTitle>Latest Episodes</S.EpisodesTitle>
      <S.CardGrid count={episodes.slice(0, 3).length}>
        {episodes.slice(0, 3).map(({ slug, title, coverPhoto, contentSnippet, date }, index) => (
          <S.EpisodeCard key={index}>
            <CardMedia image={coverPhoto.fluid as FluidObject} height={183} />
            <S.CardContentGrid>
              <div>
                <CardTitle as={Link} to={`/stories/${slug}`}>
                  {title}
                </CardTitle>
                {contentSnippet && (
                  <CardContent as="p">
                    {contentSnippet.substr(0, DESCRIPTION_MAX)}
                    {contentSnippet.length >= DESCRIPTION_MAX ? '...' : ''}
                  </CardContent>
                )}
              </div>
              <S.EpisodeCardActions>
                <S.PodcastDate>{moment(date).format('MMMM Do, YYYY')}</S.PodcastDate>
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
              </S.EpisodeCardActions>
            </S.CardContentGrid>
          </S.EpisodeCard>
        ))}
        <div>{/* Spacer */}</div>
      </S.CardGrid>
      {episodes.length > 3 && (
        <Button as={Link} to="#all-episodes" color="primary">
          {t('storiesPage.latestEpisodesSection.viewAllEpisodes')}
        </Button>
      )}
    </S.Root>
  );
};

export default LatestEpisodesSection;

//
// Utils
//

const DESCRIPTION_MAX = 300;
