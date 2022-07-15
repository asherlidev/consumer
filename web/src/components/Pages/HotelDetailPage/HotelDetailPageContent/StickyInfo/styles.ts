import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import colors from '../../../../../constants/colors';
import mq from '../../../../../constants/layout';

export const StickyInfo = styled.div`
  height: fit-content;
  width: 100%;
  margin-bottom: 24px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  position: sticky;
  top: 165px;
  ${mq.smUp} {
    top: 130px;
    width: 40%;
  }
`;

export const StickyInfoHeader = styled.div<{ center?: boolean }>`
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-start;
  word-break: break-word;
  align-items: ${(props) => (props.center ? 'center' : 'flex-start')};
  flex-direction: row;
  text-align: ${(props) => (props.center ? 'center' : 'left')};

  & h4 {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 5px;
    color: ${colors.textDefault};
  }
`;

export const InputButton = styled.button<{ hasValue?: boolean; focused?: boolean }>`
  padding: 5px;
  width: 100%;
  background: white;
  height: 56px;
  border-top-width: 1px;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 0;
  justify-content: center;
  &:focus,
  &:active,
  &:visited,
  &:focus-within,
  &:focus-visible,
  &:target {
    border: 1px solid #000;
  }
  color: ${(props) => (props.hasValue ? '#000000' : '#999999')};
  ${(props) =>
    props.focused
      ? `
  background: white;
  box-shadow: 0 5px 10px rgba(170, 170, 170, 0.3);
  `
      : ''}
  :focus {
    background: white;
    box-shadow: 0 5px 10px rgba(170, 170, 170, 0.3);
  }
`;

export const RegularBox = styled.div`
  border-color: rgb(176, 176, 176);
  border-width: 1px;
  border-style: solid;
  padding: 5px;
  width: 100%;
  background: white;
  height: 56px;
  border-top-width: 1px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const Loader = styled.div`
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  border-top: 6px solid #999999;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StickyInfoSelect = styled.input`
  width: 100%;
  height: 45px;
  border: none;
  background: rgba(128, 128, 128, 0.2);
  padding: 8px;
  border-radius: 8px;
  overflow: hidden;
`;

export const StickyInfoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ReserveButton = styled.button`
  display: flex;
  height: 50px;
  width: 100%;
  background: ${colors.primary};
  border-radius: 8px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  transition: 0.13s;
  :hover {
    transform: translateY(-3px);
    box-shadow: inset 0 0 1px rgba(170, 170, 170, 0.1), 0 3px 8px rgba(0, 0, 0, 0.2),
      0 -1px 1px rgba(170, 170, 170, 0.1);
  }
  :active {
    transition: 0.09s;
    transform: translateY(1px);
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OverlayContent = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(3px);
  width: 250px;
  height: 250px;
`;
