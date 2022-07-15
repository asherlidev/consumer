import React from 'react';
import { useQuery } from '@apollo/client';
import { PageProps, graphql } from 'gatsby';

import colors from '../../../constants/colors';
import EventDetailPageContent, { Event } from './EventDetailPageContent';
import { ScrollToTop, CenteredLoading, SEO } from '../../Elements';
import { Footer, Header, PageWrapper } from '../../Layout';
import { EVENT_QUERY } from '../../../utils/gqlQueries';

const EventDetailPage: React.FC<PageProps<{}, { event: Event }>> = ({ pageContext: { event } }) => {
  const { data, loading, error } = useQuery(EVENT_QUERY, { variables: { id: event.id } });

  const pageTitle = `${event.name} · ${event.address}`;

  return (
    <>
      <SEO title={pageTitle} description={event.description} image={event.external_img_url} />
      <ScrollToTop />
      <Header withoutBottomBorder />
      <PageWrapper backgroundColor={colors.white}>
        {loading && <CenteredLoading />}
        {error && <div>{error}</div>}
        {data && <EventDetailPageContent event={data.festival as Event} />}
      </PageWrapper>
      <Footer />
    </>
  );
};

export default EventDetailPage;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
