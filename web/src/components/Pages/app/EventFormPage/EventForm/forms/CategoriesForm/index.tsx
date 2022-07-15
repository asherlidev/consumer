import { useQuery } from '@apollo/client';
import { FieldArray, FormikProps } from 'formik';
import { get, map } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { CATEGORIES_QUERY } from '../../../../../../../utils/gqlQueries';
import { CategoryTag } from '../../../../../../Elements';
import { Loading } from '../../../../../../Elements/Loading';
import { useEventPreview } from '../../EventPreviewProvider';
import { eventFields, useEventForm } from '../../FormProvider';
import FormWrapper from '../../utils/FormWrapper';
import { DefaultFormProps } from '../../utils/types';
import * as S from './styles';

const CategoriesForm: React.FC<DefaultFormProps> = ({ className, formKey }) => {
  const { saveEventValues, fetchedEvent } = useEventForm();
  const { eventPreview, setEventPreview } = useEventPreview();
  const { data, loading: loadingCategories, error: loadCategoriesError } = useQuery(
    CATEGORIES_QUERY
  ); // TODO: add types
  const { t } = useTranslation();

  const initialValues = useMemo(
    () => ({
      [eventFields.categories]: map(get(fetchedEvent, eventFields.categories) || [], 'id'),
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
          [eventFields.categories]: Yup.array()
            .of(Yup.string())
            .required(t('eventForms.general.required')), // TODO: verify if this prevents submitting an empty array
        }),
        onSubmit: saveEventValues,
      }}
      error={loadCategoriesError && t('eventForms.general.somethingWentWrong')}
      disabled={loadingCategories || !!loadCategoriesError}
    >
      {({ isSubmitting, values }: FormikProps<any>) => {
        if (loadCategoriesError) {
          return null;
        }

        return (
          <FieldArray
            name={eventFields.categories}
            render={(arrayHelpers) => (
              <S.CategoriesContainer>
                {!data || loadingCategories ? (
                  <S.LoadingContainer>
                    <Loading />
                  </S.LoadingContainer>
                ) : (
                  data.categories.map(({ id, name }) => {
                    const categoryIndex = values[eventFields.categories].indexOf(id);
                    const selected = categoryIndex > -1;
                    return (
                      <CategoryTag
                        key={id}
                        selected={selected}
                        disabled={isSubmitting}
                        onClick={() => {
                          if (!isSubmitting) {
                            if (selected) {
                              arrayHelpers.remove(categoryIndex);
                              setEventPreview({
                                ...eventPreview,
                                [eventFields.categories]: get(
                                  eventPreview,
                                  eventFields.categories,
                                  []
                                ).filter((category) => category.id !== id),
                              });
                            } else {
                              arrayHelpers.push(id);
                              setEventPreview({
                                ...eventPreview,
                                [eventFields.categories]: [
                                  ...get(eventPreview, eventFields.categories, []),
                                  { id },
                                ],
                              });
                            }
                          }
                        }}
                      >
                        {name}
                        <span>abc</span>
                      </CategoryTag>
                    );
                  })
                )}
              </S.CategoriesContainer>
            )}
          />
        );
      }}
    </FormWrapper>
  );
};

export default CategoriesForm;
