import React from 'react';
import * as S from './styles';
import AsyncSelect from 'react-select/async';

interface Options {
  value: string;
  label: string;
}

interface Props {
  className?: string;
  label?: any;
  placeholder?: string;
  options?: (inputValue: string) => Promise<unknown>;
  value?: any;
  margin?: string;
  darkMode?: boolean;
  boldLabel?: boolean;
  type?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
  dateFormat?: string;
  onchange?: any;
}

const LocationSearch: React.FC<Props> = ({
  className,
  label,
  placeholder,
  options,
  margin,
  darkMode = false,
  boldLabel = false,
  type,
  value,
  onchange,
  ...otherProps
}) => {
  return (
    <S.Container margin={margin} darkMode={darkMode} boldLabel={boldLabel} className={className}>
      {label && <label>{label}</label>}
      <AsyncSelect
        placeholder="Add Location"
        cacheOptions
        defaultOptions
        loadOptions={options}
        onChange={onchange}
        value={value}
      />
    </S.Container>
  );
};

export default LocationSearch;
