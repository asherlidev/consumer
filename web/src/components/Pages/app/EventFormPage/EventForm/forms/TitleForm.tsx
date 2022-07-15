import { gql, useMutation } from '@apollo/client';
import { FormikProps } from 'formik';
import { navigate } from 'gatsby';
import { get } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import fragments from '../../../../../../utils/gqlFragments';
import { FESTIVAL_BY_SLUG_QUERY, getPartnerQuery } from '../../../../../../utils/gqlQueries';
import { eventFields, forms, useEventForm } from '../FormProvider';
import FormWrapper from '../utils/FormWrapper';
import TextField from '../utils/TextField';
import { DefaultFormProps } from '../utils/types';

const TitleForm: React.FC<DefaultFormProps> = ({ className, formKey }) => {
  const { t } = useTranslation();
  const { isNew, saveEventValues, fetchedEvent, partnerId } = useEventForm();

  const initialValues = useMemo(
    () => ({
      [eventFields.title]: get(fetchedEvent, eventFields.title) || '',
    }),
    [fetchedEvent]
  );

  const [createEvent, { error: createEventError }] = useMutation(CREATE_FESTIVAL_MUTATION);

  const handleOnSubmit = useCallback(
    async (values) => {
      try {
        if (isNew) {
          const response = await createEvent({
            variables: {
              createFestivalInput: {
                data: {
                  ...values,
                  partner: partnerId,
                  [eventFields.isClaimed]: true,
                  [eventFields.isActive]: false,
                },
              },
            },
            update: (cache, { data }) => {
              // Add event to the cache so that the FormProvider will not fetch it and trigger a full-page loading state
              const { event } = data.createEvent;
              cache.writeQuery({
                query: FESTIVAL_BY_SLUG_QUERY,
                variables: { where: { slug_name: event.slug_name } },
                data: { events: [event] },
              });
            },
            // Update partnerQuery request so that the new event immediately shows up when returning to the 'my events' page
            // In theory the new event can be added to what's in the cache already, but it get's cumbersome if the partner is not yet in the cache
            refetchQueries: [getPartnerQuery(partnerId)],
          });

          const newEventSlug = get(response, 'data.createFestival.festival.slug_name');
          if (newEventSlug) {
            navigate(`/app/manage-events/edit/${newEventSlug}/${forms[1].formKey}`, {
              replace: true,
            });
          }
        } else {
          const response = await saveEventValues(values);

          const updatedEventSlug = get(response, 'data.updateFestival.festival.slug_name');
          if (updatedEventSlug && fetchedEvent && updatedEventSlug !== fetchedEvent.slug_name) {
            navigate(`/app/manage-events/edit/${updatedEventSlug}/${forms[1].formKey}`, {
              replace: true,
            });
            // Slugs are currently not updated. To be followed up.
            // More info: https://trello.com/c/HpRJcsD5/88-festival-slug-implementation-allows-duplicates
          }
        }
      } catch (e) {
        console.error(e.message);
      }
    },
    [createEvent, fetchedEvent, isNew, partnerId, saveEventValues]
  );

  return (
    <FormWrapper
      className={className}
      formKey={formKey}
      formikProps={{
        initialValues,
        validationSchema: Yup.object({
          [eventFields.title]: Yup.string().required(t('eventForms.general.required')),
        }),
        onSubmit: handleOnSubmit,
      }}
      error={createEventError && t('eventForms.general.somethingWentWrong')}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <TextField
          type="text"
          name={eventFields.title}
          label={t('eventForms.title.fields.title.label')}
          placeholder={t('eventForms.title.fields.title.placeholder')}
          disabled={isSubmitting}
        />
      )}
    </FormWrapper>
  );
};

export default TitleForm;

//
// Utils
//

const CREATE_FESTIVAL_MUTATION = gql`
  mutation CreateFestivalMutation($createFestivalInput: createFestivalInput) {
    createFestival(input: $createFestivalInput) {
      festival {
        ...FestivalDetails
      }
    }
  }
  ${fragments.festivalDetails}
`;
