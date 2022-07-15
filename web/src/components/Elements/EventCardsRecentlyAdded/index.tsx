import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { RestEvent, useUser } from '../../../context/user/UserProvider';
import getFacetFilters from '../../../utils/getAlgoliaUserInterestFacetFilters';
import EventCards from '../EventCards';
import { EventCardsProps } from '../EventCards/EventCards';

const EventCardsRecentlyAdded: React.FC<Partial<EventCardsProps>> = (props) => {
  const [events, setEvents] = useState<RestEvent[]>([]);
  const [loading, toggleLoading] = useState<boolean>(false);
  const { user } = useUser();
  const { t } = useTranslation();

  const fetchRecentlyAddedEvents = useCallback(async () => {
    const algolia = (await import('../../../utils/algoliaClient')).default;
    toggleLoading(true);
    let now = moment().subtract(7, 'days').unix();
    try {
      await algolia.setSettings({
        customRanking: ['asc(created_at_timestamp)', 'asc(start_timestamp)'],
      });
      const { hits } = await algolia.search<RestEvent>('', {
        facetFilters: getFacetFilters(user?.interests ?? []).concat([
          'isActive: true',
          'start_timestamp:-0',
        ]),
        hitsPerPage: props.hitsPerPage || 20,
        filters: `start_timestamp > ${now}`,
      });
      setEvents(hits);
    } catch (error) {
      console.error(error);
    }
    toggleLoading(false);
  }, [user?.interests]);

  useEffect(() => {
    fetchRecentlyAddedEvents();
  }, [fetchRecentlyAddedEvents]);

  return (
    <EventCards
      title={t('eventCardsRecentlyAdded.title')}
      events={events}
      loading={loading}
      htmlId="recent-events"
      {...props}
    />
  );
};

export default EventCardsRecentlyAdded;
