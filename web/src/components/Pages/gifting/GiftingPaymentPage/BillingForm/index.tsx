import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Link, navigate } from 'gatsby';
import { get, pick, reduce, some, toInteger, values } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGifting } from '../../../../../context/gifting';
import { useUser } from '../../../../../context/user';
import { amountToText } from '../../../../../utils/amounts';
import * as http from '../../../../../utils/httpClient';
import usePrevious from '../../../../../utils/usePrevious';
import { Btn, Input } from '../../../../Elements';
import { LockIcon } from '../../../../Icons';
import * as S from './styles';

interface Props {}

const GiftingBillingForm: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const { giftPlan } = useGifting();
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false); // TODO: use Formik
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    zipcode: '',
    sender_email: user?.email || '',
    sender_first_name: user?.first_name || '',
    sender_last_name: user?.last_name || '',
    recipient_email: '',
    recipient_first_name: '',
    recipient_last_name: '',
  });

  const prevUser = usePrevious(user);

  useEffect(() => {
    if (!prevUser && user) {
      setFormValues((oldFormValues) => ({
        ...oldFormValues,
        sender_email: user?.email || '',
        sender_first_name: user?.first_name || '',
        sender_last_name: user?.last_name || '',
      }));
    }
  }, [prevUser, user]);

  const unmounted = useRef(false);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.persist();
      setFormValues((oldFormValues) => ({
        ...oldFormValues,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const validationErrors: { [field: string]: string | undefined } = useMemo(
    () => getFormValidationErrors(formValues),
    [formValues]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      setErrorMessage('');
      setSubmitted(true);

      const cardNumberElement = elements?.getElement(CardNumberElement);

      if (!stripe || !elements || !cardNumberElement || !giftPlan) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      if (some(values(validationErrors))) {
        setErrorMessage(t('common.invalidFields'));
        return;
      }

      setSubmitting(true);

      try {
        const { token } = await stripe.createToken(cardNumberElement);

        const payload = {
          ...pick(formValues, payloadFormFieldNames),
          token: token?.id,
          plan_id: giftPlan.stripe_plan_id,
          product_id: giftPlan.id,
        };

        const { promise } = http.customFetch<BillingGiftsubscriptionResponse>(
          `${process.env.GATSBY_STRAPI_API_URL}/bill-giftsubscription`,
          {
            method: 'POST',
            body: http.json(payload),
          }
        );

        const response = await promise;

        if ('message' in response) {
          setErrorMessage(response.message);
        } else {
          navigate('/gifting/payment-successful');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage(error?.message);
      }

      if (!unmounted.current) {
        setSubmitting(false);
      }
    },
    [t, giftPlan, validationErrors]
  );

  return (
    <form className="row" onSubmit={handleSubmit}>
      <S.SectionTitle>{t('giftingPaymentPage.sections.recipient.title')}</S.SectionTitle>
      <div className="form-group row">
        <div className="col-sm-6">
          <Input
            label={t('giftingPaymentPage.sections.recipient.fields.recipient_first_name.label')}
            type="text"
            name="recipient_first_name"
            placeholder={t(
              'giftingPaymentPage.sections.recipient.fields.recipient_first_name.placeholder'
            )}
            onChange={handleChange}
            value={formValues.recipient_first_name}
            errorMessage={submitted && validationErrors.recipient_first_name}
          />
        </div>
        <div className="col-sm-6">
          <Input
            label={t('giftingPaymentPage.sections.recipient.fields.recipient_last_name.label')}
            type="text"
            name="recipient_last_name"
            placeholder={t(
              'giftingPaymentPage.sections.recipient.fields.recipient_last_name.placeholder'
            )}
            onChange={handleChange}
            value={formValues.recipient_last_name}
            errorMessage={submitted && validationErrors.recipient_last_name}
          />
        </div>
      </div>

      <Input
        label={t('giftingPaymentPage.sections.recipient.fields.recipient_email.label')}
        type="text"
        name="recipient_email"
        placeholder={t('giftingPaymentPage.sections.recipient.fields.recipient_email.placeholder')}
        onChange={handleChange}
        value={formValues.recipient_email}
        errorMessage={submitted && validationErrors.recipient_email}
      />

      <S.SectionTitle>{t('giftingPaymentPage.sections.sender.title')}</S.SectionTitle>
      <div className="form-group row">
        <div className="col-sm-6">
          <Input
            label={t('giftingPaymentPage.sections.sender.fields.sender_first_name.label')}
            type="text"
            name="sender_first_name"
            placeholder={t(
              'giftingPaymentPage.sections.sender.fields.sender_first_name.placeholder'
            )}
            onChange={handleChange}
            value={formValues.sender_first_name}
            errorMessage={submitted && validationErrors.sender_first_name}
          />
        </div>
        <div className="col-sm-6">
          <Input
            label={t('giftingPaymentPage.sections.sender.fields.sender_last_name.label')}
            type="text"
            name="sender_last_name"
            placeholder={t(
              'giftingPaymentPage.sections.sender.fields.sender_last_name.placeholder'
            )}
            onChange={handleChange}
            value={formValues.sender_last_name}
            errorMessage={submitted && validationErrors.sender_last_name}
          />
        </div>
      </div>
      <Input
        label={t('giftingPaymentPage.sections.sender.fields.sender_email.label')}
        type="text"
        name="sender_email"
        placeholder={t('giftingPaymentPage.sections.sender.fields.sender_email.placeholder')}
        onChange={handleChange}
        value={formValues.sender_email}
        errorMessage={submitted && validationErrors.sender_email}
      />

      <S.SectionTitle>{t('giftingPaymentPage.sections.billing.title')}</S.SectionTitle>
      <div className="form-group">
        <Input
          label={t('billingForm.name.label')}
          type="text"
          name="name"
          id="name"
          placeholder={t('billingForm.name.placeholder')}
          onChange={handleChange}
          value={formValues.name}
        />
        <div className="founding-member-form">
          <label>{t('billingForm.cardNumber.label')}</label>
          <CardNumberElement
            className="founding-member-form-stripe"
            options={{
              style: S.stripeComponentStyle,
            }}
          />
        </div>
      </div>
      <div className="form-group row" style={{ marginBottom: -20 }}>
        <div className="col-sm-6 founding-member-form">
          <label>{t('billingForm.expirationDate.label')}</label>
          <CardExpiryElement
            className="founding-member-form-stripe"
            options={{
              style: S.stripeComponentStyle,
            }}
          />
        </div>
        <div className="col-sm-6 founding-member-form">
          <label>{t('billingForm.cvc.label')}</label>
          <CardCvcElement
            className="founding-member-form-stripe"
            options={{
              style: S.stripeComponentStyle,
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <Input
            label={t('billingForm.zipcode.label')}
            type="text"
            className="founding-member-form"
            name="zipcode"
            id="zipcode"
            placeholder={t('billingForm.zipcode.placeholder')}
            onChange={handleChange}
            value={formValues.zipcode}
            required
          />
        </div>
      </div>

      <S.ErrorMessage>{errorMessage}</S.ErrorMessage>

      <S.BtnRow>
        <Btn
          label={t('common.joinGift')}
          isLoading={submitting}
          disabled={submitting}
          type="button"
          onClick={handleSubmit}
        />
        <div>
          <S.Title>${amountToText(toInteger(giftPlan?.display_price))}</S.Title>
          <span>{t('billingForm.charge')}</span>
        </div>
      </S.BtnRow>

      <S.SecureTxt>
        <LockIcon />
        &nbsp; {t('billingForm.secureNotice')}
      </S.SecureTxt>

      <S.TermsTxt className="row">
        <Link to="/terms" target="_blank">
          {t('common.termsOfService')}
        </Link>{' '}
        &nbsp;{' '}
        <Link to="/privacy" target="_blank">
          {t('common.privacyPolicy')}
        </Link>
      </S.TermsTxt>
    </form>
  );
};

export default GiftingBillingForm;

//
// Utils
//

interface FormValues {
  name: string; // Should be picked up by stripe code
  zipcode: string; // Should be picked up by stripe code
  sender_email: string;
  sender_first_name: string;
  sender_last_name: string;
  recipient_email: string;
  recipient_first_name: string;
  recipient_last_name: string;
}

type BillingGiftsubscriptionResponse =
  | {
      success: false;
      message: string;
    }
  | { success: true; data: FormValues }; // TODO: Data has more fields so types are incomplete

const emailValidation = (value: string) => {
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!value.match(mailformat)) {
    return 'Invalid email'; // TODO: use translation
  }
  return false;
};

const requiredValidation = (value?: string) => (!!value ? false : 'Required'); // TODO: use translation

const payloadFormFieldNames = [
  'sender_email',
  'sender_first_name',
  'sender_last_name',
  'recipient_email',
  'recipient_first_name',
  'recipient_last_name',
];

const validation = {
  sender_email: [requiredValidation, emailValidation],
  sender_first_name: [requiredValidation],
  sender_last_name: [requiredValidation],
  recipient_email: [requiredValidation, emailValidation],
  recipient_first_name: [requiredValidation],
  recipient_last_name: [requiredValidation],
};

const getFieldValidationError = (fieldName: string, value: any): string | undefined => {
  let validationError;

  for (const getValidationError of get(validation, fieldName, [])) {
    const error = getValidationError(value);
    if (error) {
      validationError = error;
    }
  }

  return validationError;
};

const getFormValidationErrors = (formValues: FormValues) =>
  reduce(
    payloadFormFieldNames,
    (validationErrors, fieldName) => ({
      ...validationErrors,
      [fieldName]: getFieldValidationError(fieldName, get(formValues, fieldName)),
    }),
    {}
  );
