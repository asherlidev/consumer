import { FormikProps } from 'formik';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { eventFields, useEventForm } from '../FormProvider';
import FormWrapper from '../utils/FormWrapper';
import TextField from '../utils/TextField';
import { DefaultFormProps } from '../utils/types';

const LocationForm: React.FC<DefaultFormProps> = ({ className, formKey }) => {
  const { fetchedEvent, saveEventValues } = useEventForm();
  const { t } = useTranslation();

  const initialValues = useMemo(
    () => ({
      [eventFields.address]: get(fetchedEvent, eventFields.address) || '',
      [eventFields.city]: get(fetchedEvent, eventFields.city) || '',
      [eventFields.state]: get(fetchedEvent, eventFields.state) || '',
      [eventFields.country]: get(fetchedEvent, eventFields.country) || '',
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
          [eventFields.address]: Yup.string().required(t('eventForms.general.required')),
          [eventFields.city]: Yup.string(),
          [eventFields.state]: Yup.string(),
          [eventFields.country]: Yup.string(),
        }),
        onSubmit: saveEventValues,
      }}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <>
          <TextField
            name={eventFields.address}
            type="text"
            label={t('eventForms.location.fields.address.label')}
            placeholder={t('eventForms.location.fields.address.placeholder')}
            disabled={isSubmitting}
          />
          <TextField
            name={eventFields.city}
            type="text"
            label={t('eventForms.location.fields.city.label')}
            placeholder={t('eventForms.location.fields.city.placeholder')}
            disabled={isSubmitting}
          />
          <TextField
            name={eventFields.state}
            type="text"
            label={t('eventForms.location.fields.state.label')}
            placeholder={t('eventForms.location.fields.state.placeholder')}
            disabled={isSubmitting}
          />
          <TextField
            name={eventFields.country}
            type="text"
            label={t('eventForms.location.fields.country.label')}
            placeholder={t('eventForms.location.fields.country.placeholder')}
            disabled={isSubmitting}
          />
        </>
      )}
    </FormWrapper>
  );
};

export default LocationForm;
