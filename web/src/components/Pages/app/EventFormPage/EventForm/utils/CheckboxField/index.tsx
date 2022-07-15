import { useField } from 'formik';
import React, { useCallback, useRef } from 'react';
import Checked from './checked.svg';
import * as S from './styles';
import Unchecked from './unchecked.svg';

interface Props {
  className?: string;
  afterChange?: (newValue: boolean) => void;
}

const CheckboxField: React.FC<Props> = (props) => {
  const inputRef = useRef();
  const [field] = useField(props);

  const handleOnChange = useCallback(
    (onChangeEvent) => {
      field.onChange(onChangeEvent);
      props.afterChange != null && props.afterChange(onChangeEvent.target.checked);
    },
    [field, props]
  );

  const handleOnContainerClick = useCallback((e) => {
    e.preventDefault();
    inputRef.current.click();
  }, []);

  const { className, disabled, label } = props;

  return (
    <S.Container className={className} onClick={handleOnContainerClick} disabled={!!disabled}>
      <S.CheckboxInput
        type="checkbox"
        {...field}
        disabled={!!disabled}
        checked={!!field.value}
        onChange={handleOnChange}
        ref={inputRef}
      />
      <img src={field.value ? Checked : Unchecked} width="32" height="32" />
      <S.Label>{label}</S.Label>
    </S.Container>
  );
};

export default CheckboxField;
