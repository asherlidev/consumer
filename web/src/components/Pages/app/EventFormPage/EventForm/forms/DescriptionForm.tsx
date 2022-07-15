import { FormikProps } from 'formik';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { eventFields, useEventForm } from '../FormProvider';
import FormWrapper from '../utils/FormWrapper';
import TextField from '../utils/TextField';
import { DefaultFormProps } from '../utils/types';

const DescriptionForm: React.FC<DefaultFormProps> = ({ className, formKey }) => {
  const { fetchedEvent, saveEventValues } = useEventForm();
  const { t } = useTranslation();

  const initialValues = useMemo(
    () => ({
      [eventFields.description]: get(fetchedEvent, eventFields.description) || '',
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
          [eventFields.description]: Yup.string().required(t('eventForms.general.required')),
        }),
        onSubmit: saveEventValues,
      }}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <TextField
          label={t('eventForms.description.fields.description.label')}
          placeholder={t('eventForms.description.fields.description.placeholder')}
          name={eventFields.description}
          textArea
          rows={10}
          disabled={isSubmitting}
        />
      )}
    </FormWrapper>
  );
};

export default DescriptionForm;
