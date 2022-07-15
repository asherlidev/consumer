import { FormikProps } from 'formik';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Input } from '../../../../../Elements';
import { eventFields, useEventForm } from '../FormProvider';
import FormWrapper from '../utils/FormWrapper';
import TextField from '../utils/TextField';
import { DefaultFormProps } from '../utils/types';

const LinksForm: React.FC<DefaultFormProps> = ({ className, formKey }) => {
  const { fetchedEvent, saveEventValues } = useEventForm();
  const { t } = useTranslation();

  const initialValues = useMemo(
    () => ({
      [eventFields.website]: get(fetchedEvent, eventFields.website) || '',
      [eventFields.facebook]: get(fetchedEvent, eventFields.facebook) || '',
    }),
    [fetchedEvent]
  );

  const eventPageUrl = useMemo(() => {
    const slug = get(fetchedEvent, eventFields.slug);
    return slug ? `https://festivalpass.com/events/${slug}` : '';
  }, [fetchedEvent]);

  return (
    <FormWrapper
      className={className}
      formKey={formKey}
      formikProps={{
        initialValues,
        validationSchema: Yup.object({
          [eventFields.website]: Yup.string().url(),
          [eventFields.facebook]: Yup.string().url(),
        }),
        onSubmit: saveEventValues,
      }}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <>
          <TextField
            name={eventFields.website}
            type="text"
            label={t('eventForms.links.fields.website.label')}
            placeholder={t('eventForms.links.fields.website.placeholder')}
            disabled={isSubmitting}
          />
          <TextField
            name={eventFields.facebook}
            type="text"
            label={t('eventForms.links.fields.facebook.label')}
            placeholder={t('eventForms.links.fields.facebook.placeholder')}
            disabled={isSubmitting}
          />
          <Input
            label={t('eventForms.links.fields.festivalPassUrl.label')}
            type="text"
            value={eventPageUrl}
            readOnly
            disabled
          />
        </>
      )}
    </FormWrapper>
  );
};

export default LinksForm;
