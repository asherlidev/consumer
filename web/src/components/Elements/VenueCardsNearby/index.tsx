import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocationData } from '../../../context/location-data';
import { useUser } from '../../../context/user/UserProvider';
import VenueCards from '../VenueCards/VenueCards';
import { CardsProps } from '../VenueCards/VenueCards';
import { Venue } from '../../Pages/VenueDetailPage';

const VenueCardsNearby: React.FC<Partial<CardsProps>> = (props) => {
  const [venues, setVenues] = useState<Venue[]>([]);
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

  const fetchNearby = useCallback(async () => {
    const algolia = (await import('../../../utils/algoliaClient')).venues;
    if (lat && lng) {
      toggleLoading(true);
      try {
        const { hits } = await algolia.search<Venue>('', {
          aroundLatLng: `${lat},${lng}`,
          aroundRadius: 400000,
          hitsPerPage: props.hitsPerPage || 20,
        });
        setVenues(hits);
      } catch (error) {
        console.error(error);
      }
      toggleLoading(false);
    }
  }, [props.hitsPerPage, lat, lng]);

  useEffect(() => {
    fetchNearby();
  }, [fetchNearby]);

  return (
    <VenueCards
      title={t('eventCardsNearby.title')}
      userLocation={user?.zipcode}
      venues={venues}
      htmlId="nearby-events"
      loading={loadingBrowserLocation || loading}
      {...props}
    />
  );
};

export default VenueCardsNearby;
