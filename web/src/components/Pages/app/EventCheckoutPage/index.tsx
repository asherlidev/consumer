import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React, { useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import { parse } from 'query-string';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/user';
import { Breadcrumbs, Btn, ScrollToTop, Subtitle, Title } from '../../../Elements';
import { FeatureList, Footer, Header, PageWrapper } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import CheckoutBox from './CheckoutBox';
import CreditPackOptions from './CreditPackOptions';
import * as S from './styles';

interface Props extends PrivateRouteProps {
  slug?: string;
}

const EventCheckoutPage: React.FC<Props> = ({ slug }) => {
  const { t } = useTranslation();

  const { user } = useUser();
  const { search } = useLocation();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const breakpoints = useBreakpoint();

  const { id, price, quantity, seats_id, seats_label, event_name, event_date, event_location } =
    useMemo(() => parse(search), [search]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <PageWrapper>
        <S.Container>
          <S.CreditWrapper>
            <CreditPackOptions
              credit_balance={user.credit_balance}
              price={parseInt(price as string)}
              subscription_display_name={user?.subscription?.display_name}
              id={id as string}
              quantity={parseInt(quantity as string)}
              event_name={event_name as string}
              isSuccess={isSuccess}
              setIsSuccess={setIsSuccess}
            />
          </S.CreditWrapper>
          <S.CheckoutBoxWrapper>
            <CheckoutBox
              price={parseInt(price as string)}
              quantity={parseInt(quantity as string)}
              seats_id={seats_id as string}
              seats_label={seats_label as string}
              event_name={event_name as string}
              event_date={event_date as string}
              event_location={event_location as string}
              current_credits={user.credit_balance}
              isSuccess={isSuccess}
            />
          </S.CheckoutBoxWrapper>
        </S.Container>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default EventCheckoutPage;
