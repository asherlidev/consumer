import React, { useCallback, useEffect, useState } from 'react';
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
import { Btn, Subtitle, Title, BodyText, Button } from '../../../../../components/Elements';
import { ModalBody, ModalHeader } from '../../../../../components/Layout';
import ReactTooltip from 'react-tooltip';

import { last } from 'lodash';
import colors from '../../../../../constants/colors';
import UpdateMembershipModal from '../../SettingsPages/PaymentsPage/UpdateMembershipButton/UpdateMembershipModal';
import UpdateMembershipButton from '../../SettingsPages/PaymentsPage/UpdateMembershipButton';
import { PaymentDetails } from '../../SettingsPages/PaymentsPage';
import AddPaymentMethodButton from '../../SettingsPages/PaymentsPage/AddPaymentMethodButton';
import { useUser } from '../../../../../context/user';
import { FetchStatus } from '../../../../../types/common';
import * as http from '../../../../../utils/httpClient';
import ShareModal from '../../../EventDetailPage/EventShareButton/ShareModal';
import UserIcon from './user-icon.svg';
import CreditCard from './credit-card.svg';
import DollarSign from './dollar-sign.svg';
import Hexagon from './hexagon.svg';
import CheckCircle from './check-circle.svg';
import ShareIcon from './share-icon.svg';

interface Props {
  className?: string;
  id: string;
  credit_balance: number;
  price: number;
  quantity: number;
  subscription_display_name: string | undefined;
  event_name: string;
  isSuccess: boolean;
  setIsSuccess: (state: boolean) => void;
}

