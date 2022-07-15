import React from 'react';
import DatePicker from 'react-datepicker';
import * as S from './styles';

interface Props extends DatePicker {
  className?: string;
  label?: any;
  placeholder?: string;
  value: any;
  margin?: string;
  darkMode?: boolean;
  boldLabel?: boolean;
  type?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
  dateFormat?: string;
}

const DateInput: React.FC<Props> = ({
  className,
  label,
  placeholder,
  value,
  margin,
  darkMode = false,
  boldLabel = false,
  type,
  showTimeSelect,
  timeFormat = 'HH:mm',
  timeIntervals = 15,
  dateFormat = 'MMM dd, HH:mm',
  ...otherProps
}) => (
  <S.Container margin={margin} darkMode={darkMode} boldLabel={boldLabel} className={className}>
    {label && <label>{label}</label>}
    <DatePicker
      selected={value}
      showTimeSelect={showTimeSelect != null ? type === 'datetime' : showTimeSelect}
      timeFormat={timeFormat}
      timeIntervals={timeIntervals}
      dateFormat={dateFormat}
      placeholderText={placeholder}
      {...otherProps}
    />
  </S.Container>
);

export default DateInput;
