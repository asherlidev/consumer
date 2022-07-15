import { Redirect } from '@reach/router';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Link, PageProps } from 'gatsby';
import { parse, stringifyUrl } from 'query-string';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useAuth } from '../../../context/auth';
import { Btn } from '../../Elements';
import { SideImageFormPage } from '../../Layout';
import * as SideImageFormPageStyles from '../../Layout/SideImageFormPage/styles';
import * as S from './styles';

const LoginPage: React.FC<PageProps> = ({ location, navigate }) => {
  const { t } = useTranslation();
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isAuthenticated, login } = useAuth();
  const unmounted = useRef(false);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const { from }: { from?: string } = useMemo(() => parse(location.search), [location.search]);

  const onSubmit = useCallback(
    async ({ email, password }: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues>) => {
      const { success, errorMessage } = await login(email, password);

      if (success && from) {
        navigate(from);
      }

      if (!unmounted.current) {
        setLoginFailed(!success);
        if (!success) {
          formikHelpers.setSubmitting(false);
          if (errorMessage) {
            setErrorMessage(errorMessage);
          }
        }
      }
    },
    [login, from, navigate]
  );

  const registerPagePath = useMemo(() => stringifyUrl({ url: '/register', query: { from } }), [
    from,
  ]);

  if (isAuthenticated) {
    return <Redirect noThrow to={from || '/app/invite'} />;
  }

  return (
    <SideImageFormPage imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1566408294/fp-content/audience-celebration-concert-1916823_cequnn.jpg">
      <SideImageFormPageStyles.Header className="row">
        <SideImageFormPageStyles.SmallTxt>
          {t('loginPage.header')} &nbsp;
        </SideImageFormPageStyles.SmallTxt>
        <Link to={registerPagePath}>
          <SideImageFormPageStyles.SmallBtn>{t('common.signUp')}</SideImageFormPageStyles.SmallBtn>
        </Link>
      </SideImageFormPageStyles.Header>

      <SideImageFormPageStyles.Subheader>
        <SideImageFormPageStyles.Title>{t('loginPage.title')}</SideImageFormPageStyles.Title>
        <SideImageFormPageStyles.Subtitle>
          {t('loginPage.subtitle')}
        </SideImageFormPageStyles.Subtitle>
      </SideImageFormPageStyles.Subheader>

      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(t('common.emailField.errorMessages.email'))
            .required(t('common.emailField.errorMessages.required')),
          password: Yup.string().required(t('common.required')),
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

            <Field
              label={t('common.password')}
              disabled={isSubmitting}
              type="password"
              name="password"
              component={SideImageFormPageStyles.Input}
              placeholder={t('common.enterPassword')}
              darkMode
            />

            <S.ForgotPasswordLink to="/forgot-password">
              {t('common.forgotPassword')}
            </S.ForgotPasswordLink>

            <Btn type="submit" isLoading={isSubmitting} label={t('common.continueEmail')} />

            {dirty && loginFailed && (
              <SideImageFormPageStyles.FormValidation id="form-validation">
                {errorMessage || t('eventForms.general.somethingWentWrong')}
              </SideImageFormPageStyles.FormValidation>
            )}
          </Form>
        )}
      </Formik>

      <SideImageFormPageStyles.TermsTxt>
        {t('loginPage.footer')}{' '}
        <Link to="/terms" target="_blank">
          {t('common.termsOfService')}
        </Link>{' '}
        {t('common.and')}{' '}
        <Link to="/privacy" target="_blank">
          {t('common.privacyPolicy')}
        </Link>
      </SideImageFormPageStyles.TermsTxt>
    </SideImageFormPage>
  );
};

export default LoginPage;

//
// Utils
//

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = { email: '', password: '' };
