import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../../../context/user';
import { FetchStatus } from '../../../../../../types/common';
import { amountToText } from '../../../../../../utils/amounts';
import * as http from '../../../../../../utils/httpClient';
import usePrevious from '../../../../../../utils/usePrevious';
import { Button, CircularProgress } from '../../../../../Elements';
import { Section, SectionTitle } from '../../styles';
import * as S from './styles';

interface BillingItem {
  id: string;
  description: string;
  amount: number; // in cents
  currency: string;
  receipt_url: string;
  payment_method: string; // id of the payment method object
  status: 'succeeded'; // TODO: add the other statuses
  paid: boolean;
  created: number;
}

interface BillingHistoryResponse {
  data: BillingItem[];
  has_more: boolean;
  object: 'list';
  url: '/v1/charges';
}

interface Props {}

const DEFAULT_PAGINATION = 5;
const MAXIMUM_STRIPE_PAGINATION = 100;

const BillingHistorySection: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [billingHistory, setBillingHistory] = useState<BillingHistoryResponse | undefined>();
  const [showCompleteHistory, setShowCompleteHistory] = useState(false);

  const fetchBillingHistory = useCallback(
    async (fetchCompleteHistory: boolean) => {
      setFetchStatus(FetchStatus.Loading);

      try {
        const { promise } = http.customFetch<{
          data: BillingItem[];
          has_more: boolean;
          object: 'list';
          url: '/v1/charges';
        }>(
          `${process.env.GATSBY_STRAPI_API_URL}/billing/history/${user?.id}/${
            fetchCompleteHistory ? MAXIMUM_STRIPE_PAGINATION : DEFAULT_PAGINATION
          }`
        );

        const result = await promise;

        setBillingHistory(result);

        setFetchStatus(FetchStatus.Success);
      } catch (error) {
        console.error(error);
        setFetchStatus(FetchStatus.Error);
      }
    },
    [user?.id]
  );

  const prevShowAll = usePrevious(showCompleteHistory);
  useEffect(() => {
    if (
      (fetchStatus === FetchStatus.Idle && isEmpty(billingHistory?.data)) ||
      (!prevShowAll && showCompleteHistory)
    ) {
      fetchBillingHistory(showCompleteHistory);
    }
  }, [fetchBillingHistory, prevShowAll, showCompleteHistory, fetchStatus, billingHistory]);

  return (
    <Section>
      <SectionTitle>{t('settingsPage.payments.billingHistorySection.title')}</SectionTitle>
      {fetchStatus === FetchStatus.Loading ? (
        <S.CenteredContainer>
          <CircularProgress />
        </S.CenteredContainer>
      ) : isEmpty(billingHistory?.data) ? (
        t('settingsPage.payments.billingHistorySection.noBillingHistory')
      ) : (
        <S.Table>
          <thead>
            <tr>
              <th>{t('settingsPage.payments.billingHistorySection.tableHeaders.date')}</th>
              <th>{t('settingsPage.payments.billingHistorySection.tableHeaders.reference')}</th>
              <th>{t('settingsPage.payments.billingHistorySection.tableHeaders.amount')}</th>
              <th>{t('settingsPage.payments.billingHistorySection.tableHeaders.status')}</th>
              <th>{t('settingsPage.payments.billingHistorySection.tableHeaders.receipt')}</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory?.data.map(
              ({ id, created, description, amount, status, receipt_url }) => (
                <tr key={id}>
                  <td>{moment.unix(created).format('MMMM Do YYYY')}</td>
                  <td>{description}</td>
                  <td>${amountToText(amount / 100)}</td>
                  <td>{status}</td>
                  <td>
                    <a href={receipt_url} target="_blank" rel="noreferrer">
                      {t('settingsPage.payments.billingHistorySection.tableHeaders.receiptLink')}
                    </a>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </S.Table>
      )}
      {billingHistory?.has_more && !showCompleteHistory && (
        <S.CenteredContainer>
          <Button
            onClick={() => {
              setShowCompleteHistory(true);
            }}
            color="primary"
          >
            {fetchStatus === FetchStatus.Loading
              ? t('settingsPage.payments.billingHistorySection.showAllButton.loading')
              : t('settingsPage.payments.billingHistorySection.showAllButton.showAll')}
          </Button>
        </S.CenteredContainer>
      )}
    </Section>
  );
};

export default BillingHistorySection;
