import React, { useEffect, useRef, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import * as S from './styles';
import format from 'date-fns/format';

interface Ranges {
  startDate?: Date;
  endDate?: Date;
  key?: string;
}

interface Props extends DateRangePicker {
  className?: string;
  label?: any;
  placeholder?: string;
  value?: any;
  ranges?: Ranges[];
  setRanges?: any;
  margin?: string;
  darkMode?: boolean;
  boldLabel?: boolean;
  type?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
  dateFormat?: string;
  onInputClear?: any;
}

const DateInputSearch: React.FC<Props> = ({
  className,
  label,
  placeholder,
  ranges,
  setRanges,
  margin,
  darkMode = false,
  boldLabel = false,
  type,
  showTimeSelect,
  timeFormat = 'HH:mm',
  timeIntervals = 15,
  dateFormat = 'MMM dd',
  onInputClear,
  children,
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
    >
      {children || (
        <>
          {label && <label>{label}</label>}
          <input
            placeholder={placeholder}
            onFocus={() => setOpen(!open)}
            readOnly
            value={
              ranges && ranges[0].startDate && ranges[0].endDate
                ? `${ranges && ranges[0].startDate && format(ranges[0].startDate, 'MMM dd')} - ${
                    ranges && ranges[0].endDate && format(ranges[0].endDate, 'MMM dd')
                  }`
                : ''
            }
          />
        </>
      )}
      {ranges && ranges[0].startDate && ranges[0].endDate ? <a onClick={onInputClear}>x</a> : null}
      {open ? (
        <DateRangePicker
          ranges={ranges}
          months={2}
          direction="horizontal"
          moveRangeOnFirstSelection={false}
          showSelectionPreview={true}
          onChange={(item: any) => setRanges([item.selection])}
        />
      ) : null}
    </S.Container>
  );
};

export default DateInputSearch;
