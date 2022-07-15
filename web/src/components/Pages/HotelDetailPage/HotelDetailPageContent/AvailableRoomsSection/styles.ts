import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import colors from '../../../../../constants/colors';
import mq from '../../../../../constants/layout';

export const Root = styled.div`
  margin-top: 64px;
  margin-bottom: 64px;
`;

export const RoomsHeader = styled.h4`
  z-index: 1;
  top: 165px;
  ${mq.smUp} {
    top: 110px;
  }
  background: ${colors.white};
  position: sticky;
  padding: 16px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
`;

export const InputButton = styled.button`
  border-color: rgb(176, 176, 176);
  border-width: 1px;
  border-style: solid;
  padding: 5px;
  width: 100%;
  background: white;
  height: 56px;
  border-top-width: 1px;
  position: relative;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 16px;
  &:focus,
  &:active,
  &:visited,
  &:focus-within,
  &:focus-visible,
  &:target {
    border: 1px solid #000;
  }
`;

export const SearchButton = styled.button`
  border-color: ${colors.primary};
  border-width: 2px;
  border-style: solid;
  padding: 5px;
  width: 100%;
  background: ${colors.white};
  color: ${colors.primary};
  height: 56px;
  font-weight: bold;
  font-size: 14px;
  position: relative;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: 0.2s;
  :hover {
    background: rgba(250, 32, 105, 0.15);
  }
  :active {
    background: rgba(250, 32, 105, 0.3);
  }
  &:focus,
  &:visited,
  &:focus-within,
  &:focus-visible,
  &:target {
    border-width: 3px;
  }
`;

export const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoRoomsTitle = styled.h6`
  margin-bottom: 0px;
`;

export const NoRoomsContent = styled.p`
  margin-bottom: 24px;
`;

export const ShowMoreButton = styled.button`
  display: flex;
  height: 50px;
  width: 100%;
  border: 2px solid ${colors.darkGray};
  background: ${colors.white};
  border-radius: 8px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  color: ${colors.darkGray};
`;

export const RoomContainer = styled.div`
  gap: 16px;
  width: 100%;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  min-height: 180px;
  border-radius: 16px;
  transition: 0.2s ease;
  justify-content: space-between;
  word-break: break-word;
  /* border: 1px solid rgba(170, 170, 170, 0.2); */
  /* :hover {
    transform: translateY(-3px);
    box-shadow: inset 0 0 1px rgba(170, 170, 170, 0.1), 0 3px 12px rgba(0, 0, 0, 0.15),
      0 -1px 1px rgba(170, 170, 170, 0.1);
  } */
`;

export const RoomName = styled.h5`
  margin: 0;
  margin-top: 22px;
`;

export const RoomSubtitle = styled.p``;

export const Info = styled.p`
  color: #bbb;
`;

export const RoomPrice = styled.p`
  text-align: right;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

export const ReserveButton = styled.button`
  margin: 0;
  padding: 12px;
  border-radius: 8px;
  background: ${colors.primary};
  color: white;
  font-weight: bold;
  transition: 0.2s ease;
  :hover {
    transform: translateY(-3px);
    box-shadow: inset 0 0 1px rgba(170, 170, 170, 0.1), 0 3px 8px rgba(0, 0, 0, 0.2),
      0 -1px 1px rgba(170, 170, 170, 0.1);
  }
`;
