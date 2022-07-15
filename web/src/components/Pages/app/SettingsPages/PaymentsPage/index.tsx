import { PaymentMethod } from '@stripe/stripe-js';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../../context/user';
import { FetchStatus } from '../../../../../types/common';
import { amountToText } from '../../../../../utils/amounts';
import * as http from '../../../../../utils/httpClient';
import { BodyText, CircularProgress } from '../../../../Elements';
import { PrivateRouteProps } from '../../../../PrivateRoute';
import SettingsLayout from '../SettingsLayout';
import { Section, SectionTitle, SettingControlRow } from '../styles';
import AddPaymentMethodButton from './AddPaymentMethodButton';
import BillingHistorySection from './BillingHistorySection';
import MakePaymentMethodDefaultButton from './MakePaymentMethodDefaultButton';
import RemovePaymentMethodButton from './RemovePaymentMethodButton';
import * as S from './styles';
import UpdateMembershipButton from './UpdateMembershipButton';

export interface PaymentDetails {
  amount_remaining: number;
  next_payment_attempt: number;
  period_end: number;
  period_start: number;
  default_payment_method: string | null;
  subscription: string | null;
}

const SettingsPaymentsPage: React.FC<PrivateRouteProps> = ({ user }) => {
  const { t } = useTranslation();
  const { fetchUser } = useUser();
  const [fetchUpcomingPaymentDetailsStatus, setFetchUpcomingPaymentDetailsStatus] = useState<
    FetchStatus
  >(FetchStatus.Idle);
  const [upcomingPaymentDetails, setUpcomingPaymentDetails] = useState<PaymentDetails>();
  const [fetchPaymentMethodsStatus, setFetchPaymentMethodsStatus] = useState<FetchStatus>(
    FetchStatus.Idle
  );
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState<string | undefined>();

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

      const { promise: fetchDefaultPaymentMethod } = http.customFetch<
        FetchDefaultPaymentMethodResponse
      >(`${process.env.GATSBY_STRAPI_API_URL}/payment-methods/${user?.id}/default`);

      const defaultPaymentMethodResponse = await fetchDefaultPaymentMethod;

      if (defaultPaymentMethodResponse.success) {
        setDefaultPaymentMethodId(defaultPaymentMethodResponse.default_payment_method);
      }

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

  return (
    <SettingsLayout title={t('settingsPage.title')}>
      <Section>
        <SectionTitle>
          {t('settingsPage.payments.membershipSection.title', {
            membershipName: user?.subscription?.display_name,
          })}
        </SectionTitle>
        {!upcomingPaymentDetails ? (
          <S.LoadingContainer>
            <CircularProgress />
          </S.LoadingContainer>
        ) : (
          <SettingControlRow>
            <div>
              <BodyText>
                {t('settingsPage.payments.membershipSection.membershipText', {
                  daysLeft: Math.abs(
                    moment({ hours: 0 }).diff(
                      upcomingPaymentDetails.next_payment_attempt * 1000,
                      'days'
                    )
                  ),
                  nextPaymentDate: moment(
                    upcomingPaymentDetails.next_payment_attempt * 1000
                  ).format('MMMM Do YYYY'),
                  nextPaymentAmount: amountToText(upcomingPaymentDetails.amount_remaining / 100),
                })}
              </BodyText>
            </div>
            <div>
              <UpdateMembershipButton
                currentSubscription={upcomingPaymentDetails?.subscription}
                hasPaymentMethods={!isEmpty(paymentMethods)}
                onSuccess={() => {
                  fetchUser();
                  fetchUpcomingPaymentDetails();
                }}
              />
            </div>
          </SettingControlRow>
        )}
      </Section>

      <Section>
        <SectionTitle>{t('settingsPage.payments.paymentMethodsSection.title')}</SectionTitle>
        {fetchPaymentMethodsStatus === FetchStatus.Loading ? (
          <S.LoadingContainer>
            <CircularProgress />
          </S.LoadingContainer>
        ) : (
          paymentMethods.map((card) => (
            <S.ListItem key={card.id}>
              <S.Flex>
                <S.ListItemIcon>
                  {card?.brand && <S.PaymentProviderLogo brand={card?.brand} />}
                </S.ListItemIcon>
                <div>
                  <S.ListItemTextPrimary>
                    <S.CardBrandName>{card?.brand}</S.CardBrandName> *** {card?.last4}
                  </S.ListItemTextPrimary>
                  <S.ListItemTextSecondary>
                    {t('settingsPage.payments.paymentMethodsSection.expires', {
                      expirationMonth: card?.exp_month,
                      expirationYear: card?.exp_year,
                    })}
                  </S.ListItemTextSecondary>
                </div>
              </S.Flex>
              <div>
                {defaultPaymentMethodId === card.id ? (
                  <S.ListItemTextSecondary>
                    {t('settingsPage.payments.paymentMethodsSection.default')}
                  </S.ListItemTextSecondary>
                ) : (
                  <>
                    <MakePaymentMethodDefaultButton
                      paymentMethodId={card.id}
                      onSuccess={() => {
                        setDefaultPaymentMethodId(card.id);
                      }}
                    />
                    <RemovePaymentMethodButton
                      paymentMethodId={card.id}
                      onSuccess={() => {
                        setPaymentMethods((prevPaymentMethods) =>
                          prevPaymentMethods.filter((paymentMethod) => paymentMethod.id !== card.id)
                        );
                      }}
                    />
                  </>
                )}
              </div>
            </S.ListItem>
          ))
        )}
        <S.ListItem>
          <S.Flex>
            <S.ListItemIcon>
              <AddPaymentMethodButton
                onSuccess={(newPaymentMethod: PaymentMethod) => {
                  setPaymentMethods((prevPaymentMethods) => [
                    ...prevPaymentMethods,
                    newPaymentMethod,
                  ]);
                }}
              />
            </S.ListItemIcon>
            <div>
              <S.ListItemTextPrimary>
                {t('settingsPage.payments.addPaymentMethod.modal.title')}
              </S.ListItemTextPrimary>
            </div>
          </S.Flex>
        </S.ListItem>
      </Section>

      <BillingHistorySection />
    </SettingsLayout>
  );
};

export default SettingsPaymentsPage;

//
// Utils
//

type FetchDefaultPaymentMethodResponse =
  | {
      success: true;
      default_payment_method: string;
    }
  | {
      success: false;
    };
