import { Field, Form, Formik, FormikHelpers } from 'formik';
import { PageProps } from 'gatsby';
import { get } from 'lodash';
import { parse } from 'query-string';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { StrapiErrorResponse } from '../../../types/common';
import * as http from '../../../utils/httpClient';
import { Btn } from '../../Elements';
import { SideImageFormPage } from '../../Layout';
import * as SideImageFormPageStyles from '../../Layout/SideImageFormPage/styles';

const ResetPasswordPage: React.FC<PageProps> = ({ location, navigate }) => {
  const { t } = useTranslation();
  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const unmounted = useRef(false);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const { code }: { code?: string } = useMemo(() => parse(location.search), [location.search]);

  const onSubmit = useCallback(
    async (
      { password, passwordConfirmation }: ResetPasswordFormValues,
      formikHelpers: FormikHelpers<ResetPasswordFormValues>
    ) => {
      if (!code) {
        setRequestFailed(true);
        setErrorMessage(t('resetPasswordPage.noResetCodePresent'));
        formikHelpers.setSubmitting(false);
        return;
      }

      setErrorMessage('');
      setRequestFailed(false);

      try {
        const payload = { password, passwordConfirmation, code };

        const { promise } = http.customFetch<ForgotPasswordResponse>(
          `${process.env.GATSBY_STRAPI_API_URL}/auth/reset-password`,
          {
            method: 'POST',
            body: http.json(payload),
          }
        );

        await promise;

        navigate('/reset-password-confirmation');
      } catch (error) {
        setRequestFailed(true);

        const newErrorMessage = get(error, 'errorData.message[0].messages[0].message');

        if (newErrorMessage) {
          setErrorMessage(newErrorMessage);
        }
      }

      if (!unmounted.current) {
        formikHelpers.setSubmitting(false);
      }
    },
    [code, t, navigate]
  );

  return (
    <SideImageFormPage
      centered
      imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1566412178/fp-content/art-audience-band-1540406_ym0ech.jpg"
    >
      <SideImageFormPageStyles.Subheader>
        <SideImageFormPageStyles.Title>
          {t('resetPasswordPage.title')}
        </SideImageFormPageStyles.Title>
        <SideImageFormPageStyles.Subtitle>
          {t('resetPasswordPage.subtitle')}
        </SideImageFormPageStyles.Subtitle>
      </SideImageFormPageStyles.Subheader>

      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          password: Yup.string().required(t('common.emailField.errorMessages.required')),
          passwordConfirmation: Yup.string().required(
            t('common.emailField.errorMessages.required')
          ),
        })}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <Field
              autoFocus
              label={t('resetPasswordPage.inputLabel1')}
              disabled={isSubmitting}
              name="password"
              type="password"
              component={SideImageFormPageStyles.Input}
              placeholder={t('resetPasswordPage.inputPlaceholder1')}
              darkMode
            />

            <Field
              label={t('resetPasswordPage.inputLabel2')}
              disabled={isSubmitting}
              name="passwordConfirmation"
              type="password"
              component={SideImageFormPageStyles.Input}
              placeholder={t('resetPasswordPage.inputPlaceholder2')}
              darkMode
            />

            <Btn
              type="submit"
              isLoading={isSubmitting}
              label={t('resetPasswordPage.buttonLabel')}
            />

            {dirty && requestFailed && (
              <SideImageFormPageStyles.FormValidation id="form-validation">
                {errorMessage || t('eventForms.general.somethingWentWrong')}
              </SideImageFormPageStyles.FormValidation>
            )}
          </Form>
        )}
      </Formik>
    </SideImageFormPage>
  );
};

export default ResetPasswordPage;

//
// Utils
//

interface ResetPasswordFormValues {
  password: string;
  passwordConfirmation: string;
}

const initialValues: ResetPasswordFormValues = { password: '', passwordConfirmation: '' };

type ForgotPasswordResponse = { ok: true } | StrapiErrorResponse;
