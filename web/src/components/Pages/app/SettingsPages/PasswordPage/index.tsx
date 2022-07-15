import { gql, useMutation } from '@apollo/client';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useAuth } from '../../../../../context/auth';
import fragments from '../../../../../utils/gqlFragments';
import { Btn, FormikInput } from '../../../../Elements';
import { PrivateRouteProps } from '../../../../PrivateRoute';
import Layout from '../SettingsLayout';
import * as S from './styles';

const SettingsPasswordPage: React.FC<PrivateRouteProps> = ({ user }) => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const breakpoints = useBreakpoint();
  const [saveFailed, setSaveFailed] = useState(false);
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
  const unmounted = useRef(false);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const onSubmit = useCallback(
    async (
      formValues: UpdatePasswordFormValues,
      formikHelpers: FormikHelpers<UpdatePasswordFormValues>
    ) => {
      setSaveFailed(false);

      // authenticate with current password
      try {
        const { success } = await login(user.email, formValues.currentPassword);

        if (!success) {
          throw new Error();
        }
      } catch (error) {
        if (!unmounted.current) {
          setSaveFailed(true);
          formikHelpers.setSubmitting(false);
          formikHelpers.setErrors({
            currentPassword: t(
              'settingsPage.password.form.fields.currentPassword.errorMessages.loginError'
            ),
          });
        }
        return;
      }

      // change password
      try {
        await updateUser({
          variables: {
            input: {
              where: { id: user.id },
              data: { password: formValues.newPassword },
            },
          },
        });
      } catch (err) {
        console.error(err);
        setSaveFailed(true);
      }

      if (!unmounted.current) {
        formikHelpers.setSubmitting(false);
      }
    },
    [login, t, updateUser, user.email, user.id]
  );

  return (
    <Layout title={t('settingsPage.title')}>
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={schema}>
        {({ isSubmitting, dirty }: FormikProps<UpdatePasswordFormValues>) => (
          <Form>
            <Field
              label={t('settingsPage.password.form.fields.currentPassword.label')}
              placeholder={t('settingsPage.password.form.fields.currentPassword.placeholder')}
              component={FormikInput}
              disabled={isSubmitting}
              name="currentPassword"
              type="password"
              gutterBottom
            />
            <Field
              label={t('settingsPage.password.form.fields.newPassword.label')}
              placeholder={t('settingsPage.password.form.fields.newPassword.placeholder')}
              component={FormikInput}
              disabled={isSubmitting}
              name="newPassword"
              type="password"
              gutterBottom
            />
            <Field
              label={t('settingsPage.password.form.fields.newPasswordConfirm.label')}
              placeholder={t('settingsPage.password.form.fields.newPasswordConfirm.placeholder')}
              component={FormikInput}
              disabled={isSubmitting}
              name="newPasswordConfirm"
              type="password"
              gutterBottom
            />

            <Btn
              type="submit"
              width={breakpoints.smUp ? 'auto' : '100%'}
              isLoading={isSubmitting}
              label={t('settingsPage.password.form.submitButtonText')}
            />

            {dirty && saveFailed && (
              <S.FormValidation>
                {t('settingsPage.password.form.notifications.failure')}
              </S.FormValidation>
            )}
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default SettingsPasswordPage;

//
// Utils
//

interface UpdatePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

// TODO: add to translations
const schema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().required('Password is required'),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
    .required('Password confirm is required'),
});

const initialValues: UpdatePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};
