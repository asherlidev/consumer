import { FormikProps } from 'formik';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { eventFields, useEventForm } from '../FormProvider';
import FormWrapper from '../utils/FormWrapper';
import TextField from '../utils/TextField';
import { DefaultFormProps } from '../utils/types';

const CapacityForm: React.FC<DefaultFormProps> = ({ className, formKey }) => {
  const { fetchedEvent, saveEventValues } = useEventForm();
  const { t } = useTranslation();

  const initialValues = useMemo(
    () => ({
      [eventFields.capacity]: get(fetchedEvent, eventFields.capacity),
    }),
    [fetchedEvent]
  );

  return (
    <FormWrapper
      className={className}
      formKey={formKey}
      formikProps={{
        initialValues,
        validationSchema: Yup.object({
          [eventFields.capacity]: Yup.number()
            .integer()
            .min(0)
            .required(t('eventForms.general.required')),
        }),
        onSubmit: saveEventValues,
      }}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <TextField
          name={eventFields.capacity}
          type="number"
          label={t('eventForms.capacity.fields.capacity.label')}
          placeholder={t('eventForms.capacity.fields.capacity.placeholder')}
          disabled={isSubmitting}
        />
      )}
    </FormWrapper>
  );
};

export default CapacityForm;
