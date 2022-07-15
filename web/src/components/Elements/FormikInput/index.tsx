import { FieldInputProps, FormikState } from 'formik';
import React, { useCallback } from 'react';
import Input from '../Input';
import * as S from './styles';

interface Props {
  className?: string;
  id?: string;
  field: FieldInputProps<any>;
  form: FormikState<any>;
  label?: string;
  helperText?: string;
  gutterBottom?: string | number;
  isPhone?: boolean;
}

const FormikInput: React.FC<Props> = ({
  className,
  id,
  field,
  form: { touched, errors, setFieldValue },
  label,
  helperText,
  gutterBottom,
  isPhone,
  ...otherProps
}) => {
  const error = touched[field.name] && errors[field.name];
  const hasError = Boolean(error);

  const onPhoneChange = useCallback(
    (phoneNumber: string) => {
      setFieldValue(field.name, phoneNumber);
    },
    [field.name, setFieldValue]
  );

  return (
    <S.Container gutterBottom={gutterBottom} className={className}>
      {label && <S.Label htmlFor={id || field.name}>{label}</S.Label>}
      {isPhone ? (
        <S.PhoneInput id={id || field.name} {...field} onChange={onPhoneChange} {...otherProps} />
      ) : (
        <Input id={id || field.name} {...field} {...otherProps} />
      )}

      {(helperText || hasError) && (
        <S.HelperText error={hasError}>{hasError ? error : helperText}</S.HelperText>
      )}
    </S.Container>
  );
};

export default FormikInput;
