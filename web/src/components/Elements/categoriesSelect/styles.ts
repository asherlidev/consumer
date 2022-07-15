import styled from 'styled-components';
import colors from '../../../constants/colors';

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
  z-index: 3;

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

  .css-2b097c-container {
    border: none;
    width: 100%;
  }

  .css-yk16xz-control {
    font-family: 'Sofia Pro';
    background-color: transparent;
    font-size: 14px;
    color: #787e83;
    padding: 22px 5px 6px 11px;
    width: 100%;
  }

  .css-1pahdxg-control {
    font-family: 'Sofia Pro';
    border: none;
    box-shadow: none;
    outline: none;
    background-color: transparent;
    font-size: 14px;
    color: #787e83;
    padding: 22px 5px 6px 11px;
    width: 100%;
  }

  .css-yk16xz-control {
    top: 3px;
  }

  .css-1okebmr-indicatorSeparator {
    display: none;
  }

  .css-yk16xz-control {
    border: none;
  }

  .css-26l3qy-menu {
    top: 100%;
    margin-top: 0;
    background-color: #fff;
    border-radius: 0px 0px 8px 8px;
    box-shadow: 0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%);
    margin-bottom: 8px;
    position: absolute;
    width: 100%;
    /* min-width: 230px; */
    z-index: 1;
    box-sizing: border-box;
    text-align: start;
  }

  .css-4ljt47-MenuList {
    font-family: 'Sofia Pro';
    font-size: 14px;
    font-weight: 400;
    max-height: 300px;
    overflow-y: auto;
    padding-bottom: 4px;
    padding-top: 4px;
    position: relative;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
  }

  .css-1n7v3ny-option {
    font-family: 'Sofia Pro';
    font-size: 14px;
    font-weight: 400;
    background-color: #fff;
    color: #091d2c;
    cursor: pointer;
  }

  .css-1n7v3ny-option:active {
    font-family: 'Sofia Pro';
    font-size: 14px;
    font-weight: 400;
    background-color: #fff;
  }

  .css-1n7v3ny-option:hover {
    font-family: 'Sofia Pro';
    font-size: 14px;
    font-weight: 400;
    background-color: #fff;
  }
`;

export const Select = styled.div`
  width: 100%;
  font-size: 14px;
  cursor: pointer;

  & select {
    font-family: 'Sofia Pro';
    background-color: transparent;
    font-size: 12px;
    padding: 32px 20px 10px 20px;
    min-width: 230px;
    width: 100%;
    display: flex;
    outline: none;
    border: none;
    appearance: none;
  }

  &::after {
    content: '';
    display: inline-block;

    width: 10px;
    height: 10px;
    background-color: black;
  }
`;
