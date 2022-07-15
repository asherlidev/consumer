import { useQuery } from '@apollo/client';
import React from 'react';

import { searchHotels } from '../../../utils/gqlQueries';
import HotelCards from '../HotelCards';

const RecommendedHotelsCards: React.FC<{ coords?: { latitude: number; longitude: number } }> = ({
  coords,
}) => {
  const { data: hotelResults, loading } = useQuery(
    searchHotels({
      latitude: coords?.latitude || 0,
      longitude: coords?.longitude || 0,
      radius: 10,
    })
  );

  return <HotelCards hotels={hotelResults?.hotels} loading={loading} withoutPadding />;
};

export default RecommendedHotelsCards;
