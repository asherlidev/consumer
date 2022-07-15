import { Field, Form, Formik, FormikHelpers } from 'formik';
import { PageProps } from 'gatsby';
import { get } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { StrapiErrorResponse } from '../../../types/common';
import * as http from '../../../utils/httpClient';
import { Btn } from '../../Elements';
import { SideImageFormPage } from '../../Layout';
import * as SideImageFormPageStyles from '../../Layout/SideImageFormPage/styles';

const ForgotPasswordPage: React.FC<PageProps> = ({ navigate }) => {
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

  const onSubmit = useCallback(
    async (
      { email }: ForgotPasswordFormValues,
      formikHelpers: FormikHelpers<ForgotPasswordFormValues>
    ) => {
      setErrorMessage('');
      setRequestFailed(false);

      try {
        const payload = { email };

        const { promise } = http.customFetch<ForgotPasswordResponse>(
          `${process.env.GATSBY_STRAPI_API_URL}/auth/forgot-password`,
          {
            method: 'POST',
            body: http.json(payload),
          }
        );

        await promise;

        navigate('/forgot-password-confirmation');
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
    [navigate]
  );

  return (
    <SideImageFormPage
      centered
      imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1566408291/fp-content/adult-band-concert-120066_reo9kf.jpg"
    >
      <SideImageFormPageStyles.Subheader>
        <SideImageFormPageStyles.Title>
          {t('forgotPasswordPage.title')}
        </SideImageFormPageStyles.Title>
        <SideImageFormPageStyles.Subtitle>
          {t('forgotPasswordPage.subtitle')}
        </SideImageFormPageStyles.Subtitle>
      </SideImageFormPageStyles.Subheader>

      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(t('common.emailField.errorMessages.email'))
            .required(t('common.emailField.errorMessages.required')),
        })}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <Field
              autoFocus
              label={t('common.emailField.label')}
              disabled={isSubmitting}
              name="email"
              type="text"
              component={SideImageFormPageStyles.Input}
              placeholder={t('common.emailField.placeholder')}
              darkMode
            />

            <Btn
              type="submit"
              isLoading={isSubmitting}
              label={t('forgotPasswordPage.buttonLabel')}
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

export default ForgotPasswordPage;

//
// Utils
//

interface ForgotPasswordFormValues {
  email: string;
}

const initialValues: ForgotPasswordFormValues = { email: '' };

type ForgotPasswordResponse = { ok: true } | StrapiErrorResponse;
