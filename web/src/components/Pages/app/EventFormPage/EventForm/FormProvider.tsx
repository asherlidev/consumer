import { gql, useMutation, useQuery } from '@apollo/client';
import { useMatch } from '@reach/router';
import { navigate } from 'gatsby';
import { every, find, findIndex, get, isArray, isEmpty, last, reduce } from 'lodash';
import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import fragments from '../../../../../utils/gqlFragments';
import { FESTIVAL_BY_SLUG_QUERY } from '../../../../../utils/gqlQueries';
import CapacityForm from './forms/CapacityForm';
import CategoriesForm from './forms/CategoriesForm';
import DateForm from './forms/DateForm';
import DescriptionForm from './forms/DescriptionForm';
import GalleryForm from './forms/GalleryForm';
import LinksForm from './forms/LinksForm';
import LocationForm from './forms/LocationForm';
import StatusForm from './forms/StatusForm';
import TitleForm from './forms/TitleForm';

interface ContextValue {
  fetchedEvent: any;
  fetchingEvent: boolean;
  getFormUrl: (formKey: string) => string;
  goToNextForm: () => void;
  isCurrentFormSavedBefore: boolean;
  isFormDisabled: (formKey: string) => boolean;
  isNew: boolean;
  isLastForm: boolean;
  saveEventValues: (values: any) => Promise<any>; // TODO: update
  saveEventValuesError: string | undefined;
  partnerId: string;
  formKey: string;
}

export const EventFormContext = createContext<ContextValue | undefined>(undefined);

interface Props {
  partnerId: string;
}

const EventFormProvider: React.FC<Props> = ({ partnerId, ...props }) => {
  const { t } = useTranslation();
  const locationMatch = useMatch('/app/manage-events/edit/:slug/:formKey');

  const slug = useMemo(() => locationMatch?.slug || '', [locationMatch?.slug]);
  const formKey = useMemo(() => locationMatch?.formKey || forms[0].formKey, [
    locationMatch?.formKey,
  ]);

  const isNew = useMemo(() => !slug, [slug]);

  const baseUrl = useMemo(() => `/app/manage-events/edit/${slug}`, [slug]);

  const [updateEvent, updateEventMutation] = useMutation(UPDATE_FESTIVAL_MUTATION);

  const eventQuery = useQuery(FESTIVAL_BY_SLUG_QUERY, {
    variables: { where: { slug_name: slug } },
    skip: isNew,
  });

  const fetchedEvent = useMemo(() => get(eventQuery.data, 'festivals[0]'), [eventQuery.data]);

  useEffect(() => {
    if (fetchedEvent && get(fetchedEvent, 'partner.id') !== partnerId) {
      alert(t('eventForms.general.unauthorizedEventFormError'));
      navigate('/', { replace: true });
    }
  }, [fetchedEvent, navigate, partnerId, t]);

  const isSavedBefore = useCallback(
    (formKey) => {
      const formConfig = find(forms, { formKey });
      return (
        !!fetchedEvent &&
        !!formConfig &&
        every(formConfig.requiredFields, (requiredField) => {
          const fieldValue = get(fetchedEvent, requiredField);
          return isArray(fieldValue) ? !isEmpty(fieldValue) : fieldValue != null;
        })
      );
    },
    [fetchedEvent]
  );

  const goToNextForm = useCallback(() => {
    const currentIndex = findIndex(forms, { formKey });
    if (currentIndex < forms.length - 1) {
      const nextFormKey = forms[currentIndex + 1].formKey;
      navigate(`${baseUrl}/${nextFormKey}`);
    }
  }, [formKey, navigate, baseUrl]);

  const isFormDisabled = useCallback(
    (formKey: string): boolean => {
      if (formKey === forms[0].formKey) {
        return false;
      }
      const formIndex = findIndex(forms, { formKey });
      const previousFormKey = formIndex < 1 ? forms[0].formKey : forms[formIndex - 1].formKey;
      return isFormDisabled(previousFormKey) || !isSavedBefore(previousFormKey);
    },
    [isSavedBefore]
  );

  const saveEventValues = useCallback(
    async (updatedValues) => {
      // The if is to prevent this code to be executed without the id being available
      // That shouldn't happen but now it's programmatically protected
      if (fetchedEvent) {
        // Replace empty strings with null so that the value gets deleted.
        // Empty strings are a side effect or form input mechanics.
        const data = reduce(
          updatedValues,
          (result, value, key) => ({
            ...result,
            [key]: value === '' || value === 0 ? null : value, // TODO: evaluate if this works for all fields. Better solution would be https://github.com/jaredpalmer/formik/issues/568#issuecomment-577262529 but not yet available
          }),
          {}
        );

        const response = await updateEvent({
          variables: {
            input: { where: { id: fetchedEvent.id }, data },
          },
        });

        if (!isNew && !isSavedBefore(formKey)) {
          goToNextForm();
        }

        return response;
      }
      return null;
    },
    [formKey, fetchedEvent, goToNextForm, isNew, isSavedBefore, updateEvent]
  );

  const isLastForm = useMemo(() => {
    const lastForm = last(forms);
    return lastForm?.formKey === formKey;
  }, [formKey]);

  const contextValue = useMemo(
    () => ({
      fetchedEvent,
      fetchingEvent: !fetchedEvent && eventQuery.loading,
      getFormUrl: (formKey: string) => `${baseUrl}/${formKey}`,
      goToNextForm,
      isCurrentFormSavedBefore: isSavedBefore(formKey),
      isFormDisabled,
      isNew,
      isLastForm,
      saveEventValues,
      saveEventValuesError: updateEventMutation.error,
      partnerId,
      formKey,
    }),
    [
      fetchedEvent,
      eventQuery.loading,
      goToNextForm,
      isSavedBefore,
      formKey,
      isFormDisabled,
      isNew,
      isLastForm,
      saveEventValues,
      updateEventMutation.error,
      partnerId,
      baseUrl,
    ]
  );

  return <EventFormContext.Provider value={contextValue} {...props} />;
};

