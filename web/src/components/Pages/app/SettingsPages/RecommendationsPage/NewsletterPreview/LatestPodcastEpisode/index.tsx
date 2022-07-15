import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { StoriesEpisodeDetails } from '../../../../../../../../gatsby-node';
import { LatestPodcastEpisodeQuery } from '../../../../../../../../graphql-types';
import Container from '../../../../../../Elements/Container';
import PodcastEpisodePlayer from '../../../../../../Elements/PodcastEpisodePlayer';
import * as S from './styles';

interface Props {
  className?: string;
  isMock?: boolean;
}

const LatestPodcastEpisode: React.FC<Props> = ({ className, isMock }) => {
  const data = useStaticQuery<LatestPodcastEpisodeQuery>(query);
  const episode = data.allStrapiPodcast.edges[0].node;

  return (
    <S.Root className={className}>
      <Container>
        <PodcastEpisodePlayer episode={episode as StoriesEpisodeDetails} isMock={isMock} />
      </Container>
    </S.Root>
  );
};

export default LatestPodcastEpisode;

//
// Utils
//

const query = graphql`
  query LatestPodcastEpisode {
    allStrapiPodcast(
      limit: 1
      filter: { isActive: { eq: true } }
      sort: { order: DESC, fields: created_at }
    ) {
      edges {
        node {
          slug
          strapiId
          created_at
          slug
          title
          contentSnippet
          date
          content
          audio
          coverPhoto {
            fixed(width: 300, height: 300) {
              ...CloudinaryAssetFixed
            }
          }
        }
      }
    }
  }
`;
