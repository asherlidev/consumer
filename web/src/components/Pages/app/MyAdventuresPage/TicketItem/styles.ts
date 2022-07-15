import styled from 'styled-components';
import { Link } from 'gatsby';

import { Button } from '../../../../Elements';

export const TicketItem = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
`;

export const TicketLink = styled(Link)`
  width: 100%;
  color: black;
`;

export const TicketImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const TicketContent = styled.div`
  width: 100%;
  padding: 12px 16px;
`;

export const EventName = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const EventDescription = styled.p`
  margin: 0;
  opacity: 0.7;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const EventDateBlock = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px;
  color: white;
  border-radius: 8px;
  background-color: #f50756;
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EventDateText = styled.p`
  margin: 0;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  opacity: 0.75;
`;

export const EventDateTextBold = styled.p`
  margin: 0 0 1px;
  font-size: 22px;
  line-height: 22px;
  font-weight: 600;
`;

export const HorizontalLine = styled.hr`
  margin: 12px 0;
`;

export const CtaButton = styled(Button)`
  width: 100%;
  margin: 4px 0;
  border: 1px solid #d2d2d2;
  background-color: #f2f2f2;
`;
