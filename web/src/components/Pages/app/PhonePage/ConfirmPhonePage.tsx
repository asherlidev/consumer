import { useLocation } from '@reach/router';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { navigate } from 'gatsby';
import { parse } from 'query-string';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import colors from '../../../../constants/colors';
import { FetchStatus } from '../../../../types/common';
import * as http from '../../../../utils/httpClient';
import { Btn } from '../../../Elements';
import { SideImageFormPage } from '../../../Layout';
import * as SideImageFormPageStyles from '../../../Layout/SideImageFormPage/styles';
import { sendVerificationCode } from './common';

interface Props {}

const ConfirmPhonePage: React.FC<Props> = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [resendCodeNotification, setResendCodeNotification] = useState<string | undefined>();
  const unmounted = useRef(false);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const phone: string = useMemo(() => {
    const { phone = '' }: { phone?: string } = parse(location.search);
    return phone;
  }, [location.search]);

  const verifyCode = useCallback(
    async (code: string): Promise<boolean> => {
      try {
        const { promise } = http.customFetch<VerifyCodeResponse>(
          `${process.env.GATSBY_STRAPI_API_URL}/phone/verify`,
          {
            method: 'POST',
            body: http.json({ phone, phone_verification_code: code }),
          }
        );

        const response = await promise;

        console.log(response);

        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    [phone]
  );

  const onSubmit = useCallback(
    async (
      { code }: ConfirmPhoneFormValues,
      formikHelpers: FormikHelpers<ConfirmPhoneFormValues>
    ) => {
      setFetchStatus(FetchStatus.Loading);

      const success = await verifyCode(code);

      if (!unmounted.current) {
        if (success) {
          navigate('/app/add-interests');
        } else {
          setFetchStatus(FetchStatus.Error);
          formikHelpers.setSubmitting(false);
        }
      }
    },
    [verifyCode]
  );

  const resendVerificationCode = useCallback(async () => {
    let timer: number;

    setResendCodeNotification(undefined);

    const success = await sendVerificationCode(phone);

    if (!unmounted.current) {
      if (success) {
        console.log('sent new code');
        setResendCodeNotification(t('confirmPhonePage.resendCode.notification.success', { phone }));

        timer = setTimeout(() => {
          // Remove the message after 5 seconds
          if (!unmounted.current) {
            setResendCodeNotification(undefined);
          }
        }, 5000);
      } else {
        setResendCodeNotification(t('confirmPhonePage.resendCode.notification.error', { phone }));
      }
    }

    return () => {
      if (timer != null) {
        clearTimeout(timer);
      }
    };
  }, [phone, t]);

  return (
    <SideImageFormPage imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1566412178/fp-content/art-audience-band-1540406_ym0ech.jpg">
      <SideImageFormPageStyles.Subheader>
        <SideImageFormPageStyles.Title>{t('confirmPhonePage.title')}</SideImageFormPageStyles.Title>
        <SideImageFormPageStyles.Subtitle>
          {t('confirmPhonePage.subtitle')}
        </SideImageFormPageStyles.Subtitle>
      </SideImageFormPageStyles.Subheader>

      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          code: Yup.string().required(t('common.required')),
        })}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <Field
              label={t('confirmPhonePage.form.fields.code.label')}
              disabled={isSubmitting}
              name="code"
              type="text"
              component={SideImageFormPageStyles.Input}
              placeholder={t('confirmPhonePage.form.fields.code.placeholder')}
              darkMode
            />

            <Btn
              type="submit"
              isLoading={isSubmitting}
              label={t('confirmPhonePage.form.submitButtonText')}
            />

            {dirty && fetchStatus === FetchStatus.Error && (
              <SideImageFormPageStyles.FormValidation>
                {t('eventForms.general.somethingWentWrong')}
              </SideImageFormPageStyles.FormValidation>
            )}
          </Form>
        )}
      </Formik>

      <Btn
        type="button"
        onClick={resendVerificationCode}
        label={t('confirmPhonePage.resendCode.buttonText')}
        background={colors.white}
      />

      {resendCodeNotification}
    </SideImageFormPage>
  );
};

export default ConfirmPhonePage;

//
// Utils
//

interface VerifyCodeResponse {
  // TODO: add types
}

interface ConfirmPhoneFormValues {
  code: string;
}

const initialValues: ConfirmPhoneFormValues = { code: '' };
