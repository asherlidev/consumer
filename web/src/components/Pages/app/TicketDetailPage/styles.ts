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

export const StubContainer = styled.div`
  padding: 12px 16px;
  margin: 20px 0px;
  border-radius: 12px;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
`;

export const StatusTag = styled.div<{ isPending: boolean }>`
  padding: 2px 8px;
  margin-top: 4px;
  font-weight: 600;
  font-size: 12px;
  border-radius: 8px;
  display: inline-block;
  color: ${({ isPending }) => (isPending ? 'initial' : 'white')};
  background-color: ${({ isPending }) => (isPending ? 'yellow' : '#f8497c')};
`;

export const StatusContainer = styled.div`
  width: 100%;
  border-radius: 32px;
  overflow: hidden;
  display: grid;
  grid-column-gap: 4px;
  grid-template-columns: repeat(3, 1fr);
`;

export const StatusItem = styled.div<{ isCompleted: boolean }>`
  width: 100%;
  height: 32px;
  background-color: ${({ isCompleted }) => (isCompleted ? '#f8497c' : '#FFE2EA')};
`;

export const StatusTextContainer = styled.div`
  display: grid;
  grid-column-gap: 4px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
`;

export const StatusText = styled.p`
  font-size: 12px;
  font-weight: 600;

  &:first-child {
    padding-left: 10px;
  }
`;
