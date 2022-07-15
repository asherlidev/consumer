import moment from 'moment';
import React, { useState, useCallback, useEffect } from 'react';

import EventsCards from '../../../Elements/EventCards';

type Coordinates = { latitude: number; longitude: number };

const HotelRecommendedEvents: React.FC<{ coords: Coordinates }> = ({ coords }) => {
  const [recommendedEvents, setRecommendedEvents] = useState<any>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  const fetchCityLocationEvents = useCallback(async () => {
    try {
      const algolia = (await import('../../../../utils/algoliaClient')).events;
      setIsLoadingEvents(true);
      await algolia.setSettings({
        customRanking: ['asc(start_timestamp)'],
      });
      const { hits } = await algolia.search('', getAlgoliaSearchConfig(coords));
      setRecommendedEvents(hits);
    } catch (error) {
      console.error(error);
    }
    setIsLoadingEvents(false);
  }, []);

  useEffect(() => {
    fetchCityLocationEvents();
  }, [fetchCityLocationEvents]);

  return <EventsCards loading={isLoadingEvents} events={recommendedEvents} withoutPadding />;
};

export default HotelRecommendedEvents;

// UTILS
let now = moment().unix();

const getAlgoliaSearchConfig = ({ latitude, longitude }: Coordinates) => ({
  aroundLatLng: `${latitude},${longitude}`,
  aroundRadius: 400000,
  facetFilters: ['isActive: true', 'start_timestamp:-0'],
  filters: `start_timestamp > ${now}`,
});
