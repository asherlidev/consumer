import styled from 'styled-components';
import colors from '../../../../constants/colors';
import mq from '../../../../constants/layout';
import { Button } from '../../../Elements';
import Card, { CardContent, CardTitle } from '../../../Elements/Card';

export const Root = styled.div`
  padding: 100px 0;
  text-align: left;
`;

export const Container = styled.div`
  margin: auto;
  max-width: 1254px;
`;

export const EpisodeCard = styled(Card)`
  min-height: 115px;
  width: 400px;
  max-width: 100%;
  display: grid;
  grid-template-columns: 119px 1fr;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.11);

  ${mq.mdDown} {
    width: 100%;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  justify-items: center;
  margin: 30px auto;

  ${mq.mdDown} {
    margin: 30px 10px;
  }

  ${mq.mdUp} {
    grid-template-columns: 1fr 1fr;
  }

  ${mq.lgUp} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const PodcastDate = styled.div`
  font-size: 1.2rem;
  color: ${colors.textSecondary};
  margin: 5px 0;
`;

export const EpisodeCardTitle = styled(CardTitle)`
  margin: 0;
  padding: 0;
`;

export const EpisodeCardContent = styled(CardContent)`
  display: grid;
  grid-template-rows: auto 1fr 46px;
  padding-bottom: 0;
`;

export const TitleWrap = styled.div`
  h1 {
    margin: 0;
  }

  ${mq.mdUp} {
    h1 {
      font-size: 6rem;
      line-height: 1.1;
    }
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;

  ${mq.lgUp} {
    justify-content: space-between;
  }
`;

export const TopButton = styled(Button)`
  display: none;

  ${mq.lgUp} {
    display: block;
  }
`;

export const BottomButtonWrap = styled.div`
  display: flex;
  justify-content: center;

  ${mq.lgUp} {
    display: none;
  }
`;

export const CardActions = styled.div`
  align-self: end;
  padding-bottom: 10px;
`;
