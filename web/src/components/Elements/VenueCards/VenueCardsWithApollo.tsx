import { useQuery } from '@apollo/client';
import React from 'react';
import { Venue } from '../../Pages/VenueDetailPage';
import VenueCards from './VenueCards';

interface VenueCardsWithApolloProps {
  apolloQueryArgs: { query: any; variables: Object; skip?: boolean };
  title?: string;
  type?: 'row' | 'grid';
  cardType?: 'link' | 'selectable';
  selectedIds?: number[];
  toggleCardSelection?: (id: number) => void;
  withoutSubtitles?: boolean;
  loadingItemsCount?: number;
}

const VenueCardsWithApollo: React.FC<VenueCardsWithApolloProps> = ({
  apolloQueryArgs: { query, variables, skip = false },
  ...otherProps
}) => {
  const results = useQuery<{
    venues: Venue[];
  }>(query, {
    variables,
    skip,
    notifyOnNetworkStatusChange: true,
  });

  return <VenueCards venues={results.data?.venues} loading={results.loading} {...otherProps} />;
};

export default VenueCardsWithApollo;
