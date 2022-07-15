import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useLocationData } from '../../../context/location-data';
import { RestEvent, useUser } from '../../../context/user/UserProvider';
import getFacetFilters from '../../../utils/getAlgoliaUserInterestFacetFilters';
import EventCards from '../EventCards';
import { EventCardsProps } from '../EventCards/EventCards';

const EventCardsNearby: React.FC<Partial<EventCardsProps>> = (props) => {
  const [events, setEvents] = useState<RestEvent[]>([]);
  const [loading, toggleLoading] = useState<boolean>(false);
  const { browserLocationData, loadingBrowserLocation } = useLocationData();
  const { user } = useUser();
  const { t } = useTranslation();

  let { lat, lng } = user?.geolocation ? user.geolocation : { lat: 0, lng: 0 };

  if (!lat && !lng && browserLocationData) {
    const { latitude, longitude } = browserLocationData.coords;
    lat = latitude;
    lng = longitude;
  }

  const fetchNearbyEvents = useCallback(async () => {
    let now = moment().unix();
    const algolia = (await import('../../../utils/algoliaClient')).events;
    if (lat && lng) {
      toggleLoading(true);
      try {
        const { hits } = await algolia.search<RestEvent>('', {
          aroundLatLng: `${lat},${lng}`,
          aroundRadius: 60000,
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
    } else if (browserLocationData) {
      const { latitude: lat, longitude: lng } = browserLocationData.coords;
      toggleLoading(true);
      try {
        const { hits } = await algolia.search<RestEvent>('', {
          aroundLatLng: `${lat},${lng}`,
          aroundRadius: 60000,
          facetFilters: getFacetFilters(user?.interests ?? []),
          hitsPerPage: props.hitsPerPage || 20,
          filters: `start_timestamp > ${now}`,
        });
        setEvents(hits);
      } catch (error) {
        console.error(error);
      }
      toggleLoading(false);
    }
  }, [browserLocationData, props.hitsPerPage, user]);

  useEffect(() => {
    fetchNearbyEvents();
  }, [fetchNearbyEvents]);

  return (
    <EventCards
      title={t('eventCardsNearby.title')}
      userLocation={user?.zipcode}
      events={events}
      htmlId="nearby-events"
      loading={loadingBrowserLocation || loading}
      {...props}
    />
  );
};

export default EventCardsNearby;
