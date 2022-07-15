import React, { useEffect, useRef, useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import * as S from './styles';
// import format from 'date-fns/format';

interface Props {
  className?: string;
  label?: any;
  placeholder?: string;
  value?: any;
  setValue?: any;
  margin?: string;
  darkMode?: boolean;
  boldLabel?: boolean;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
  dateFormat?: string;
  onInputClear?: any;
  border?: string;
}

const CardDatePiker: React.FC<Props> = ({
  className,
  label,
  placeholder,
  margin,
  value,
  setValue,
  darkMode = false,
  boldLabel = false,
  timeFormat = 'HH:mm',
  timeIntervals = 15,
  dateFormat = 'MMM dd',
  onInputClear,
  border,
  ...otherProps
}) => {
  const [open, setOpen] = useState(false);

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <S.Container
      ref={wrapperRef}
      margin={margin}
      darkMode={darkMode}
      boldLabel={boldLabel}
      className={className}
      border={border}
    >
      {label && <label>{label}</label>}
      {/* <input
        placeholder={placeholder}
        onFocus={() => setOpen(!open)}
        readOnly
        value={value}
      />
      {value ? <a onClick={onInputClear}>x</a> : null}
      {open ? ( */}
      <DatePicker
        selected={value}
        onChange={(date) => setValue(date)}
        showTimeSelect={true}
        placeholderText={placeholder}
        dateFormat="MMMM d, yyyy"
      />
      {/* ) : null} */}
    </S.Container>
  );
};

export default CardDatePiker;
