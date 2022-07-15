import { Field, Form, Formik } from 'formik';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useAuth } from '../../../../context/auth';
import * as http from '../../../../utils/httpClient';
import { BodyText, Button, FormikInput } from '../../../Elements';
import {
  TriangleIconAlternate,
  TriangleOutlineIcon,
  TriangleOutlineIconAlternate,
} from '../../../Icons';
import * as S from './styles';

interface Props {}

const NewsletterSection: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { resetHttpAuthHeader } = useAuth();

  const addNewsletterContact = useCallback(
    async (email: string) => {
      // Prepare special headers needed for the sendgrid request
      http.setDefaultHeader('Authorization', `Bearer ${process.env.GATSBY_SENDGRID_VALIDATION}`);
      http.setDefaultHeader('Content-Type', 'application/json');

      try {
        const { promise } = http.customFetch<{ job_id: string }>(
          `${process.env.GATSBY_SENDGRID_HOST}/marketing/contacts`,
          {
            method: 'PUT',
            body: http.json({
              list_ids: [process.env.GATSBY_SENDGRID_LISTID],
              contacts: [
                {
                  email,
                  custom_fields: {
                    [process.env.GATSBY_SENDGRID_SOURCE_CUSTOM_FIELD_ID as string]: 'podcast',
                  },
                },
              ],
            }),
          }
        );

        await promise;
      } catch (e) {
        console.error(e);
      }

      // Clean up special headers needed for the sendgrid request
      http.setDefaultHeader('Content-Type', http.defaultContentType);
      resetHttpAuthHeader();
    },
    [resetHttpAuthHeader]
  );

  const onSubmit = useCallback(
    async ({ email }, { setSubmitting, resetForm }) => {
      await addNewsletterContact(email);
      setSubmitting(false);
      resetForm();
    },
    [addNewsletterContact]
  );

  return (
    <S.Root {...props}>
      <S.Paper>
        <S.SectionTitle>{t('storiesPage.newsletterSection.title')}</S.SectionTitle>
        <BodyText>{t('storiesPage.newsletterSection.subtitle')}</BodyText>
        <Formik
          onSubmit={onSubmit}
          initialValues={{ email: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email(t('common.emailField.errorMessages.email'))
              .required(t('common.emailField.errorMessages.required')),
          })}
        >
          {({ isSubmitting }) => (
            <Form>
              <S.InputWrap>
                <Field
                  disabled={isSubmitting}
                  name="email"
                  component={FormikInput}
                  placeholder={t('common.emailField.placeholder')}
                />
              </S.InputWrap>
              <Button color="primary" size="large" loading={isSubmitting} type="submit">
                {t('storiesPage.newsletterSection.getAccessButton')}
              </Button>
            </Form>
          )}
        </Formik>
        <S.IconAccentGroup1>
          <TriangleOutlineIconAlternate />
          <TriangleIconAlternate />
        </S.IconAccentGroup1>
        <S.IconAccentGroup2>
          <TriangleOutlineIcon />
        </S.IconAccentGroup2>
      </S.Paper>
    </S.Root>
  );
};

export default NewsletterSection;
