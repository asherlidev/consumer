import { FormikProps } from 'formik';
import { cloneDeep, filter, forEach, get, head, map } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import * as http from '../../../../../../utils/httpClient';
import { eventFields, useEventForm } from '../FormProvider';
import FormWrapper from '../utils/FormWrapper';
import ImagesField from '../utils/ImagesField';
import TextField from '../utils/TextField';
import { DefaultFormProps } from '../utils/types';

const GalleryForm: React.FC<DefaultFormProps> = ({ className, formKey }) => {
  const { fetchedEvent, saveEventValues } = useEventForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const { t } = useTranslation();

  const initialValues = useMemo(
    () => ({
      [eventFields.videoUrl]: get(fetchedEvent, eventFields.videoUrl) || '',
      [eventFields.coverImage]: get(fetchedEvent, eventFields.coverImage),
      [eventFields.gallery]: get(fetchedEvent, eventFields.gallery),
    }),
    [fetchedEvent]
  );

  const handleOnSubmit = useCallback(
    async (formValues) => {
      const formValuesToPersist = cloneDeep(formValues);

      try {
        if (
          formValues[eventFields.coverImage] &&
          formValues[eventFields.coverImage].__typename !== 'UploadFile'
        ) {
          // Can only be done using graphql from strapi v3.0.0-beta.17.3 onwards, see https://github.com/strapi/strapi/pull/4294
          const uploadData = new FormData();

          uploadData.append('ref', 'festival');
          uploadData.append('files', formValues[eventFields.coverImage]);
          uploadData.append('refId', fetchedEvent.id);
          uploadData.append('field', eventFields.coverImage);

          http.clearDefaultHeader('Content-Type');

          const { promise } = http.customFetch<any>(`${process.env.GATSBY_STRAPI_API_URL}/upload`, {
            method: 'POST',
            body: uploadData,
          });

          const uploadedImages = await promise;

          http.setDefaultHeader('Content-Type', http.defaultContentType);

          const { id, url } = head(uploadedImages);

          formValues[eventFields.coverImage] = { id, url, __typename: 'UploadFile' };
        }

        formValuesToPersist[eventFields.coverImage] =
          get(formValues[eventFields.coverImage], 'id') || null;

        const galleryImagesToUpload = filter(
          formValues[eventFields.gallery],
          (image) => image.__typename !== 'UploadFile'
        );

        if (galleryImagesToUpload.length > 0) {
          // Can only be done using graphql from strapi v3.0.0-beta.17.3 onwards, see https://github.com/strapi/strapi/pull/4294
          const uploadData = new FormData();
          forEach(galleryImagesToUpload, (file) => {
            uploadData.append('files', file);
          });
          uploadData.append('ref', 'festival');
          uploadData.append('refId', fetchedEvent.id);
          uploadData.append('field', eventFields.gallery);

          http.clearDefaultHeader('Content-Type');

          const { promise } = http.customFetch<any>(`${process.env.GATSBY_STRAPI_API_URL}/upload`, {
            method: 'POST',
            body: uploadData,
          });

          const uploadedImages = await promise;

          http.setDefaultHeader('Content-Type', http.defaultContentType);

          let uploadedImageIndex = 0;

          formValues[eventFields.gallery] = map(formValues[eventFields.gallery], (image) => {
            if (image.__typename === 'UploadFile') {
              return image;
            }
            const { id, url } = uploadedImages[uploadedImageIndex];
            uploadedImageIndex++;
            return { id, url, __typename: 'UploadFile' };
          });
        }

        formValuesToPersist[eventFields.gallery] = map(formValues[eventFields.gallery], 'id');

        await saveEventValues(formValuesToPersist);
      } catch (e) {
        console.error(e);
        setErrorMessage(t('eventForms.general.somethingWentWrong'));
      }
    },
    [saveEventValues, fetchedEvent, t]
  );

  return (
    <FormWrapper
      className={className}
      formKey={formKey}
      error={errorMessage}
      formikProps={{
        initialValues,
        validationSchema: Yup.object({
          [eventFields.videoUrl]: Yup.string()
            .url()
            .nullable()
            .test(
              'is-youtube-url',
              t('eventForms.gallery.fields.videoUrl.youtubeValidationError'),
              (url) => {
                // https://regexr.com/531i0
                const regexMatch = url.match(/(?:\/|%3D|v=|vi=)([0-9A-z-_]{11})(?:[%#?&]|$)/);
                return regexMatch && regexMatch.length > 1;
              }
            ),
          [eventFields.coverImage]: Yup.string().nullable(),
          [eventFields.gallery]: Yup.array().of(Yup.string()),
        }),
        onSubmit: handleOnSubmit,
      }}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <>
          <ImagesField
            name={eventFields.coverImage}
            maxFileSizeInMb={MAX_FILE_SIZE_IN_MB}
            label={t('eventForms.gallery.fields.coverImage.label')}
            disabled={isSubmitting}
          />
          <ImagesField
            name={eventFields.gallery}
            multiple
            maxFileSizeInMb={MAX_FILE_SIZE_IN_MB}
            label={t('eventForms.gallery.fields.gallery.label')}
            disabled={isSubmitting}
          />
          <TextField
            name={eventFields.videoUrl}
            type="text"
            label={t('eventForms.gallery.fields.videoUrl.label')}
            placeholder={t('eventForms.gallery.fields.videoUrl.placeholder')}
            disabled={isSubmitting}
          />
        </>
      )}
    </FormWrapper>
  );
};

export default GalleryForm;

//
// Utils
//

const MAX_FILE_SIZE_IN_MB = 10;
