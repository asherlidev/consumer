import styled from 'styled-components';
import colors from '../../../constants/colors';

export const FestivalPassContainer = styled.div`
  font-family: 'Sofia Pro';
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  letter-spacing: 0.31em;
  padding: 0px 5px;
  height: 30px;
  background: ${colors.error};
  border-radius: 8px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;

  & img {
    width: 12px;
    height: 12.86px;
    margin-right: 5px;
    margin-bottom: 2px;
  }
`;

export const Container = styled.div`
  & .tooltip {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    color: ${colors.black};
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    opacity: 1;
    left: 20%;
    top: 18%;
  }
`;
