import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { navigate, PageProps, Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { PaymentMethod } from '@stripe/stripe-js';
import { isEmpty } from 'lodash';
import { Modal } from 'react-bootstrap';
import { FacebookIcon, TwitterIcon } from 'react-share';

import * as S from './styles';
import { useSelectPlan } from '../../../../../context/select-plan';
import { Plan } from '../../../../../context/select-plan/SelectPlanProvider';
import checked from '../../../app/EventFormPage/EventForm/utils/CheckboxField/checked.svg';
import { Btn, Subtitle, Title, BodyText, Button, Input } from '../../../../Elements';
import { ModalBody, ModalHeader } from '../../../../Layout';

import { last } from 'lodash';
import colors from '../../../../../constants/colors';
import UpdateMembershipButton from '../../SettingsPages/PaymentsPage/UpdateMembershipButton';
import { PaymentDetails } from '../../SettingsPages/PaymentsPage';
import AddPaymentMethodButton from '../../SettingsPages/PaymentsPage/AddPaymentMethodButton';
import { useUser } from '../../../../../context/user';
import { FetchStatus } from '../../../../../types/common';
import * as http from '../../../../../utils/httpClient';
import UserIcon from './user-icon.svg';
import CreditCard from './credit-card.svg';
import DollarSign from './dollar-sign.svg';
import Hexagon from './hexagon.svg';
import CheckCircle from './check-circle.svg';
import HomeIcon from './home.svg';
import axios from 'axios';

interface Props {
  className?: string;
  hotel_id: string;
  credit_balance: number;
  price: string;
  subscription: { display_name: string | undefined; display_price: number };
  rate_plan_code: string;
  room_code: string;
  hotel_name: string;
  in_date: string;
  out_date: string;
  adultsNum: string;
  childrenNum: string;
}

type CreateReservationType = {
  adults: string;
  children: string;
  hotelids: string;
  inDate: string;
  outDate: string;
  ratePlanCode: string;
  roomCode: string;
  addressAddress: string;
  addressCity: string;
  addressRegion: string;
  addressPostalCode: string;
  // TODO: delete this, testing only
  userId: string;
};

const CreditPackOptions: React.FC<Props> = ({
  className,
  hotel_id,
  credit_balance,
  price,
  subscription,
  rate_plan_code,
  room_code,
  hotel_name,
  in_date,
  out_date,
  adultsNum,
  childrenNum,
  ...otherProps
}) => {
  const { t } = useTranslation();

  const { fetchUser, user, setUser } = useUser();
  const [fetchUpcomingPaymentDetailsStatus, setFetchUpcomingPaymentDetailsStatus] =
    useState<FetchStatus>(FetchStatus.Idle);
  const [upcomingPaymentDetails, setUpcomingPaymentDetails] = useState<PaymentDetails>();
  const [fetchPaymentMethodsStatus, setFetchPaymentMethodsStatus] = useState<FetchStatus>(
    FetchStatus.Idle
  );

  const [isEditingContact, setEditingContact] = useState(!user.email || !user.phone);
  const [isEditingAddress, setEditingAddress] = useState(!user.address_1);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  // const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState<string | undefined>();
  const [updatePlanPopupAuto, setUpdatePlanPopupAuto] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [paymentMethodPopupAuto, setPaymentMethodPopupAuto] = useState<boolean>(true);
  const [proceed, setProceed] = useState<boolean>(false);
  const [confirmationId, setConfirmationId] = useState<string>('');

  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState({
    address1: user.address_1,
    address2: user.address_2,
    city: (user.geolocation as any).city,
    state: (user.geolocation as any).state,
    zip: user.zipcode,
  });
  const [addressError, setAddressError] = useState(false);

  const finished =
    !!phone && !!email && !!address.address1 && !!address.city && !!address.state && !!address.zip;

  const fetchUpcomingPaymentDetails = useCallback(async () => {
    setFetchUpcomingPaymentDetailsStatus(FetchStatus.Loading);

    try {
      const { promise } = http.customFetch<any>(
        `${process.env.GATSBY_STRAPI_API_URL}/billing/membership/upcoming/${user?.id}`
      );

      const result = await promise;

      setUpcomingPaymentDetails(result);

      setFetchUpcomingPaymentDetailsStatus(FetchStatus.Success);
    } catch (error) {
      console.error(error);
      setFetchUpcomingPaymentDetailsStatus(FetchStatus.Error);
    }
  }, [user?.id]);

  useEffect(() => {
    if (fetchUpcomingPaymentDetailsStatus === FetchStatus.Idle) {
      fetchUpcomingPaymentDetails();
    }
  }, [fetchUpcomingPaymentDetails, fetchUpcomingPaymentDetailsStatus]);

  const fetchPaymentMethods = useCallback(async () => {
    setFetchPaymentMethodsStatus(FetchStatus.Loading);

    try {
      const { promise } = http.customFetch<{
        data: PaymentMethod[];
        has_more: boolean;
        object: 'list';
        url: '/v1/payment_methods';
      }>(`${process.env.GATSBY_STRAPI_API_URL}/payment-methods/${user?.id}`);

      const result = await promise;

      setPaymentMethods(result.data);

      // const {
      //   promise: fetchDefaultPaymentMethod,
      // } = http.customFetch<FetchDefaultPaymentMethodResponse>(
      //   `${process.env.GATSBY_STRAPI_API_URL}/payment-methods/${user?.id}/default`
      // );

      // const defaultPaymentMethodResponse = await fetchDefaultPaymentMethod;

      // if (defaultPaymentMethodResponse.success) {
      //   setDefaultPaymentMethodId(defaultPaymentMethodResponse.default_payment_method);
      // }

      setFetchPaymentMethodsStatus(FetchStatus.Success);
    } catch (error) {
      console.error(error);
      setFetchPaymentMethodsStatus(FetchStatus.Error);
    }
  }, [user?.id]);

  useEffect(() => {
    if (fetchPaymentMethodsStatus === FetchStatus.Idle && isEmpty(paymentMethods)) {
      fetchPaymentMethods();
    }
  }, [fetchPaymentMethods, fetchPaymentMethodsStatus, paymentMethods]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const createReservationHelper = async (reservation: CreateReservationType) => {
    return axios
      .post(`${process.env.GATSBY_STRAPI_API_URL}/reservations/reserve`, reservation)
      .then((response) => {
        return response;
      });
  };

  const createReservation = useCallback(async () => {
    if (!address.address1 || !address.city || !address.state || !address.zip) {
      setAddressError(true);
      return;
    }

    // Prevents users from double-clicking for multiple tickets
    if (hotel_id && room_code && address && !isLoading) {
      setAddressError(false);
      setIsLoading(true);
      setErrorMessage('');
      try {
        const reservationParams: CreateReservationType = {
          adults: `${adultsNum}`,
          children: `${childrenNum}`,
          hotelids: `${hotel_id}`,
          inDate: in_date,
          outDate: out_date,
          ratePlanCode: rate_plan_code || '',
          roomCode: room_code || '',
          userId: `${user.id}`,
          addressAddress: address.address1 || '',
          addressCity: address.city,
          addressRegion: address.state,
          addressPostalCode: address.zip,
        };

        const response = await createReservationHelper(reservationParams);
        if (response.status !== 200) {
          setErrorMessage("We couldn't create that reservation: " + response.data);
        }
        if (response.data.success) {
          setIsSuccess(true);
          setConfirmationId(response.data.reservation_id);
        } else {
          setErrorMessage("We couldn't create that reservation: " + response.data);
        }
      } catch (e: any) {
        if (e.errorData) {
          setErrorMessage(e.errorData.message);
        } else {
          setErrorMessage("We couldn't create that reservation: " + e);
        }
      }
      setIsLoading(false);
      setProceed(true);
    }
  }, [
    hotel_id,
    room_code,
    rate_plan_code,
    fetchUser,
    adultsNum,
    childrenNum,
    in_date,
    out_date,
    address,
    user?.id,
  ]);

  const onAddedPaymentMethod = (newPaymentMethod: PaymentMethod) => {
    setPaymentMethods([newPaymentMethod]);
    setUpdatePlanPopupAuto(true);
  };

  const getUpgradeCost = (plan: string) => {
    switch (plan) {
      case 'Silver Plan':
        return 10;
      case 'Gold Plan':
        return 30;
      case 'Platinum Plan':
        return 50;
      case 'Founders Plan':
        return 0;
      default:
        return 19;
    }
  };

  return (
    <S.Container
      className={`wow bounceInDown ${className || ''}`}
      data-wow-delay="0.5s"
      {...otherProps}
    >
      {!proceed ? (
        <>
          <S.Title>Confirm{credit_balance > parseInt(price) && ' & Pay'}</S.Title>
          <S.MyCredit>
            {credit_balance < parseInt(price) ? (
              <span>
                You are <b>{parseInt(price) - credit_balance} credits</b> short to get these
                tickets.
              </span>
            ) : (
              "Please confirm your details below and we'll email you a confirmation about your stay once it has been booked."
            )}
          </S.MyCredit>
          {credit_balance < parseInt(price) ? (
            <>
              <S.SpecSection>
                <S.SpecInfoSection>
                  <S.Circle>
                    <S.SpecIcon src={CreditCard} />
                  </S.Circle>
                  <div>
                    <S.MyPlan>Subscription</S.MyPlan>
                    <S.MyPlan>
                      <b>{subscription.display_name}</b>
                    </S.MyPlan>
                  </div>
                </S.SpecInfoSection>
                {!subscription.display_name?.includes('Founder') && (
                  <S.SpecCTALink to={'/select-plan'}>
                    Upgrade for +${getUpgradeCost(subscription.display_name || '')}/mo
                  </S.SpecCTALink>
                )}
              </S.SpecSection>

              {/* <S.SpecSection>
                <S.SpecInfoSection>
                  <S.Circle>
                    <S.SpecIcon src={DollarSign} />
                  </S.Circle>
                  <div>
                    <S.MyPlan>Buy Credits</S.MyPlan>
                    <S.MyPlan>
                      <b>Additional 100 Credits</b>
                    </S.MyPlan>
                  </div>
                </S.SpecInfoSection>
                <S.SpecCTAButton>Buy for $99</S.SpecCTAButton>
              </S.SpecSection> */}
            </>
          ) : (
            <>
              <S.SpecSection>
                <S.SpecInfoSection>
                  <S.Circle>
                    <S.SpecIcon src={UserIcon} />
                  </S.Circle>
                  {isEditingContact ? (
                    <div style={{ width: '100%' }}>
                      <div
                        style={{
                          display: 'flex',
                          gridGap: '12px',
                          width: '100%',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Input
                          label="Email"
                          style={{
                            fontWeight: 700,
                            width: '100%',
                            minWidth: '120px',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                          }}
                          placeholder="Email*"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                        />
                        <Input
                          label="Phone"
                          style={{
                            fontWeight: 700,
                            width: '100%',
                            minWidth: '120px',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                          }}
                          placeholder="Phone Number*"
                          value={phone || ''}
                          onChange={(e) => setPhone(e.target.value)}
                          type="tel"
                        />
                      </div>
                      <S.SpecCTAChangeLink onClick={() => setEditingContact(false)}>
                        Done
                      </S.SpecCTAChangeLink>
                    </div>
                  ) : (
                    <div>
                      <S.MyPlan>
                        <i>email*:</i> <b>{email}</b>
                        <br />
                        <i>phone*:</i> <b>{phone}</b>
                      </S.MyPlan>
                      <S.MyPlan>Contact Info</S.MyPlan>
                      <div style={{ color: 'red' }}>{!email && 'Email is required.'}</div>
                      <div style={{ color: 'red' }}>{!phone && 'Phone is required.'}</div>
                    </div>
                  )}
                </S.SpecInfoSection>
                {!isEditingContact && (
                  <S.SpecCTAChangeLink onClick={() => setEditingContact(true)}>
                    Change
                  </S.SpecCTAChangeLink>
                )}
              </S.SpecSection>

              <S.SpecSection>
                <S.SpecInfoSection>
                  <S.Circle>
                    <S.SpecIcon src={HomeIcon} />
                  </S.Circle>
                  <div>
                    {isEditingAddress ? (
                      <div>
                        <div style={{ width: '100%' }}>
                          <div
                            style={{
                              display: 'flex',
                              gridGap: '12px',
                              width: '100%',
                              flexWrap: 'wrap',
                            }}
                          >
                            <Input
                              label="Address"
                              style={{
                                fontWeight: 700,
                                width: '100%',
                                minWidth: '120px',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                              }}
                              placeholder="123 Main Street"
                              value={address.address1 || ''}
                              onChange={(e) => setAddress({ ...address, address1: e.target.value })}
                              type="text"
                            />
                            <Input
                              label="Address 2"
                              style={{
                                fontWeight: 700,
                                width: '100%',
                                minWidth: '120px',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                              }}
                              placeholder="Apt 108"
                              value={address.address2 || ''}
                              onChange={(e) => setAddress({ ...address, address2: e.target.value })}
                              type="text"
                            />
                            <Input
                              label="City"
                              style={{
                                fontWeight: 700,
                                width: '100%',
                                minWidth: '120px',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                              }}
                              placeholder="Los Angeles"
                              value={address.city || ''}
                              onChange={(e) => setAddress({ ...address, city: e.target.value })}
                              type="text"
                            />
                            <Input
                              label="State"
                              style={{
                                fontWeight: 700,
                                width: '100%',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                              }}
                              placeholder="California"
                              value={address.state || ''}
                              onChange={(e) => setAddress({ ...address, state: e.target.value })}
                              type="text"
                            />
                            <Input
                              label="Postal Code"
                              style={{
                                fontWeight: 700,
                                width: '100%',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                              }}
                              placeholder="70820"
                              value={address.zip || ''}
                              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                              type="text"
                            />
                          </div>
                        </div>
                        <S.SpecCTAChangeLink onClick={() => setEditingAddress(false)}>
                          Done
                        </S.SpecCTAChangeLink>
                      </div>
                    ) : (
                      <S.MyPlan>
                        <b>
                          {address.address1}, {address.city}, {address.state}, {address.zip}
                        </b>
                      </S.MyPlan>
                    )}
                    <S.MyPlan>Address</S.MyPlan>
                    {addressError && (
                      <div style={{ color: 'red' }}>
                        <i>Please input an address</i>
                      </div>
                    )}
                  </div>
                </S.SpecInfoSection>
                {!isEditingAddress && (
                  <S.SpecCTAChangeLink onClick={() => setEditingAddress(true)}>
                    Change
                  </S.SpecCTAChangeLink>
                )}
              </S.SpecSection>

              <S.SpecSection>
                <S.SpecInfoSection>
                  <S.Circle>
                    <S.SpecIcon src={DollarSign} />
                  </S.Circle>
                  <div>
                    <S.MyPlan>
                      <b>{parseInt(price)} Credits</b>
                    </S.MyPlan>
                    <S.MyPlan>Cost</S.MyPlan>
                  </div>
                </S.SpecInfoSection>
              </S.SpecSection>

              <S.SpecSection>
                <S.SpecInfoSection>
                  <S.Circle>
                    <S.SpecIcon src={Hexagon} />
                  </S.Circle>
                  <div>
                    <S.MyPlan>
                      <b>This Sale is Final</b>
                    </S.MyPlan>
                    <S.MyPlan>Refund Status</S.MyPlan>
                  </div>
                </S.SpecInfoSection>
              </S.SpecSection>

              <S.DisclaimerSection>
                <div>
                  Please reference the hotel's website for Covid-19 health and safety guidelines and
                  policies.
                </div>
                <div>
                  By purchasing the tickets you agree to have an account with Festivalpass and be
                  bound by the{' '}
                  <S.DisclaimerLink to={'/app/settings/account'}>Terms of Use</S.DisclaimerLink>{' '}
                  &amp;{' '}
                  <S.DisclaimerLink to={'/app/settings/account'}>Privacy Policy</S.DisclaimerLink>
                </div>
              </S.DisclaimerSection>
            </>
          )}

          {credit_balance < parseInt(price) ? (
            <>
              <S.NeedMoreCredits>
                You need {parseInt(price) - credit_balance} more credits to complete purchase.
              </S.NeedMoreCredits>
              {fetchPaymentMethodsStatus === FetchStatus.Success && paymentMethods.length === 0 && (
                <AddPaymentMethodButton
                  needLabel={true}
                  onSuccess={onAddedPaymentMethod}
                  popupAuto={paymentMethodPopupAuto}
                  setPopupAuto={setPaymentMethodPopupAuto}
                />
              )}
              {fetchPaymentMethodsStatus === FetchStatus.Success &&
                fetchUpcomingPaymentDetailsStatus !== FetchStatus.Idle &&
                fetchUpcomingPaymentDetailsStatus !== FetchStatus.Loading &&
                paymentMethods.length > 0 && (
                  <UpdateMembershipButton
                    currentSubscription={upcomingPaymentDetails?.subscription}
                    hasPaymentMethods={!isEmpty(paymentMethods)}
                    popupAuto={updatePlanPopupAuto}
                    onSuccess={() => {
                      fetchUser();
                      fetchUpcomingPaymentDetails();
                      setUpdatePlanPopupAuto(false);
                    }}
                    getCredit={true}
                  />
                )}
            </>
          ) : (
            <>
              <Btn
                img={CheckCircle}
                label={'Reserve Room'}
                height="46px"
                width="160px"
                fontSize="16px"
                disabled={!finished}
                fontWeight={600}
                color={colors.white}
                background={colors.error}
                hoverBackground={colors.error}
                onClick={createReservation}
                isLoading={isLoading}
              />
              {!finished && (
                <div style={{ color: 'red' }}>Some fields are not filled out above.</div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {isSuccess ? (
            <>
              <S.ThankYou>Thank you for your hotel reservation!</S.ThankYou>
              <S.HowToDeliver>
                You will receive an email soon confirming your reservation with more detailed
                instructions.
              </S.HowToDeliver>
              <S.Transaction>Your reservation id is {confirmationId}</S.Transaction>
              <S.Flex>
                <S.ShareRow>
                  <p>
                    <strong>{t('eventCheckout.share')}</strong>
                  </p>
                  <div>
                    <S.FacebookButton
                      url={user.referral_url}
                      quote={t('eventCheckout.socialShareTitle', { event: hotel_name })}
                    >
                      <FacebookIcon size={48} />
                    </S.FacebookButton>
                    <S.TwitterButton
                      url={user.referral_url}
                      title={t('eventCheckout.socialShareTitle', { event: hotel_name })}
                    >
                      <TwitterIcon size={48} />
                    </S.TwitterButton>
                  </div>
                </S.ShareRow>
                {/* <S.MyTicket>
                  <Link to="/app/tickets">{t('header.ticketsLink')}</Link>
                </S.MyTicket> */}
              </S.Flex>
            </>
          ) : (
            <>
              <S.Wrong>{errorMessage}</S.Wrong>
            </>
          )}
        </>
      )}
      {/* <Modal show={showModal} onHide={toggleModal}>
        <ModalHeader onClose={toggleModal} />
        <ModalBody footerheightinpx={73}>
          <BodyText>
            {!isSuccess && errorMessage && <S.Notify> {errorMessage}</S.Notify>}
            {isSuccess && <S.Notify>{t('eventCheckout.emailSent')}</S.Notify>}
          </BodyText>
        </ModalBody>
        <Modal.Footer>
          <div>
            {!isSuccess && (
              <Button text onClick={toggleModal}>
                {t('eventCheckout.close')}
              </Button>
            )}
            <Button color="primary" onClick={goHome}>
              {t('eventCheckout.goHome')}
            </Button>
          </div>
        </Modal.Footer>
      </Modal> */}
    </S.Container>
  );
};

export default CreditPackOptions;

type FetchDefaultPaymentMethodResponse =
  | {
      success: true;
      default_payment_method: string;
    }
  | {
      success: false;
    };
