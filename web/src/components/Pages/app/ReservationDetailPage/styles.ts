import styled from 'styled-components';
import mq from '../../../../constants/layout';
import { PageWrapper } from '../../../Layout';

export const ContentContainer = styled(PageWrapper)`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;

  ${mq.smUp} {
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
  }
`;

export const GridContainer = styled.div`
  margin: 40px auto;
  max-width: 1200px;

  ${mq.smUp} {
    display: grid;
    grid-column-gap: 40px;
    grid-template-columns: 300px auto;
  }

  ${mq.mdUp} {
    grid-column-gap: 60px;
    grid-template-columns: 350px auto;
  }
`;

export const TicketImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
`;

export const EventDetailsGrid = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;

export const EventName = styled.p`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
`;

export const EventDetails = styled.div`
  opacity: 0.8;
`;

export const EventIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-bottom: 8px;
`;

export const BackIcon = styled.img`
  height: 20px;
  width: 20px;
`;

export const LinkIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-left: -10px;
  margin-right: 8px;
`;

export const RoomContainer = styled.div`
  padding: 16px;
  margin: 20px 0px;
  border-radius: 12px;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
`;