export const useEventForm = (): ContextValue => {
  const value = useContext(EventFormContext);
  if (value === undefined) {
    throw new Error('useEventForm must be used inside a EventFormProvider');
  }
  return value;
};

export default EventFormProvider;

//
// Utils
//

export const eventFields = {
  slug: 'slug_name', // automatically generated by the backend
  title: 'name',
  description: 'description', // as text in markdown
  categories: 'festivalcategories', // as ID's of the Interest model
  capacity: 'capacity', // positive integer
  website: 'website_url',
  facebook: 'facebook_url',
  address: 'address', // e.g. 216 Union Street, Seattle, WA 98101
  city: 'city', // e.g. Seattle
  state: 'state', // e.g. WA
  country: 'country', // e.g. United States
  start: 'start',
  end: 'end',
  isActive: 'isActive', // e.g. true
  isClaimed: 'isClaimed', // e.g. true
  gallery: 'gallery', // send array of id's to persist, but receive array of { id, url, __typename: 'UploadFile'}
  coverImage: 'cover_image', // send id or null to persist, but receive { id, url, __typename: 'UploadFile'} or null
  videoUrl: 'video_url', // e.g. https://www.youtube.com/watch?v=hvIg3PTJWxs
};

export const forms = [
  {
    formKey: 'title',
    component: TitleForm,
    requiredFields: [eventFields.title],
  },
  {
    formKey: 'description',
    component: DescriptionForm,
    requiredFields: [eventFields.description],
  },
  {
    formKey: 'categories',
    component: CategoriesForm,
    requiredFields: [eventFields.categories],
  },
  {
    formKey: 'location',
    component: LocationForm,
    requiredFields: [eventFields.address],
  },
  {
    formKey: 'date',
    component: DateForm,
    requiredFields: [eventFields.start, eventFields.end],
  },
  {
    formKey: 'links',
    component: LinksForm,
    requiredFields: [eventFields.slug], // Not really part of the form, but used to bypass the required fields
  },
  {
    formKey: 'capacity',
    component: CapacityForm,
    requiredFields: [eventFields.capacity],
  },
  {
    formKey: 'status',
    component: StatusForm,
    requiredFields: [],
  },
  {
    formKey: 'gallery',
    component: GalleryForm,
    requiredFields: [],
  },
];

const UPDATE_FESTIVAL_MUTATION = gql`
  mutation UpdateFestivalMutation($input: updateFestivalInput) {
    updateFestival(input: $input) {
      festival {
        ...FestivalDetails
      }
    }
  }
  ${fragments.festivalDetails}
`;
