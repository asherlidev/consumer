import { useLocation } from '@reach/router';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { navigate } from 'gatsby';
import { parse, stringifyUrl } from 'query-string';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useAnalytics } from '../../../../context/analytics';
import { FetchStatus } from '../../../../types/common';
import { Btn } from '../../../Elements';
import { SideImageFormPage } from '../../../Layout';
import * as SideImageFormPageStyles from '../../../Layout/SideImageFormPage/styles';
import { PrivateRouteProps } from '../../../PrivateRoute';
import { sendVerificationCode } from './common';

const EditPhonePage: React.FC<PrivateRouteProps> = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { trackWithFbPixel } = useAnalytics();
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const unmounted = useRef(false);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  useEffect(() => {
    // Ensure that this tracking does not happen if this component ever gets reused for updating one's phone number
    trackWithFbPixel('Lead');
  }, [trackWithFbPixel]);

  const initialValues: EditPhoneFormValues = useMemo(() => {
    const { phone = '' }: { phone?: string } = parse(location.search);
    return { phone };
  }, [location.search]);

  const onSubmit = useCallback(
    async ({ phone }: EditPhoneFormValues, formikHelpers: FormikHelpers<EditPhoneFormValues>) => {
      setFetchStatus(FetchStatus.Loading);

      const success = await sendVerificationCode(phone);

      if (!unmounted.current) {
        if (success) {
          navigate(stringifyUrl({ url: '/app/phone/confirm', query: { phone } }));
        } else {
          setFetchStatus(FetchStatus.Error);
          formikHelpers.setSubmitting(false);
        }
      }
    },
    []
  );

  const renderForm = useMemo(
    () => (
      <>
        <SideImageFormPageStyles.Subheader>
          <SideImageFormPageStyles.Title>{t('editPhonePage.title')}</SideImageFormPageStyles.Title>
          <SideImageFormPageStyles.Subtitle>
            {t('editPhonePage.subtitle')}
          </SideImageFormPageStyles.Subtitle>
        </SideImageFormPageStyles.Subheader>

        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            phone: Yup.string().required(t('common.required')),
          })}
        >
          {({ isSubmitting, dirty }) => (
            <Form>
              <Field
                label={t('editPhonePage.form.fields.phone.label')}
                disabled={isSubmitting}
                name="phone"
                type="text"
                component={SideImageFormPageStyles.Input}
                isPhone
                defaultCountry="US"
                placeholder={t('editPhonePage.form.fields.phone.placeholder')}
              />

              <Btn
                type="submit"
                isLoading={isSubmitting}
                label={t('editPhonePage.form.submitButtonText')}
              />

              {dirty && fetchStatus === FetchStatus.Error && (
                <SideImageFormPageStyles.FormValidation>
                  {t('eventForms.general.somethingWentWrong')}
                </SideImageFormPageStyles.FormValidation>
              )}
            </Form>
          )}
        </Formik>
      </>
    ),
    [fetchStatus, initialValues, onSubmit, t]
  );

  return (
    <SideImageFormPage imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1566412178/fp-content/art-audience-band-1540406_ym0ech.jpg">
      {renderForm}
    </SideImageFormPage>
  );
};

export default EditPhonePage;

//
// Utils
//

interface EditPhoneFormValues {
  phone: string;
}
