import { FieldInputProps, useField } from 'formik';
import React, { useCallback } from 'react';
import { Maybe } from '../../../../../../../../graphql-types';
import DateInput from '../../../../../../Elements/DateInput';
import { useEventPreview } from '../../EventPreviewProvider';
import { ErrorMessage } from '../styles';

const DateField = (props: FieldInputProps<any>) => {
  const [field, meta] = useField(props);
  const { eventPreview, setEventPreview } = useEventPreview();

  const handleOnChange = useCallback(
    (date: Maybe<Date>, event: React.SyntheticEvent<any> | undefined): void => {
      field.onChange({ target: { ...field, value: date } }); // Because this method expects an argument of type React.ChangeEvent<HTMLInputElement>
      setEventPreview({
        ...eventPreview,
        [field.name]: date,
      });
    },
    [eventPreview, field, setEventPreview]
  );

  return (
    <>
      <DateInput {...field} {...props} onChange={handleOnChange} />
      {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </>
  );
};

export default DateField;
