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
  z-index: 4;

  @media (max-width: 768px) {
    display: block;
  }

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

    @media (max-width: 768px) {
      top: -19px;
    }
  }

  & input {
    font-family: 'Sofia Pro';
    font-weight: normal;
    background-color: transparent;
    font-size: 14px;
    padding: 32px 20px 10px 20px;
    min-width: 230px;
    width: 100%;
    display: flex;
    outline: none;
    border: none;

    /* @media (max-width: 768px) {
      position: absolute;
    } */
  }
  & a {
    position: absolute;
    top: 47%;
    left: 90%;
    cursor: pointer;
    font-size: 19px;
    color: gray;
  }

  .rdrCalendarWrapper {
    background: #ffffff;
    box-shadow: 0px 8px 72px rgba(0, 0, 0, 0.15) !important;
    border-radius: 8px;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .rdrDateRangePickerWrapper {
    position: absolute;
    top: 75px;
    border: 0;
    border-radius: 8px;
    background: #fff;
    left: -205px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @media (max-width: 768px) {
      top: 0%;
      background: #fff;
      left: 0%;
      width: 100%;
      position: relative;
    }
  }

  .rdrDefinedRangesWrapper {
    display: none;
  }

  .rdrDateDisplayWrapper {
    display: none;
  }

  .rdrMonthAndYearPickers {
    display: none;
  }

  .rdrMonthAndYearWrapper {
    position: relative;
    top: 59px;
    margin-top: -35px;
  }

  .rdrMonths {
    display: flex;
    width: 90%;
    margin-left: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      margin-left: 0;
    }
  }

  .rdrMonth {
    @media (max-width: 768px) {
      margin: auto;
    }

    @media (max-width: 425px) {
      margin: auto;
      width: 100%;
    }
  }

  .rdrNextPrevButton {
    background: transparent;
  }

  .rdrPprevButton i {
    border-width: 10px 12px 10px 10px;
    border-color: transparent rgb(52, 73, 94) transparent transparent;
    transform: translate(-3px, 0px);
  }

  .rdrNextButton i {
    border-width: 10px 10px 10px 12px;
    border-color: transparent transparent transparent rgb(52, 73, 94);
    transform: translate(3px, 0px);
  }

  .rdrMonthName {
    text-align: center;
    color: black;
    font-family: 'Sofia Pro';
    font-weight: 700;
    font-size: 25px;
  }

  .rdrWeekDay {
    font-family: 'Sofia Pro';
    font-size: 12px;
    font-weight: 700;
    color: #000;
  }

  ​ .rdrDay {
    font-family: 'Sofia Pro';
    color: #000;
    font: icon;
    font-size: 12px;
    width: 31px;
  }

  .rdrSelected,
  .rdrStartEdge,
  .rdrEndEdge {
    background: #f50756;
  }

  .rdrInRange {
    background: #e9edf0 !important;
  }

  .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span {
    color: #091d2c;
  }

  .rdrDayStartPreview,
  .rdrDayInPreview,
  .rdrDayEndPreview {
    border: 0px solid #f50756;
  }

  .rdrDayToday .rdrDayNumber span:after {
    display: none;
  }
`;
