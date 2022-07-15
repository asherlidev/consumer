import { gql, useMutation } from '@apollo/client';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useUser } from '../../../../../../context/user/UserProvider';
import fragments from '../../../../../../utils/gqlFragments';
import { PrivateRouteProps } from '../../../../../PrivateRoute';
import CheckboxField from '../../../EventFormPage/EventForm/utils/CheckboxField';
import * as S from './styles';

interface OptInFormValues {
  optIn: boolean;
}

const NewsletterOptInForm: React.FC<PrivateRouteProps> = ({ user }) => {
  const { t } = useTranslation();
  const breakpoints = useBreakpoint();
  const { fetchUser } = useUser();
  const [saveFailed, setSaveFailed] = useState(false);
  const unmounted = useRef(false);

  const [updateUser] = useMutation(gql`
    mutation UpdateUserMutation($input: updateUserInput) {
      updateUser(input: $input) {
        user {
          ...UserDetails
        }
      }
    }
    ${fragments.userDetails}
  `);

  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const onSubmit = useCallback(
    async ({ optIn }: OptInFormValues, formikHelpers: FormikHelpers<OptInFormValues>) => {
      setSaveFailed(false);

      try {
        await updateUser({
          variables: {
            input: {
              where: { id: user.id },
              data: { personalized_newsletter_optIn: optIn },
            },
          },
        });

        fetchUser();
      } catch (e) {
        console.error(e);
        setSaveFailed(true);
      }

      if (!unmounted.current) {
        formikHelpers.setSubmitting(false);
      }
    },
    [fetchUser, updateUser, user.id]
  );

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{ optIn: !!user.personalized_newsletter_optIn }}
      validationSchema={Yup.object().shape({
        optIn: Yup.boolean(),
      })}
    >
      {({ isSubmitting, dirty, submitForm }: FormikProps<OptInFormValues>) => (
        <Form>
          <S.NewsletterHeader isMobile={breakpoints.smDown}>
            <S.NewsletterContent>
              <h5>{t('settingsPage.recommendations.title')}</h5>
              <p>{t('settingsPage.recommendations.description')}</p>
            </S.NewsletterContent>
            <div>
              <CheckboxField
                name="optIn"
                type="checkbox"
                label={t('settingsPage.recommendations.optIn')}
                disabled={isSubmitting}
                afterChange={submitForm}
              />
            </div>
          </S.NewsletterHeader>
          {dirty && saveFailed && (
            <S.FormValidation>
              {t('settingsPage.account.form.notifications.failure')}
            </S.FormValidation>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default NewsletterOptInForm;
