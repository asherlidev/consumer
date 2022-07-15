import { gql, useMutation } from '@apollo/client';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { pick } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { User, useUser } from '../../../../../../context/user/UserProvider';
import fragments from '../../../../../../utils/gqlFragments';
import { Btn, FormikInput } from '../../../../../Elements';
import * as S from './styles';

interface AccountFormValues {
  first_name: string;
  last_name: string;
  email: string;
  zipcode: string;
}

interface Props {
  user: User;
}

const AccountForm: React.FC<Props> = ({ user }) => {
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

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const initialValues: AccountFormValues = useMemo(
    () => pick(user, ['first_name', 'last_name', 'email', 'zipcode']),
    [user]
  );

  const onSubmit = useCallback(
    async (data: AccountFormValues, formikHelpers: FormikHelpers<AccountFormValues>) => {
      setSaveFailed(false);

      try {
        await updateUser({
          variables: {
            input: {
              where: { id: user.id },
              data,
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
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          first_name: Yup.string().required(t('eventForms.general.required')),
          last_name: Yup.string().required(t('eventForms.general.required')),
          email: Yup.string()
            .email(t('common.emailField.errorMessages.email'))
            .required(t('common.emailField.errorMessages.required')),
        })}
      >
        {({ isSubmitting, dirty }: FormikProps<AccountFormValues>) => (
          <Form>
            <S.Grid>
              <Field
                label={t('settingsPage.account.form.fields.firstName.label')}
                id="first_name"
                name="first_name"
                component={FormikInput}
                disabled={isSubmitting}
                placeholder={t('settingsPage.account.form.fields.firstName.placeholder')}
                gutterBottom
              />
              <Field
                label={t('settingsPage.account.form.fields.lastName.label')}
                name="last_name"
                component={FormikInput}
                disabled={isSubmitting}
                placeholder={t('settingsPage.account.form.fields.lastName.placeholder')}
                gutterBottom
              />
            </S.Grid>
            <Field
              label={t('settingsPage.account.form.fields.email.label')}
              name="email"
              component={FormikInput}
              disabled={isSubmitting}
              placeholder={t('settingsPage.account.form.fields.email.placeholder')}
              gutterBottom
            />
            <Field
              label={t('settingsPage.account.form.fields.zipcode.label')}
              name="zipcode"
              component={FormikInput}
              disabled={isSubmitting}
              placeholder={t('settingsPage.account.form.fields.zipcode.placeholder')}
              gutterBottom
            />

            <Btn
              type="submit"
              width={breakpoints.smUp ? 'auto' : '100%'}
              isLoading={isSubmitting}
              label={t('settingsPage.account.form.submitButtonText')}
            />

            {dirty && saveFailed && (
              <S.FormValidation>
                {t('settingsPage.account.form.notifications.failure')}
              </S.FormValidation>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AccountForm;