const CreditPackOptions: React.FC<Props> = ({
  className,
  id,
  credit_balance,
  price,
  quantity,
  subscription_display_name,
  event_name,
  isSuccess,
  setIsSuccess,
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
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  // const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState<string | undefined>();
  const [updatePlanPopupAuto, setUpdatePlanPopupAuto] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [membershipShowModal, setMembershipShowModal] = useState<boolean>(false);
  const [paymentMethodShowModal, setPaymentMethodShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [paymentMethodPopupAuto, setPaymentMethodPopupAuto] = useState<boolean>(true);
  const [proceed, setProceed] = useState<boolean>(false);
  const [orderId, setorderId] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

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

  useEffect(() => {
    if (credit_balance < quantity * price) {
      setMembershipShowModal(true);
    } else {
      setMembershipShowModal(false);
    }
  }, [credit_balance, quantity, price]);

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

  const getTickets = useCallback(async () => {
    // Prevents users from double-clicking for multiple tickets
    if (id && quantity && !isLoading) {
      setIsLoading(true);
      setErrorMessage('');
      try {
        // TODO: get type right
        const { promise } = http.customFetch<any>(
          `${process.env.GATSBY_STRAPI_API_URL}/tickets/${id}/redeem-multiple/${quantity}`,
          {
            method: 'POST',
            body: http.json({ attendees: [user?.id] }),
          }
        );

        const response = await promise;

        if (response.success) {
          setIsSuccess(true);
          setUser(response.data);
          setorderId(response.order_id);
        } else {
          if (response.message) {
            setErrorMessage(response.message);
          } else {
            setErrorMessage('Something went wrong! Please try it later');
          }
        }
      } catch (e) {
        if (e.errorData) {
          setErrorMessage(e.errorData.message);
        } else {
          setErrorMessage('Something went wrong! Please try it later');
        }
      }
      setIsLoading(false);
      setProceed(true);
    }
  }, [id, quantity, fetchUser, isLoading, user?.id]);

  const onAddedPaymentMethod = (newPaymentMethod: PaymentMethod) => {
    setPaymentMethods([newPaymentMethod]);
    setUpdatePlanPopupAuto(true);
  };

  const goHotels = () => {
    navigate('/hotels');
  };

  const openMembershipModal = () => {
    setMembershipShowModal(true);
  };

  return (
    <S.Container
      className={`wow bounceInDown ${className || ''}`}
      data-wow-delay="0.5s"
      {...otherProps}
    >
      {!proceed ? (
        <>
          <S.Title>Confirm{credit_balance > price * quantity && ' & Pay'}</S.Title>
          <S.MyCredit>
            {credit_balance < price * quantity ? (
              <span>
                You are <b>{price * quantity - credit_balance} credits</b> short to get these
                tickets.
              </span>
            ) : (
              'Please confirm your details below. You will receive an email with ticket delivery information once your order has been completed.'
            )}
          </S.MyCredit>
          {credit_balance < price * quantity ? (
            <>
              {fetchPaymentMethodsStatus === FetchStatus.Success && paymentMethods.length === 0 && (
                <S.SpecSection>
                  <S.SpecInfoSection>
                    <S.Circle>
                      <S.SpecIcon src={CreditCard} />
                    </S.Circle>
                    <div>
                      <S.MyPlan>Payment Method</S.MyPlan>
                      <S.MyPlan>
                        <b>No card</b>
                      </S.MyPlan>
                    </div>
                  </S.SpecInfoSection>
                  <AddPaymentMethodButton
                    needLabel={false}
                    onSuccess={onAddedPaymentMethod}
                    popupAuto={paymentMethodPopupAuto}
                    setPopupAuto={setPaymentMethodPopupAuto}
                  />
                </S.SpecSection>
              )}

              <S.SpecSection>
                <S.SpecInfoSection>
                  <S.Circle>
                    <S.SpecIcon src={CreditCard} />
                  </S.Circle>
                  <div>
                    <S.MyPlan>{t('eventCheckout.membership')}</S.MyPlan>
                    <S.MyPlan>
                      <b>{subscription_display_name}</b>
                    </S.MyPlan>
                  </div>
                </S.SpecInfoSection>
                <S.SpecCTALinkSpan
                  className="spec-cta"
                  data-tip="You can upgrade after adding payment method"
                  data-for="membership-upgrade"
                  onClick={openMembershipModal}
                >
                  Upgrade for +$9/mo
                </S.SpecCTALinkSpan>
                {fetchPaymentMethodsStatus === FetchStatus.Success &&
                  paymentMethods.length === 0 && (
                    <ReactTooltip
                      id="membership-upgrade"
                      effect="solid"
                      type="light"
                      className="tooltip"
                    />
                  )}
              </S.SpecSection>
              {/* <S.SpecSection>
                <S.SpecInfoSection>
                  <S.Circle>
                    <S.SpecIcon src={CreditCard} />
                  </S.Circle>
                  <div>
                    <S.MyPlan>Buy Credits</S.MyPlan>
                    <S.MyPlan>
                      <b>Additional 100 credits</b>
                    </S.MyPlan>
                  </div>
                </S.SpecInfoSection>
                <Btn
                  label="Buy for $99"
                  height="46px"
                  width="160px"
                  fontSize="14px"
                  borderRadius="3px"
                  noMR={true}
                  fontWeight={700}
                  borderColor={colors.darkGray}
                  color={colors.darkGray}
                  background="transparent"
                  hoverBackground="transparent"
                  onClick={getTickets}
                  isLoading={isLoading}
                />
              </S.SpecSection> */}
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
                  <div>
                    <S.MyPlan>
                      <b>{user.email}</b>
                    </S.MyPlan>
                    <S.MyPlan>{user.phone}</S.MyPlan>
                  </div>
                </S.SpecInfoSection>
                <S.SpecCTALink to={'/app/settings/account'}>Change</S.SpecCTALink>
              </S.SpecSection>

              <S.SpecSection>
                <S.SpecInfoSection>
                  <S.Circle>
                    <S.SpecIcon src={DollarSign} />
                  </S.Circle>
                  <div>
                    <S.MyPlan>
                      <b>{price * quantity} Credits</b>
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
                <S.Reference>
                  Please reference the venue's website for Covid-19 health &amp; safety guidelines
                  and policies.
                </S.Reference>
                <div>
                  By purchasing the tickets you agree to have an account with Festivalpass and be
                  bound by the{' '}
                  <S.DisclaimerLink href={'/terms'} target="_blank">
                    Terms of Use
                  </S.DisclaimerLink>{' '}
                  &amp;{' '}
                  <S.DisclaimerLink href={'/privacy'} target="_blank">
                    Privacy Policy
                  </S.DisclaimerLink>
                </div>
              </S.DisclaimerSection>
            </>
          )}

          {credit_balance < price * quantity ? (
            <>
              {/* <S.NeedMoreCredits>
                You need {price * quantity - credit_balance} more credits to complete purchase.
              </S.NeedMoreCredits> */}

              {fetchPaymentMethodsStatus === FetchStatus.Success &&
                fetchUpcomingPaymentDetailsStatus !== FetchStatus.Idle &&
                fetchUpcomingPaymentDetailsStatus !== FetchStatus.Loading &&
                paymentMethods.length > 0 && (
                  <UpdateMembershipModal
                    currentSubscription={upcomingPaymentDetails?.subscription}
                    hasPaymentMethods={!isEmpty(paymentMethods)}
                    popupAuto={updatePlanPopupAuto}
                    onSuccess={() => {
                      fetchUser();
                      fetchUpcomingPaymentDetails();
                      setUpdatePlanPopupAuto(false);
                    }}
                    getCredit={true}
                    showModal={membershipShowModal}
                    setShowModal={setMembershipShowModal}
                  />
                )}
            </>
          ) : (
            <Btn
              img={CheckCircle}
              label={t('eventCheckout.getTickets')}
              height="46px"
              width="140px"
              fontSize="14px"
              borderRadius="3px"
              fontWeight={500}
              color={colors.white}
              background={colors.error}
              hoverBackground={colors.error}
              onClick={getTickets}
              isLoading={isLoading}
            />
          )}
        </>
      ) : (
        <>
          {isSuccess ? (
            <>
              <S.Transaction>
                {t('eventCheckout.transactionId', { transaction: orderId })}
              </S.Transaction>
              <S.HowToDeliver>
                {t('eventCheckout.howToDeliver1')} <b>{user.email}</b>
                {t('eventCheckout.howToDeliver2')}
              </S.HowToDeliver>
              <S.Flex>
                <Btn
                  img={ShareIcon}
                  className="social-share-btn"
                  label={t('eventCheckout.share')}
                  height="46px"
                  width="190px"
                  fontSize="14px"
                  borderRadius="3px"
                  noMR={true}
                  fontWeight={700}
                  borderColor={colors.darkGray}
                  color={colors.textDefault}
                  background="transparent"
                  hoverBackground="transparent"
                  onClick={onOpen}
                />
                <Btn
                  label={t('eventCheckout.findHotel')}
                  height="46px"
                  width="150px"
                  fontSize="14px"
                  borderRadius="3px"
                  fontWeight={500}
                  color={colors.white}
                  background={colors.error}
                  hoverBackground={colors.error}
                  onClick={goHotels}
                />
                {/* <S.ShareRow>
                  <p>
                    <strong>{t('eventCheckout.share')}</strong>
                  </p>
                  <div>
                    <S.FacebookButton
                      url={user.referral_url}
                      quote={t('eventCheckout.socialShareTitle', { event: event_name })}
                    >
                      <FacebookIcon size={48} />
                    </S.FacebookButton>
                    <S.TwitterButton
                      url={user.referral_url}
                      title={t('eventCheckout.socialShareTitle', { event: event_name })}
                    >
                      <TwitterIcon size={48} />
                    </S.TwitterButton>
                  </div>
                </S.ShareRow> */}
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
      <ShareModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
