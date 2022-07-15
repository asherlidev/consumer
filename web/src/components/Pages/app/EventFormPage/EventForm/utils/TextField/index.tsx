import { FieldConfig, useField } from 'formik';
import React, { Fragment, useCallback } from 'react';
import { Input } from '../../../../../../Elements';
import { useEventPreview } from '../../EventPreviewProvider';
import { ErrorMessage } from '../styles';

const TextField = (props: FieldConfig<any>) => {
  const [field, meta] = useField(props);
  const { eventPreview, setEventPreview } = useEventPreview();

  const handleOnChange = useCallback(
    (onChangeEvent) => {
      field.onChange(onChangeEvent);
      setEventPreview({
        ...eventPreview,
        [onChangeEvent.target.name]: onChangeEvent.target.value,
      });
    },
    [eventPreview, field, setEventPreview]
  );

  return (
    <Fragment>
      <Input {...field} {...props} onChange={handleOnChange} />
      {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </Fragment>
  );
};

export default TextField;
