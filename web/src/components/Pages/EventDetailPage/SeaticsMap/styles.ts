import styled, { css } from 'styled-components';

import mq from '../../../../constants/layout';

export const Wrapper = styled.div`
  margin-bottom: 40px;
  ${mq.smUp} {
    display: flex;
    flex-direction: row;
  }
`;

export const TicketsContainer = styled.div`
  width: 100%;
  height: 500px;
  overflow: auto;
  border-radius: 12px;
  box-shadow: 0px 5px 72px rgba(0, 0, 0, 0.1);
  ${mq.smUp} {
    min-width: 300px;
    margin-right: 40px;
  }
  ${mq.mdUp} {
    min-width: 400px;
  }
`;

export const MapContainer = styled.div`
  min-height: 500px;
  display: none;
  /* width: 600px; */
  /* position: relative;
  overflow: hidden; */
  ${mq.smUp} {
    display: initial;
  }
`;

export const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyTicket = styled.div`
  text-align: center;
  font-weight: 600;
  margin-top: 30px;
`;

export const Ticket = styled.div`
  position: relative;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f2f2f2;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }

  &:first-child {
    border-top: none;
  }
`;

export const TicketColorBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 100%;
`;

export const TicketSection = styled.p`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 0;
`;

export const TicketRow = styled.p`
  font-weight: 300;
  font-size: 13px;
  margin: -4px 0;
`;

export const TicketAvailability = styled.p`
  font-size: 13px;
  margin-bottom: 0;
`;

export const TicketPriceButton = styled.button`
  background-color: #fa2069;
  color: #ffffff;
  margin-bottom: 0;
  margin-left: 20px;
  border-radius: 8px;
`;
