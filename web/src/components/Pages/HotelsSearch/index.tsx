import React from 'react';
import { parse } from 'query-string';
import { useLocation, RouteComponentProps } from '@reach/router';
import * as S from './styles';
import HotelSearchResults from './HotelSearchResults';
import { Footer, Header, PageWrapper } from '../../Layout';

const HotelsSearch: React.FC<RouteComponentProps> = () => {
  const location = useLocation();
  const search = location.search;
  const { location: locationQuery, start, end, adults, children, rooms, page } = parse(search);

  const query = {
    location: Array.isArray(locationQuery) ? locationQuery.join(' ') : locationQuery || undefined,
    inDate: Array.isArray(start) || !start ? undefined : parseInt(start),
    outDate: Array.isArray(end) || !end ? undefined : parseInt(end),
    guests: {
      adults: Array.isArray(adults) || !adults ? undefined : parseInt(adults),
      children: Array.isArray(children) || !children ? undefined : parseInt(children),
      rooms: Array.isArray(rooms) || !rooms ? undefined : parseInt(rooms),
    },
    page: Array.isArray(page) || !page ? undefined : parseInt(page),
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <HotelSearchResults query={query} />
      </PageWrapper>
      <Footer />
    </>
  );
};

export default HotelsSearch;
