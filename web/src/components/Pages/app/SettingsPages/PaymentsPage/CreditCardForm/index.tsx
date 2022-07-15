import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { PaymentMethod } from '@stripe/stripe-js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../../../../../context/toast';
import { useUser } from '../../../../../../context/user';
import * as http from '../../../../../../utils/httpClient';
import { Btn, Input } from '../../../../../Elements';
import * as S from './styles';

interface Props {
  onClose: (paymentMethod: PaymentMethod) => void;
}

const CreditCardForm: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false); // TODO: use Formik
  const [cardOwnerName, setCardOwnerName] = useState<string>('');

  const unmounted = useRef(false);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const handleCardHolderNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setCardOwnerName(event.target.value);
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setErrorMessage('');

    const cardNumberElement = elements?.getElement(CardNumberElement);

    if (!stripe || !elements || !cardNumberElement || !user) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setSubmitting(true);

    try {
      const { token, error } = await stripe.createToken(cardNumberElement, {
        name: cardOwnerName,
      });

      if (error?.message) {
        setErrorMessage(error.message);

        addToast(t('settingsPage.payments.creditCardForm.messages.error'), {
          type: 'error',
        });
      }

      if (token) {
        const { promise } = http.customFetch<{ data: PaymentMethod; success: true }>(
          `${process.env.GATSBY_STRAPI_API_URL}/payment-methods/${user.id}`,
          {
            method: 'POST',
            body: http.json({
              token: token,
            }),
          }
        );

        const { data } = await promise;

        addToast(t('settingsPage.payments.creditCardForm.messages.success'), {
          type: 'success',
        });

        onClose(data);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.message);
    }

    if (!unmounted.current) {
      setSubmitting(false);
    }
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="founding-member-form">
          <label>{t('settingsPage.payments.creditCardForm.fields.cardNumber.label')}</label>
          <CardNumberElement
            className="founding-member-form-stripe"
            options={{
              style: S.stripeComponentStyle,
            }}
          />
        </div>

        <Input
          label={t('settingsPage.payments.creditCardForm.fields.cardOwnerName.label')}
          type="text"
          name="cardOwnerName"
          placeholder="Danielle Thompson"
          onChange={handleCardHolderNameChange}
          value={cardOwnerName}
          required
        />
      </div>

      <div className="form-group row" style={{ marginBottom: -20 }}>
        <div className="col-sm-6 founding-member-form">
          <label>{t('settingsPage.payments.creditCardForm.fields.expirationDate.label')}</label>
          <CardExpiryElement
            className="founding-member-form-stripe"
            options={{
              style: S.stripeComponentStyle,
            }}
          />
        </div>

        <div className="col-sm-6 founding-member-form">
          <label>{t('settingsPage.payments.creditCardForm.fields.cvc.label')}</label>
          <CardCvcElement
            className="founding-member-form-stripe"
            options={{
              style: S.stripeComponentStyle,
            }}
          />
        </div>
      </div>

      <S.ErrorMessage>{errorMessage}</S.ErrorMessage>

      <Btn
        label={t('settingsPage.payments.creditCardForm.submitButtonText')}
        isLoading={submitting}
        disabled={submitting}
        type="button"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default CreditCardForm;
