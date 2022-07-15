import styled from 'styled-components';
import colors from '../../../../../constants/colors';
import mq from '../../../../../constants/layout';

export const Container = styled.div`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 26px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;

  div:first-child {
    margin-top: 0px;
  }
  div:last-child {
    border-bottom: none;
    margin-bottom: 0px;
    padding: 0px;
  }
`;

export const Block = styled.div`
  border-bottom: 1px solid ${colors.gray};
  margin-top: 12px;
  margin-bottom: 12px;
  padding: 0px 0px 12px 0px;
`;
export const EventTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textDefault};
`;

export const EventDate = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
  color: ${colors.darkGray};
`;

export const Label = styled.div`
  color: ${colors.darkGray};
`;

export const Spaced = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const SeatId = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.textDefault};
`;

export const SeatLabel = styled.div`
  word-wrap: break-word;
  font-size: 16px;
  font-weight: 500;
  color: ${colors.darkGray};
`;
export const TicketBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TicketLabel = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${colors.textDefault};
`;
