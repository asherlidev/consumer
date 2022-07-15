import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Link } from 'gatsby';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CouponSku } from '../../../../types/common';
import { Btn, Input } from '../../../Elements';
import { LockIcon } from '../../../Icons';
import { OutboundCampaign } from '../../LandingPage/SuperHeroSection/OutboundSuperHeroSection';
import * as S from './styles';

export type Upsell = {
  price: number;
  title: string;
  summary: string;
  img_url: string;
  image_alt_txt: string;
};

interface Props {
  completeSignup: (includesOffer: boolean) => void;
  outboundCampaign: OutboundCampaign;
  email: string;
  upsell?: Upsell;
}

const stripeFieldStyle = {
  style: { base: { fontSize: '14px' } },
};

const BillingForm: React.FC<Props> = ({
  outboundCampaign,
  email,
  upsell = {
    title: '',
    summary: '',
  },
  completeSignup,
}) => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const stripeElements = useElements();

  const [billingDetails, setBillingDetails] = useState<BillingDetailsFormValues>({
    name: '',
    zipcode: '',
    includeHat: false,
  });
  const [recipientDetails, setRecipientDetails] = useState<RecipientFormValues>({
    firstName: '',
    lastName: '',
    email,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const price = useMemo(() => {
    let price = outboundCampaign.couponsku ? Number(outboundCampaign.couponsku.price / 100) : 10;

    price =
      billingDetails.includeHat && upsell && upsell.price ? (price += upsell.price / 100) : price;
    let displayPrice = `$${price.toLocaleString()}`;
    return {
      actualPrice: price * 100,
      displayPrice: displayPrice,
    };
  }, [outboundCampaign.couponsku, billingDetails.includeHat, upsell]);

  const getStripeCustomerId = async (email: string) => {
    try {
      const { message, customer_id } = await (
        await fetch(`${process.env.GATSBY_STRAPI_API_URL}/coupons/check-stripe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
      ).json();
      if (message) {
        // An error will occur if the token is invalid.
        // If this happens, you may want to remove the invalid token.
        console.error(message);
        setErrorMessage(message);
        return undefined;
      } else {
        return customer_id;
      }
    } catch (e) {
      console.error(e);
      setErrorMessage(e.message);
    }
  };

  const billCustomer = async (customerId: string) => {
    const { email, firstName, lastName } = recipientDetails;
    const couponsku = outboundCampaign.couponsku as CouponSku;

    const cardNumberElement = stripeElements?.getElement(CardNumberElement);

    if (!stripe || !stripeElements || !cardNumberElement) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const { token } = await stripe.createToken(cardNumberElement);

    const payload = {
      token: token?.id,
      customer_id: customerId,
      product_id: couponsku.product_id,
      product_price: price.actualPrice || couponsku.price,
      emailTo: email,
      first_name: firstName,
      last_name: lastName,
      amount_off: couponsku.amount_off,
      couponsku: couponsku.id,
      outboundcampaign: outboundCampaign.id,
      name: couponsku.name,
      description: couponsku.description,
      isActive: true,
      includeHat: billingDetails.includeHat || false,
    };

    if (!customerId) {
      setErrorMessage('Invalid customer id');
    }

    const { error, message } = await (
      await fetch(`${process.env.GATSBY_STRAPI_API_URL}/coupons/bill-customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    ).json();

    if (error && message) {
      setErrorMessage(message);
      return undefined;
    } else {
      return payload;
    }
  };

  // Submit Card Data
  const handleSubmit = async (evt: any) => {
    setIsLoading(true);
    evt.preventDefault();
    setErrorMessage('');
    try {
      const customerId = await getStripeCustomerId(email);
      const payload = await billCustomer(customerId);
      if (payload) {
        completeSignup(payload.includeHat);
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
    setIsLoading(false);
  };

  const handleRecipientChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.persist();
      setRecipientDetails((oldDetails) => ({
        ...oldDetails,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleBillingDetailsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.persist();
      setBillingDetails((oldDetails) => ({
        ...oldDetails,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const toggleAddon = () => {
    setBillingDetails((oldDetails) => ({
      ...oldDetails,
      includeHat: !oldDetails.includeHat,
    }));
  };

  useEffect(() => {
    setRecipientDetails((oldDetails) => ({
      ...oldDetails,
      email,
    }));
  }, [email]);

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="form-group" style={{ textAlign: 'left' }}>
        <h4>Your Information</h4>
        <S.FirstLastRowWrapper className="row">
          <S.FirstLastInputWrapper className="col-xs-12 col-sm-6">
            <Input
              autoFocus
              label={t('promoBillingForm.firstNameInput')}
              type="text"
              name="firstName"
              id="firstName"
              placeholder={t('common.firstName')}
              onChange={handleRecipientChange}
              value={recipientDetails.firstName}
              required
            />
          </S.FirstLastInputWrapper>
          <S.FirstLastInputWrapper className="col-xs-12 col-sm-6">
            <Input
              label={t('promoBillingForm.lastNameInput')}
              type="text"
              name="lastName"
              id="lastName"
              placeholder={t('common.lastName')}
              onChange={handleRecipientChange}
              value={recipientDetails.lastName}
              required
            />
          </S.FirstLastInputWrapper>
        </S.FirstLastRowWrapper>
        <Input
          label={t('promoBillingForm.emailInput')}
          type="email"
          name="email"
          id="email"
          placeholder={t('promoBillingForm.emailPlaceholder')}
          data-rule="email"
          data-msg="Please enter a valid email"
          onChange={handleRecipientChange}
          value={recipientDetails.email}
          required
        />
      </div>

      <hr />

      <div className="form-group" style={{ textAlign: 'left' }}>
        <h4>Payment Information</h4>
        <Input
          label={t('billingForm.name.label')}
          type="text"
          name="name"
          id="name"
          placeholder={t('billingForm.name.placeholder')}
          onChange={handleBillingDetailsChange}
          value={billingDetails.name}
          required
        />
        <div className="founding-member-form">
          <label>{t('billingForm.cardNumber.label')}</label>
          <CardNumberElement className="founding-member-form-stripe" options={stripeFieldStyle} />
        </div>
      </div>
      <div className="form-group row" style={{ marginBottom: -20 }}>
        <div className="col-sm-6 founding-member-form">
          <label>{t('billingForm.expirationDate.label')}</label>
          <CardExpiryElement className="founding-member-form-stripe" options={stripeFieldStyle} />
        </div>
        <div className="col-sm-6 founding-member-form">
          <label>{t('billingForm.cvc.label')}</label>
          <CardCvcElement className="founding-member-form-stripe" options={stripeFieldStyle} />
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
            placeholder="Enter Postal Code"
            onChange={handleBillingDetailsChange}
            value={billingDetails.zipcode}
            required
          />
        </div>
        <div className="col-sm-6"></div>
      </div>
      {upsell && upsell.price && (
        <S.FpAnnualOffer checked={billingDetails.includeHat} onClick={toggleAddon}>
          <input type="checkbox" onChange={toggleAddon} checked={billingDetails.includeHat} />
          <div>
            <p>
              <strong>{upsell.title}</strong>
            </p>
            <p>{upsell.summary}</p>
          </div>
          <div>
            <img height="100" src={upsell.img_url} alt={upsell.image_alt_txt} />
          </div>
        </S.FpAnnualOffer>
      )}
      <div className="row" style={{ justifyContent: 'center' }}>
        <S.ErrorMsg>
          <strong>{errorMessage}</strong>
        </S.ErrorMsg>
      </div>
      <S.FpBtnRow>
        <Btn
          disabled={!recipientDetails.email}
          label={t('common.buyCode')}
          isLoading={isLoading}
          type="submit"
          className="animated fadeInUp"
        />
        <div>
          <S.Title2>{price.displayPrice}</S.Title2>
          <span>{t('billingForm.charge')}</span>
        </div>
      </S.FpBtnRow>
      <S.FpTermsTxt>
        <LockIcon />
        {t('billingForm.secureNotice')}
      </S.FpTermsTxt>
      <S.FpTermsTxt>
        <div className="row" style={{ textAlign: 'center', marginTop: 5 }}>
          <Link to="/terms" target="_blank">
            {t('common.termsOfService')}
          </Link>{' '}
          &nbsp;{' '}
          <Link to="/privacy" target="_blank">
            {t('common.privacyPolicy')}
          </Link>
        </div>
      </S.FpTermsTxt>
    </form>
  );
};

export default BillingForm;

//
// Utils
//

interface RecipientFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface BillingDetailsFormValues {
  name: string;
  zipcode: string;
  includeHat: boolean;
}
