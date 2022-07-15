import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Input from './../Input/index';
import { useTranslation } from 'react-i18next';

interface Ranges {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface Props {
  className?: string;
  label?: any;
  placeholder?: string;
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
  min?: number;
  max?: number;
  onChange?: (val: number[]) => void;
  value?: number[];
  minValue?: number;
  maxValue?: number;
  clear?: any;
  onClickSaveHandler?: any;
  inputValue?: string;
  setInputValue?: any;
}

const CreditsInputSearch: React.FC<Props> = ({
  className,
  label,
  placeholder,
  margin,
  darkMode = false,
  boldLabel = false,
  min = 0,
  max = 1000,
  onChange,
  value,
  minValue,
  maxValue,
  clear,
  type,
  showTimeSelect,
  timeFormat = 'HH:mm',
  timeIntervals = 15,
  dateFormat = 'MMM dd',
  onClickSaveHandler,
  inputValue,
  setInputValue,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  // const [inputValue, setInputValue] = useState<string>('');

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

  const onSaveCatagories = () => {
    setInputValue(`${minValue}-${maxValue}`);
    setOpen(false);
    onClickSaveHandler();
  };

  const onClearCategories = () => {
    setInputValue('');
    clear();
  };

  console.log(inputValue);

  return (
    <S.Container
      ref={wrapperRef}
      margin={margin}
      darkMode={darkMode}
      boldLabel={boldLabel}
      className={className}
    >
      {label && <label>{label}</label>}
      <input
        placeholder={placeholder}
        onFocus={() => setOpen(!open)}
        value={inputValue !== '0-1000' ? inputValue : ''}
        readOnly
      />
      {open ? (
        <S.RangeMainContainer>
          <S.RangeContainer>
            <Range min={min} max={max} onChange={onChange} value={value} />
          </S.RangeContainer>
          <S.Inputs>
            <S.InputContainer>
              <Input label={t('search.creditsRange.min')} type="text" value={minValue} readOnly />
            </S.InputContainer>
            <S.Arrow>-</S.Arrow>
            <S.InputContainer>
              <Input label={t('search.creditsRange.max')} type="text" value={maxValue} readOnly />
            </S.InputContainer>
          </S.Inputs>
          <S.ButtonContainer>
            <S.ClearButton onClick={onClearCategories}>
              {t('search.creditsRange.clear')}
            </S.ClearButton>
            <S.SaveButton onClick={onSaveCatagories}>{t('search.creditsRange.save')}</S.SaveButton>
          </S.ButtonContainer>
        </S.RangeMainContainer>
      ) : null}
    </S.Container>
  );
};

export default CreditsInputSearch;
