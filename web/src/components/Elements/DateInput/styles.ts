import styled from 'styled-components';
import colors from '../../../constants/colors';

export const Container = styled.div<{
  margin: string | undefined;
  darkMode: boolean;
  boldLabel: boolean;
}>`
  text-align: left;
  margin-top: ${(props) => (props.margin ? props.margin : '10px')};
  margin-bottom: ${(props) => (props.margin ? props.margin : '10px')};

  & > label {
    margin: 0px;
    font-weight: 500;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: ${(props) => (props.darkMode ? '#fff' : '#091d2c')};
    font-weight: ${(props) => (props.boldLabel ? '600' : '500')};
  }

  input {
    border: none;
    border-radius: 16px !important;
    background-color: #f2f2f2;
    width: 100%;
    margin-left: 0px;
    padding: 20px;
    height: 52px;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker.react-datepicker {
    font-size: 1em;
    border-color: #e7e7e7;

    .react-datepicker__day--selected,
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range,
    .react-datepicker__month-text--selected,
    .react-datepicker__month-text--in-selecting-range,
    .react-datepicker__month-text--in-range,
    .react-datepicker__quarter-text--selected,
    .react-datepicker__quarter-text--in-selecting-range,
    .react-datepicker__quarter-text--in-range,
    .react-datepicker__time-list-item--selected,
    .react-datepicker__day--keyboard-selected {
      background-color: ${colors.primary} !important;
      color: ${colors.white} !important;
    }

    .react-datepicker__day--keyboard-selected,
    .react-datepicker__month-text--keyboard-selected,
    .react-datepicker__quarter-text--keyboard-selected {
      background-color: #fa20697a !important;
      color: ${colors.white} !important;
    }

    .react-datepicker__triangle {
      border-bottom-color: #f2f2f2;

      ::before {
        border-bottom-color: #e7e7e7;
      }
    }
    .react-datepicker__header {
      padding-top: 0.8em;
      background-color: #f2f2f2;
      border-bottom-color: #e7e7e7;
    }
    .react-datepicker__month {
      margin: 0.4em 1em;
    }
    .react-datepicker__day-name,
    .react-datepicker__day {
      width: 1.9em;
      line-height: 1.9em;
      margin: 0.166em;
      color: #091d2c;
    }
    .react-datepicker__current-month {
      font-size: 1em;
    }
    .react-datepicker__navigation {
      top: 1em;
      line-height: 1.7em;
      border: 0.45em solid transparent;
    }
    .react-datepicker__navigation--previous {
      border-right-color: #ccc;
      left: 1em;
    }
    .react-datepicker__navigation--next {
      border-left-color: #ccc;
      right: 1em;
      left: 220px;
    }
    .react-datepicker__time-container {
      width: 6em;
      border-left-color: #e7e7e7;
    }
    .react-datepicker-time__header {
      font-size: 1em;
    }
    .react-datepicker-time__header--time {
      padding-left: 0px;
      padding-right: 0px;
    }
    .react-datepicker__time-box {
      margin-left: 0px;
      margin-right: 0px;
      width: 100%;
    }
    .react-datepicker__time-list {
      padding: 0;
    }
    .react-datepicker__time-name {
      color: #091d2c;
    }
  }
`;
