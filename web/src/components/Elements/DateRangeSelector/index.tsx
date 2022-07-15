import React, { useEffect, useRef, useState } from 'react';
import { DateRangePicker, OnChangeProps } from 'react-date-range';
import * as S from './styles';
import format from 'date-fns/format';

interface Ranges {
  startDate?: Date;
  endDate?: Date;
  key?: string;
}

interface Props {
  className?: string;
  isOpen?: boolean;
  setIsOpen: (bool: boolean) => void;
  ranges?: Ranges[];
  onChange?: (range: OnChangeProps) => void;
  top?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
  dateFormat?: string;
  onInputClear?: any;
  minDate?: Date | number;
}

const DateInputSearch: React.FC<Props> = ({
  className,
  ranges,
  onChange,
  isOpen,
  setIsOpen,
  top,
  minDate,
}) => {
  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
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
    <S.Container ref={wrapperRef} className={className} top={top}>
      {isOpen && (
        <DateRangePicker
          ranges={ranges}
          months={2}
          direction="horizontal"
          moveRangeOnFirstSelection={false}
          showSelectionPreview={true}
          onChange={onChange}
          minDate={minDate ? new Date(minDate) : undefined}
        />
      )}
    </S.Container>
  );
};

export default DateInputSearch;
