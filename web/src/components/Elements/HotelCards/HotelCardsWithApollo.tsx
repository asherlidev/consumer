import { useQuery } from '@apollo/client';
import React from 'react';
import { ApolloCardEvent, CardEvent } from '../EventCard/EventCard';
import HotelCards from './HotelCards';

interface EventCardsWithApolloProps {
  apolloQueryArgs: { query: any; variables: Object; skip?: boolean };
  initialEvents?: CardEvent[] | undefined;
  title?: string;
  type?: 'row' | 'grid';
  cardType?: 'link' | 'selectable';
  selectedIds?: number[];
  toggleCardSelection?: (id: number) => void;
  withoutSubtitles?: boolean;
  loadingItemsCount?: number;
}

const EventCardsWithApollo: React.FC<EventCardsWithApolloProps> = ({
  initialEvents,
  apolloQueryArgs: { query, variables, skip = false },
  ...otherProps
}) => {
  const eventsQuery = useQuery<{
    events: ApolloCardEvent[];
  }>(query, {
    variables,
    skip,
    notifyOnNetworkStatusChange: true,
  });

  return (
    <HotelCards
      events={eventsQuery.data?.events || initialEvents}
      loading={eventsQuery.loading}
      {...otherProps}
    />
  );
};

export default EventCardsWithApollo;
