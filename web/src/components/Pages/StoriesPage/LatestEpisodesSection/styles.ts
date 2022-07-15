import styled from 'styled-components';
import colors from '../../../../constants/colors';
import mq from '../../../../constants/layout';
import { Card, CardActions, Title } from '../../../Elements';

export const Root = styled.section`
  padding: 80px 0 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
`;

export const EpisodesTitle = styled(Title)`
  color: ${colors.white};
  margin: 0;

  ${mq.mdUp} {
    font-size: 6rem;
    line-height: 1.1;
  }
`;

export const CardGrid = styled.div<{ count: number }>`
  display: grid;
  grid-gap: 20px;
  overflow-x: auto;
  padding: 85px 20px;
  width: 100%;
  justify-items: center;
  
  ${mq.smUp} {
    grid-template-columns: ${({ count: c }) => `repeat(${c <= 3 ? c : '3'}, 1fr);`}
  }
  
  ${mq.mdUp} {
    width: auto;
    grid-template-columns: ${({ count: c }) => `repeat(${c <= 3 ? c : '3'}, 315px);`}
    overflow: visible;
  }
`;

export const PodcastDate = styled.div`
  font-size: 1.2rem;
  color: ${colors.textSecondary};
  text-align: left;
  width: 100%;
`;

export const CardContentGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 54px;
`;

export const EpisodeCard = styled(Card)`
  display: grid;
  grid-template-rows: 183px 1fr;
  box-shadow: 10px 10px 84px rgba(0, 0, 0, 0.31);
  max-width: 400px;
`;

export const EpisodeCardActions = styled(CardActions)`
  justify-content: space-between;
  padding: 0 10px 0 15px;
`;
