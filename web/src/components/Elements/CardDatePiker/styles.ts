import styled from 'styled-components';
import colors from '../../../constants/colors';

export const Container = styled.div<{
  margin: string | undefined;
  darkMode: boolean;
  boldLabel: boolean;
  border?: string;
}>`
  display: flex;
  /* margin-right: 10px; */
  position: relative;
  border: ${(props) => props.border || '1px solid rgba(9, 29, 44, 0.3)'};
  border-radius: 8px;
  z-index: 4;
  overflow: visible;
  background: ${colors.white};

  @media (max-width: 768px) {
    display: block;
  }

  & label {
    z-index: 1;
    position: absolute;
    left: 19px;
    bottom: 1px;
    letter-spacing: 0.31em;
    text-transform: uppercase;
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
    font-size: 16px;
    padding: 32px 20px 10px 20px;
    min-width: 230px;
    width: 100%;
    display: flex;
    outline: none;
    border: none;
    color: ${colors.darkGray};

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

  .react-datepicker-popper[data-placement^='bottom'] {
    max-width: 100%;
  }

  .react-datepicker {
    font-family: 'Sofia Pro';
    border: none;
    border-radius: 16px;
    padding: 14px;
    overflow: hidden;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    width: 100%;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__header {
    background-color: ${colors.white};
  }

  .react-datepicker__time-container {
    display: none;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: ${colors.textDefault};
    width: 4.7rem;
    padding: 1rem;
    line-height: 2.7rem;
    margin: 0.166rem;
    font-size: 15px;
    font-family: 'Sofia Pro';
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    margin-top: 0;
    color: ${colors.darkGray};
    font-weight: 500;
    font-family: 'Sofia Pro';
    font-size: 18px;
    padding: 14px 0;
    text-align: start;
    margin-left: 22px;
  }
  .react-datepicker__navigation {
    top: 28px;
  }

  .react-datepicker__navigation--next {
    right: 8%;
  }

  .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 8%;
  }

  .react-datepicker__navigation--previous {
    left: 75%;
    border-right-color: #ccc;
  }

  .react-datepicker__header {
    border-bottom: none;
    padding-bottom: 8px;
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background-color: ${colors.error};
    color: #fff;
    border-radius: 50%;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    background-color: ${colors.error};
    color: #fff;
    border-radius: 50%;
  }

  /* .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: ${colors.error};
    color: #fff;
  } */

  @media (max-width: 600px) {
    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
      width: 2.7rem;
      padding: 0;
    }
  }
`;
