import { Redirect } from '@reach/router';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { get } from 'lodash';
import { parse } from 'query-string';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useClaimEvent } from '../../../../context/claim-event';
import * as http from '../../../../utils/httpClient';
import { Breadcrumbs, Btn, FormikInput, ScrollToTop, Subtitle, Title } from '../../../Elements';
import { Footer, Header, PageWrapper } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import * as S from './styles';

interface Props extends PrivateRouteProps {
  slug?: string;
}

const ClaimEventVerificationPage: React.FC<Props> = ({ user, slug, location, navigate }) => {
  const { t } = useTranslation();
  const breakpoints = useBreakpoint();
  const { claimedEvent } = useClaimEvent();
  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const unmounted = useRef(false);

  const initialValues = useMemo(() => {
    const queryParams = parse((location as Location).search);
    return {
      verification_code: get(queryParams, 'code', '') as string,
      organization: get(user, 'partner.organization', '') as string,
    };
  }, [location, user]);

  // TODO: code from query params and init the form
  // TODO: init the partner name from user object
  // TODO: when coming from the link in the email, the page shouldn't redirect to the event page. It should fetch the actual event.

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
      { verification_code, organization }: ClaimEventVerificationFormValues,
      formikHelpers: FormikHelpers<ClaimEventVerificationFormValues>
    ) => {
      setErrorMessage('');
      setRequestFailed(false);

      try {
        const payload = { verification_code, organization }; // TODO: possibly email needs to be added

        const { promise } = http.customFetch<ClaimEventVerificationResponse>(
          `${process.env.GATSBY_STRAPI_API_URL}/festivals/${claimedEvent?.strapiId}/claim/verify`,
          {
            method: 'POST',
            body: http.json(payload),
          }
        );

        const result = await promise;

        console.log(result);

        navigate(`/app/events/${slug}/claim/confirmation`);

        // TODO: at the end of the verification process, the event needs to be fetched again so that the isClaimed property is updated
      } catch (error) {
        setRequestFailed(true);

        const newErrorMessage = get(error, 'errorData.message');

        if (newErrorMessage) {
          setErrorMessage(newErrorMessage);
        }
      }

      if (!unmounted.current) {
        formikHelpers.setSubmitting(false);
      }
    },
    [claimedEvent?.strapiId, navigate, slug]
  );

  if (claimedEvent == null || claimedEvent.slug_name !== slug) {
    // TODO: in case claimedEvent == null, the new event should be fetched and set as claimedEvent
    // So no redirect is needed
    // Same for the other pages
    return <Redirect noThrow to={`/events/${slug}`} />;
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <PageWrapper>
        <div className="container">
          <div className="row">
            <S.Container>
              <Breadcrumbs
                links={[
                  { children: claimedEvent.name, to: `/events/${slug}` },
                  {
                    children: t('claimEventVerificationPage.breadcrumbTitle'),
                    to: `/app/events/${slug}/claim/verify`,
                  },
                ]}
              />

              <Title>{t('claimEventVerificationPage.title')}</Title>
              <Subtitle>{t('claimEventVerificationPage.subtitle')}</Subtitle>

              <hr />

              <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                  verification_code: Yup.string()
                    .min(
                      8,
                      t(
                        'claimEventVerificationPage.form.fields.verification_code.errorMessages.min'
                      )
                    )
                    .max(
                      8,
                      t(
                        'claimEventVerificationPage.form.fields.verification_code.errorMessages.max'
                      )
                    )
                    .required(t('common.required')),
                  organization: Yup.string().required(t('common.required')),
                })}
              >
                {({ isSubmitting, dirty }: FormikProps<ClaimEventVerificationFormValues>) => (
                  <Form>
                    <Field
                      label={t('claimEventVerificationPage.form.fields.verification_code.label')}
                      disabled={isSubmitting}
                      name="verification_code"
                      component={FormikInput}
                      placeholder={t(
                        'claimEventVerificationPage.form.fields.verification_code.placeholder'
                      )}
                    />

                    <Field
                      label={t('claimEventVerificationPage.form.fields.organization.label')}
                      disabled={!!initialValues.organization || isSubmitting}
                      name="organization"
                      component={FormikInput}
                      placeholder={t(
                        'claimEventVerificationPage.form.fields.organization.placeholder'
                      )}
                    />

                    <S.ButtonContainer>
                      <Btn
                        label={t('claimEventVerificationPage.form.submitButtonText')}
                        type="submit"
                        width={breakpoints.xsDown ? '100%' : 'auto'}
                        isLoading={isSubmitting}
                      />
                      <S.ResendVerificationCodeLink to={`/app/events/${slug}/claim`}>
                        {t('claimEventVerificationPage.resendCode')}
                      </S.ResendVerificationCodeLink>
                    </S.ButtonContainer>

                    {dirty && requestFailed && (
                      <S.ErrorMessage>
                        {errorMessage || t('eventForms.general.somethingWentWrong')}
                      </S.ErrorMessage>
                    )}
                  </Form>
                )}
              </Formik>
            </S.Container>
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default ClaimEventVerificationPage;

//
// Utils
//

interface ClaimEventVerificationFormValues {
  verification_code: string;
  organization: string;
}

type ClaimEventVerificationResponse =
  | { ok: true } // TODO: verify the structure
  | {
      statusCode: number;
      error: string;
      message: string;
      data: string;
    };
