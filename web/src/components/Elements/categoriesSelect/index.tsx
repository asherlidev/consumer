import React from 'react';
import * as S from './styles';
import Select from 'react-select';

interface Options {
  value?: string;
  label?: string;
}

interface Props {
  className?: string;
  label?: any;
  placeholder?: string;
  options?: Options[];
  value?: any;
  margin?: string;
  darkMode?: boolean;
  boldLabel?: boolean;
  type?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
  dateFormat?: string;
  onChange?: any;
}

const CatogoriesSelect: React.FC<Props> = ({
  className,
  label,
  placeholder,
  options,
  margin,
  darkMode = false,
  boldLabel = false,
  type,
  onChange,
  value,
  ...otherProps
}) => {
  return (
    <S.Container margin={margin} darkMode={darkMode} boldLabel={boldLabel} className={className}>
      {label && <label>{label}</label>}
      <Select placeholder="Add category" options={options} onChange={onChange} value={value} />
    </S.Container>
  );
};

export default CatogoriesSelect;
