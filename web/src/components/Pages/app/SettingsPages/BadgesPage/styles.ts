import styled from 'styled-components';
import colors from '../../../../../constants/colors';
import mq from '../../../../../constants/layout';

export const BadgeWrapper = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 30px;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
`;

export const BadgeIcon = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

export const BadgeDetails = styled.div`
  margin-left: 12px;
  display: flex;
  align-items: center;
`;

export const BadgeName = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

export const PrimaryTag = styled.div`
  height: fit-content;
  background-color: ${colors.primary};
  color: ${colors.white};
  border-radius: 10px;
  padding: 6px 10px;
  text-transform: capitalize;
  margin-left: 12px;
`;

export const BadgeButton = styled.button`
  height: fit-content;
  padding: 6px 10px;
  color: ${colors.primary};
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid ${colors.primary};
  border-radius: 10px;
  margin-left: 12px;
  transition: 0.2s;

  :hover {
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;

export const EmptyContainer = styled.div`
  margin-top: 20px;
`;

export const EmptyHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const EmptyHelpText = styled.p`
  font-size: 18px;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
