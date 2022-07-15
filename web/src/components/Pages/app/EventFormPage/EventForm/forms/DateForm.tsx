import { FormikProps } from 'formik';
import { get } from 'lodash';
import React, { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { eventFields, useEventForm } from '../FormProvider';
import DateField from '../utils/DateField';
import FormWrapper from '../utils/FormWrapper';
import { DefaultFormProps } from '../utils/types';

const DateForm: React.FC<DefaultFormProps> = ({ className, formKey }) => {
  const { fetchedEvent, saveEventValues } = useEventForm();
  const { t } = useTranslation();

  const initialValues = useMemo(() => {
    const start = get(fetchedEvent, eventFields.start);
    const end = get(fetchedEvent, eventFields.end);
    return {
      [eventFields.start]: start ? new Date(start) : null,
      [eventFields.end]: end ? new Date(end) : null,
    };
  }, [fetchedEvent]);

  return (
    <FormWrapper
      className={className}
      formKey={formKey}
      formikProps={{
        initialValues,
        validationSchema: Yup.object({
          [eventFields.start]: Yup.date().nullable().required(t('eventForms.general.required')),
          [eventFields.end]: Yup.date().nullable().required(t('eventForms.general.required')),
        }),
        onSubmit: saveEventValues,
      }}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <Fragment>
          <DateField
            label={t('eventForms.date.fields.start.label')}
            placeholder={t('eventForms.date.fields.start.placeholder')}
            type="datetime"
            name={eventFields.start}
            disabled={isSubmitting}
          />
          <DateField
            label={t('eventForms.date.fields.end.label')}
            placeholder={t('eventForms.date.fields.end.placeholder')}
            type="datetime"
            name={eventFields.end}
            disabled={isSubmitting}
          />
        </Fragment>
      )}
    </FormWrapper>
  );
};

export default DateForm;
