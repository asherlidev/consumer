import { FormikProps } from 'formik';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useEventPreview } from '../EventPreviewProvider';
import { eventFields, useEventForm } from '../FormProvider';
import CheckboxField from '../utils/CheckboxField';
import FormWrapper from '../utils/FormWrapper';
import { DefaultFormProps } from '../utils/types';

const StatusForm: React.FC<DefaultFormProps> = ({ className, formKey }) => {
  const { fetchedEvent, saveEventValues } = useEventForm();
  const { eventPreview, setEventPreview } = useEventPreview();
  const { t } = useTranslation();

  const initialValues = useMemo(
    () => ({
      [eventFields.isActive]: get(fetchedEvent, eventFields.isActive) || false,
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
          [eventFields.isActive]: Yup.boolean(),
        }),
        onSubmit: saveEventValues,
      }}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <CheckboxField
          name={eventFields.isActive}
          type="checkbox"
          label={t('eventForms.status.fields.isActive.label')}
          disabled={isSubmitting}
          afterChange={(newValue: boolean) => {
            setEventPreview({
              ...eventPreview,
              checkbox: newValue,
            });
          }}
        />
      )}
    </FormWrapper>
  );
};

export default StatusForm;
