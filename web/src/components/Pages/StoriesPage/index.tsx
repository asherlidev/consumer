import { graphql, PageProps, useStaticQuery } from 'gatsby';
import { map, sortBy } from 'lodash';
import moment from 'moment';
import React, { useMemo } from 'react';
import { CloudinaryAsset, Maybe, StoriesPageQuery, StrapiPodcast } from '../../../../graphql-types';
import { CloudinaryImage } from '../../../types/common';
import { CircleOutlineIcon, PlusIcon } from '../../Icons';
import { Footer, Header } from '../../Layout';
import AboutSection from './AboutSection';
import AllEpisodesSection from './AllEpisodesSection';
import HostSection from './HostSection';
import IntroSection from './IntroSection';
import LatestEpisodesSection from './LatestEpisodesSection';
import NewsletterSection from './NewsletterSection';
import * as S from './styles';

const StoriesPage: React.FC<PageProps> = () => {
  const data = useStaticQuery<StoriesPageQuery>(storiesPageQuery);

  const episodes = useMemo(
    () =>
      sortBy(map(data.allStrapiPodcast.edges, 'node'), (episode) =>
        moment(episode.date).valueOf()
      ).reverse(),
    [data.allStrapiPodcast.edges]
  );

  return (
    <>
      <Header />
      <S.Content>
        <IntroSection />
        <AboutSection />
        <S.TransparentBlobBg>
          <HostSection />
          <S.BlueSquareContainer>
            <S.BlueSquare>
              <S.CircleIconWrap>
                <CircleOutlineIcon r={300} />
              </S.CircleIconWrap>
              <S.PlusIconTopWrap>
                <PlusIcon />
              </S.PlusIconTopWrap>
              <S.PlusIconBottomWrap>
                <PlusIcon />
              </S.PlusIconBottomWrap>
              <S.DecorativeDotsWhite size={300} />
            </S.BlueSquare>
            <LatestEpisodesSection episodes={episodes} />
            <NewsletterSection />
          </S.BlueSquareContainer>
        </S.TransparentBlobBg>
        {episodes.length > 3 && <AllEpisodesSection episodes={episodes} />}
      </S.Content>
      <Footer />
    </>
  );
};

export default StoriesPage;

//
// Utils
//

const storiesPageQuery = graphql`
  query StoriesPage {
    allStrapiPodcast(filter: { isActive: { eq: true } }) {
      edges {
        node {
          strapiId
          created_at
          slug
          title
          contentSnippet
          date
          coverPhoto {
            fluid {
              ...CloudinaryAssetFluid
            }
          }
        }
      }
    }
  }
`;

export type StoriesEpisodeSummary = Pick<
  StrapiPodcast,
  'strapiId' | 'created_at' | 'slug' | 'title' | 'contentSnippet' | 'date'
> & {
  cover_image: Maybe<CloudinaryImage>;
  coverPhoto: CloudinaryAsset;
};
