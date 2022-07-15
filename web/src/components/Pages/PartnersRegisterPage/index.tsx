import { Redirect } from '@reach/router';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { graphql, Link, PageProps, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { stringifyUrl } from 'query-string';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { PartnersRegisterQuery } from '../../../../graphql-types';
import { Btn, Subtitle, Title } from '../../../components/Elements';
import { useAuth } from '../../../context/auth';
import { AllRegistrationFormValues } from '../../../context/auth/AuthProvider';
import { useLocationData } from '../../../context/location-data';
import { usePresignup } from '../../../context/presignup';
import { useReferral } from '../../../context/referral';
import { useUser } from '../../../context/user';
import { Partner } from '../../../context/user/UserProvider';
import * as http from '../../../utils/httpClient';
import { Footer, Header } from '../../Layout';
import bottomSectionOrganicShape from './bottomSectionOrganicShape.svg';
import * as S from './styles';
import topSectionOrganicShape from './topSectionOrganicShape.svg';

/*
scenario 1: The user is not logged in and doesn’t have an account. In this case he registers for an account in step 1 and in step 2 he will register his company as a partner.
scenario 2: The user presses ‘log in’, he goes to /login and when logged in returns to /partners-register which is now at step 2 to register the company as a partner.
scenario 3: The user is already logged in but doesn’t have a partner associated yet. Same as scenario 2
scenario 4: The user is already logged in and has a partner associated. In that case we redirect to the ‘manage events’ page
*/

const PartnersRegisterPage: React.FC<PageProps<{}>> = () => {
  const { t } = useTranslation();
  const breakpoints = useBreakpoint();
  const [registerFailed, setRegisterFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isAuthenticated, register } = useAuth();
  const { user, fetchUser } = useUser();
  const { ipLocationData } = useLocationData();
  const { savedEmail } = usePresignup();
  const { referralUser } = useReferral();
  const unmounted = useRef(false);

  const data = useStaticQuery<PartnersRegisterQuery>(partnersRegisterQuery);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const onSubmitRegisterUserForm = useCallback(
    async (
      formValues: RegisterUserFormValues,
      formikHelpers: FormikHelpers<RegisterUserFormValues>
    ) => {
      setErrorMessage('');
      setRegisterFailed(false);

      // TODO: rename to allRegisterUserFormValues
      const allRegistrationFormValues: AllRegistrationFormValues = {
        ...formValues,
        username: formValues.email,
      };

      if (ipLocationData) {
        allRegistrationFormValues.zipcode = ipLocationData.zip_code;
      }

      if (referralUser) {
        allRegistrationFormValues.referredBy = referralUser.id;
      }

      const { success, errorMessage } = await register(allRegistrationFormValues);

      if (!unmounted.current) {
        setRegisterFailed(!success);
        if (!success) {
          formikHelpers.setSubmitting(false);
          if (errorMessage) {
            setErrorMessage(errorMessage);
          }
        }
      }
    },
    [ipLocationData, referralUser, register]
  );

  const renderRegisterUserForm = useMemo(
    () => (
      <S.FormWrapper>
        <S.FormHeader className="row">
          <S.SmallTxt>{t('partnersRegisterPage.forms.registerUser.header')} &nbsp;</S.SmallTxt>
          <Link to={loginPagePath}>
            <S.FpSmallBtn>{t('common.login')}</S.FpSmallBtn>
          </Link>
        </S.FormHeader>

        <S.FormTitleSection>
          <S.FormTitle>{t('partnersRegisterPage.forms.registerUser.title')}</S.FormTitle>
          <S.FormSubtitle>{t('partnersRegisterPage.forms.registerUser.subtitle')}</S.FormSubtitle>
        </S.FormTitleSection>

        <Formik
          onSubmit={onSubmitRegisterUserForm}
          initialValues={{
            ...initialRegisterUserFormValues,
            email: savedEmail || '',
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string().required(t('common.required')),
            last_name: Yup.string().required(t('common.required')),
            email: Yup.string()
              .email(t('common.emailField.errorMessages.email'))
              .required(t('common.emailField.errorMessages.required')),
            password: Yup.string().required(t('common.required')),
          })}
        >
          {({ isSubmitting, dirty }: FormikProps<RegisterUserFormValues>) => (
            <Form>
              <Field
                label={t('common.firstName')}
                disabled={isSubmitting}
                name="first_name"
                type="text"
                component={S.Input}
                placeholder={t('common.placeholders.firstName')}
                darkMode
              />

              <Field
                label={t('common.lastName')}
                disabled={isSubmitting}
                name="last_name"
                type="text"
                component={S.Input}
                placeholder={t('common.placeholders.lastName')}
                darkMode
              />

              <Field
                label={t('common.emailField.label')}
                disabled={isSubmitting}
                name="email"
                type="text"
                component={S.Input}
                placeholder={t('common.emailField.placeholder')}
                darkMode
              />

              <Field
                label={t('common.password')}
                disabled={isSubmitting}
                type="password"
                name="password"
                component={S.Input}
                placeholder={t('common.enterPassword')}
                darkMode
              />

              <Btn
                type="submit"
                isLoading={isSubmitting}
                label={t('partnersRegisterPage.forms.registerUser.submitButtonText')}
              />

              {dirty && registerFailed && (
                <S.FormValidation id="form-validation">
                  {errorMessage || t('eventForms.general.somethingWentWrong')}
                </S.FormValidation>
              )}
            </Form>
          )}
        </Formik>
      </S.FormWrapper>
    ),
    [errorMessage, onSubmitRegisterUserForm, registerFailed, savedEmail, t]
  );

  const registerPartner = useCallback(
    async (organization: string): Promise<boolean> => {
      try {
        const payload = {
          organization,
          name: organization,
          users: [user?.id],
        };

        const { promise } = http.customFetch<Partner>(
          `${process.env.GATSBY_STRAPI_API_URL}/partners`,
          {
            method: 'POST',
            body: http.json(payload),
          }
        );

        const partner = await promise;

        return partner != null;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    [user?.id]
  );

  const onSubmitRegisterPartnerForm = useCallback(
    async (
      formvalues: RegisterPartnerFormValues,
      formikHelpers: FormikHelpers<RegisterPartnerFormValues>
    ) => {
      setRegisterFailed(false);

      const registered = await registerPartner(formvalues.organization);

      await fetchUser();

      if (!unmounted.current) {
        setRegisterFailed(!registered);
        if (!registered) {
          formikHelpers.setSubmitting(false);
        }
      }
    },
    [fetchUser, registerPartner]
  );

  const renderRegisterPartnerForm = useMemo(
    () => (
      <S.FormWrapper>
        <S.FormTitleSection>
          <S.FormTitle>{t('partnersRegisterPage.forms.registerPartner.title')}</S.FormTitle>
          <S.FormSubtitle>
            {t('partnersRegisterPage.forms.registerPartner.subtitle')}
          </S.FormSubtitle>
        </S.FormTitleSection>

        <Formik
          onSubmit={onSubmitRegisterPartnerForm}
          initialValues={initialRegisterPartnerFormValues}
          validationSchema={Yup.object().shape({
            organization: Yup.string().required(t('common.required')),
          })}
        >
          {({ isSubmitting, dirty }: FormikProps<RegisterPartnerFormValues>) => (
            <Form>
              <Field
                label={t('partnersRegisterPage.forms.registerPartner.fields.organization.label')}
                disabled={isSubmitting}
                name="organization"
                type="text"
                component={S.Input}
                placeholder={t(
                  'partnersRegisterPage.forms.registerPartner.fields.organization.placeholder'
                )}
                darkMode
              />

              <Btn
                type="submit"
                isLoading={isSubmitting}
                label={t('partnersRegisterPage.forms.registerPartner.submitButtonText')}
              />

              {dirty && registerFailed && (
                <S.FormValidation id="form-validation">
                  {t('eventForms.general.somethingWentWrong')}
                </S.FormValidation>
              )}
            </Form>
          )}
        </Formik>
      </S.FormWrapper>
    ),
    [onSubmitRegisterPartnerForm, registerFailed, t]
  );

  const renderForm = useMemo(
    () =>
      isAuthenticated && !user?.partner?.id ? renderRegisterPartnerForm : renderRegisterUserForm,
    [isAuthenticated, renderRegisterPartnerForm, renderRegisterUserForm, user?.partner?.id]
  );

  if (isAuthenticated && user?.partner?.id) {
    return <Redirect noThrow to="/app/manage-events" />;
  }

  return (
    <>
      <Header />

      <S.Container>
        <S.TopSection className="row">
          <div className="col-sm-6">
            <Title>
              {t('partnersRegisterPage.sections.top.titleP1')}
              <S.TitleP2>{t('partnersRegisterPage.sections.top.titleP2')}</S.TitleP2>
            </Title>
            <Subtitle>{t('partnersRegisterPage.sections.top.subtitle')}</Subtitle>
          </div>

          {breakpoints.smUp && (
            <S.FixedImg className="col-md-6">
              {renderForm}

              <S.TopSectionOrganicShape
                src={topSectionOrganicShape}
                height="100%"
                alt="Top section organic shape"
              />
            </S.FixedImg>
          )}
        </S.TopSection>

        <section>
          <Img fluid={data.illustration?.childCloudinaryAsset?.fluid as FluidObject} />
        </section>

        <S.BottomSection>
          <div className="row">
            <div className="col-sm-8">
              <div className="row">
                <div className="col-xs-12">
                  <h3>{t('partnersRegisterPage.sections.bottom.title')}</h3>
                </div>
              </div>
            </div>
            {breakpoints.smUp && (
              <S.FixedImg className="col-sm-4">
                <img src={bottomSectionOrganicShape} alt="Bottom section organic shape" />
              </S.FixedImg>
            )}
          </div>
          <div className="row">
            <S.InfoColumn className="col-sm-4">
              <p>
                <strong>{t('partnersRegisterPage.sections.bottom.content.one.title')}</strong>
              </p>
              <p>{t('partnersRegisterPage.sections.bottom.content.one.content')}</p>
            </S.InfoColumn>
            <S.InfoColumn className="col-sm-4">
              <p>
                <strong>{t('partnersRegisterPage.sections.bottom.content.two.title')}</strong>
              </p>
              <p>{t('partnersRegisterPage.sections.bottom.content.two.content')}</p>
            </S.InfoColumn>
            <S.InfoColumn className="col-sm-4">
              <p>
                <strong>{t('partnersRegisterPage.sections.bottom.content.three.title')}</strong>
              </p>
              <p>
                {t('partnersRegisterPage.sections.bottom.content.three.contentP1')}
                <S.ContentHighlight>
                  {t('partnersRegisterPage.sections.bottom.content.three.contentP2')}
                </S.ContentHighlight>
              </p>
            </S.InfoColumn>
          </div>
        </S.BottomSection>

        {breakpoints.smDown && renderForm}
      </S.Container>

      <Footer />
    </>
  );
};

export default PartnersRegisterPage;

//
// Utils
//

const partnersRegisterQuery = graphql`
  query PartnersRegister {
    illustration: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/PartnersRegisterPage/background.jpg" }
    ) {
      childCloudinaryAsset {
        fluid {
          ...CloudinaryAssetFluid
        }
      }
    }
  }
`;

interface RegisterUserFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const initialRegisterUserFormValues: RegisterUserFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

interface RegisterPartnerFormValues {
  organization: string;
}

const initialRegisterPartnerFormValues: RegisterPartnerFormValues = {
  organization: '',
};

const loginPagePath = stringifyUrl({
  url: '/login',
  query: { from: '/partners-register' },
});
