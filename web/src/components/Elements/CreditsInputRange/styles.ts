import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Col } from './../../Pages/LandingPage/OurStorySection/styles';

export const Container = styled.div<{
  margin: string | undefined;
  darkMode: boolean;
  boldLabel: boolean;
}>`
  display: flex;
  margin-right: 10px;
  position: relative;
  border: 1px solid rgba(9, 29, 44, 0.3);
  border-radius: 8px;
  font-family: 'Soif Pro';
  z-index: 2;

  & label {
    z-index: 1;
    position: absolute;
    left: 19px;
    bottom: 1px;
    color: #475765;
    font-size: 12px;
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 700;
  }

  & input {
    font-family: 'Sofia Pro';
    font-weight: normal;
    background-color: transparent;
    font-size: 14px;
    padding: 32px 20px 10px 20px;
    width: 230px;
    display: flex;
    outline: none;
    border: none;
  }
`;

export const RangeMainContainer = styled.div`
  width: 412px;
  height: auto;
  position: absolute;
  background-color: #fff;
  left: -40%;
  top: 110%;

  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
  }
`;

export const RangeContainer = styled.div`
  width: 80%;
  margin: auto auto;

  .rc-slider {
    padding: 20px 0;
    margin-top: 10%;
  }

  .rc-slider-rail {
    background-color: #e6e9ec;
    height: 8px;
  }

  .rc-slider-track {
    height: 8px;
    background-color: #e6e9ec;
  }

  .rc-slider-step {
    height: 8px;
  }

  .rc-slider-handle {
    width: 32px;
    height: 32px;
    margin-top: -13px;
    border: solid 2px rgba(71, 87, 101, 0.6);
  }

  .rc-slider-handle::after {
    content: 'lll';
    position: absolute;
    left: 30%;
    top: 13%;
    padding: 0;
    margin: 0;
    color: rgba(71, 87, 101, 0.6);
  }

  .rc-slider-handle:active {
    border-color: rgba(71, 87, 101, 0.6);
    box-shadow: none;
  }
`;

export const Inputs = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  padding-top: 5px;
  padding-bottom: 15px;
  box-shadow: rgb(0 0 0 / 15%) 0px 1px 0px 0px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

export const InputContainer = styled.div`
  /* margin-right: 10px; */
  position: relative;

  & div {
    border: 1px solid rgba(9, 29, 44, 0.3);
    border-radius: 8px;
  }

  & label {
    z-index: 1;
    position: absolute;
    left: 15px;
    top: 12%;
    color: #475765;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
  }

  & input {
    background-color: #fff;
    font-size: 14px;
    padding: 35px 12px 20px 20px;
    width: 160px;
    display: flex;
    color: #091d2c;
  }
`;

export const Arrow = styled.div`
  font-size: 30px;
  color: #000;
  font-weight: 100;
  display: flex;
  align-items: center;
  margin: 0 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  padding: 12px 0px;
`;

export const ClearButton = styled.a`
  text-decoration: none;
  font-family: 'Sofia Pro';
  font-size: 14px;
  font-weight: 700;
  color: #091d2c;
  cursor: pointer;
`;

export const SaveButton = styled.a`
  text-decoration: none;
  font-family: 'Sofia Pro';
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: #f50756;
  padding: 7px 17px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #e1064e;
  }
`;
