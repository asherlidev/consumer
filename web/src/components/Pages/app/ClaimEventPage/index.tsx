import { Redirect } from '@reach/router';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { get } from 'lodash';
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

const ClaimEventPage: React.FC<Props> = ({ slug, navigate }) => {
  const { t } = useTranslation();
  const breakpoints = useBreakpoint();
  const { claimedEvent } = useClaimEvent();
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

  const eventWebsiteHostname = useMemo(() => {
    let url = claimedEvent?.website_url || 'http://your-domain.com';

    if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }

    return new URL(url).hostname.replace('www.', '');
  }, [claimedEvent?.website_url]);

  const onSubmit = useCallback(
    async ({ email }: ClaimEventFormValues, formikHelpers: FormikHelpers<ClaimEventFormValues>) => {
      setErrorMessage('');
      setRequestFailed(false);

      try {
        const payload = { email };

        const { promise } = http.customFetch<ClaimEventResponse>(
          `${process.env.GATSBY_STRAPI_API_URL}/festivals/${claimedEvent?.strapiId}/claim`,
          {
            method: 'POST',
            body: http.json(payload),
          }
        );

        const result = await promise;

        console.log(result);

        navigate(`/app/events/${slug}/claim/verify`);
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
                    children: t('claimEventPage.breadcrumbTitle'),
                    to: `/app/events/${slug}/claim`,
                  },
                ]}
              />

              <Title>{t('claimEventPage.title')}</Title>
              <Subtitle>{t('claimEventPage.subtitle')}</Subtitle>

              <hr />

              <Subtitle>
                {t('claimEventPage.description', { hostname: eventWebsiteHostname })}
              </Subtitle>

              <Formik
                onSubmit={onSubmit}
                initialValues={{ email: '' }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email(t('common.emailField.errorMessages.email'))
                    .required(t('common.emailField.errorMessages.required')),
                })}
              >
                {({ isSubmitting, dirty }: FormikProps<ClaimEventFormValues>) => (
                  <Form>
                    <Field
                      disabled={isSubmitting}
                      name="email"
                      component={FormikInput}
                      placeholder={t('common.emailField.placeholder')}
                      margin="20px"
                    />

                    <S.ButtonContainer>
                      <Btn
                        label={t('claimEventPage.submitButtonText')}
                        type="submit"
                        width={breakpoints.xsDown ? '100%' : 'auto'}
                        isLoading={isSubmitting}
                      />
                      <span>
                        <S.CustomerSupportLink href="mailto:support@festivalpass.com?subject=Problem with domain verification">
                          {t('claimEventPage.customerSupportLinkText')}
                        </S.CustomerSupportLink>
                      </span>
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

export default ClaimEventPage;

//
// Utils
//

interface ClaimEventFormValues {
  email: string;
}

type ClaimEventResponse =
  | { ok: true } // TODO: verify the structure
  | {
      statusCode: number;
      error: string;
      message: string;
      data: string;
    };
