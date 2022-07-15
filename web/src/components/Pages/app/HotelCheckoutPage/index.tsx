import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React, { useMemo } from 'react';
import { useLocation } from '@reach/router';
import { parse } from 'query-string';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/user';
import { Breadcrumbs, Btn, ScrollToTop, Subtitle, Title } from '../../../Elements';
import { FeatureList, Footer, Header, PageWrapper } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import CheckoutBox from './HotelCheckoutBox';
import CreditPackOptions from './HotelCreditPackOptions';
import * as S from './styles';

interface Props extends PrivateRouteProps {
  slug?: string;
}

const HotelCheckoutPage: React.FC<Props> = ({ slug }) => {
  const { t } = useTranslation();

  const { user } = useUser();
  const { search } = useLocation();
  const breakpoints = useBreakpoint();

  const {
    hotel_id,
    price,
    rate_plan_code,
    room_code,
    room_title,
    hotel_name,
    in_date,
    out_date,
    adultsNum,
    childrenNum,
  } = useMemo(() => parse(search), [search]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <PageWrapper>
        <S.Container>
          <S.CreditWrapper>
            <CreditPackOptions
              credit_balance={user.credit_balance}
              price={price as string}
              subscription={user?.subscription}
              hotel_id={hotel_id as string}
              rate_plan_code={rate_plan_code as string}
              room_code={room_code as string}
              hotel_name={hotel_name as string}
              in_date={in_date as string}
              out_date={out_date as string}
              adultsNum={adultsNum as string}
              childrenNum={childrenNum as string}
            />
          </S.CreditWrapper>
          <S.CheckoutBoxWrapper>
            <CheckoutBox
              current_credits={user.credit_balance}
              price={price as string}
              subscription={user?.subscription}
              hotel_id={hotel_id as string}
              rate_plan_code={rate_plan_code as string}
              room_code={room_code as string}
              room_title={room_title as string}
              hotel_name={hotel_name as string}
              in_date={in_date as string}
              out_date={out_date as string}
              adultsNum={adultsNum as string}
              childrenNum={childrenNum as string}
            />
          </S.CheckoutBoxWrapper>
        </S.Container>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default HotelCheckoutPage;
