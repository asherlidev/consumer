import React from 'react';
import Skeleton from 'react-loading-skeleton';
import colors from '../../../constants/colors';

import { Hotel } from '../../Pages/HotelDetailPage';
import FlameIcon from '../HotelCard/FlameIcon';
import { stringToSlug } from '../HotelCard/HotelCard';
import * as S from './styles';

const HotelSearchItem: React.FC<{
  hotel?: Hotel;
  loading?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  queryParams?: string;
}> = ({ hotel, loading, onEnter, onLeave, queryParams }) => {
  if (loading)
    return (
      <S.Root>
        <Skeleton style={{ borderRadius: '16px', width: '300px', height: '200px' }} />
        <S.Info>
          <Skeleton style={{ width: '100px', height: '18px', marginBottom: '18px' }} />
          <Skeleton style={{ width: '200px', height: '24px' }} />
        </S.Info>
      </S.Root>
    );

  if (hotel) {
    function getRating(hotelRating?: number) {
      if (!hotelRating) return undefined;

      if (hotelRating > 5 || hotelRating < 0) return undefined;

      return hotelRating;
    }

    const parsedRating = getRating(hotel.rating);

    return (
      <S.Link
        to={`/hotels/${stringToSlug(hotel.name)}--${hotel.id}?${queryParams}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <S.Root>
          <S.CoverImage
            src={hotel.images.length > 0 ? getMidResolutionFeaturedImage(hotel.images[0].url) : ''}
          />
          <S.Content>
            <S.Info>
              <S.Location>{`${hotel.address.city}, ${hotel.address.state}`}</S.Location>
              <S.Heading>{hotel.name}</S.Heading>
              <S.Divider />
              <div style={{ textTransform: 'capitalize' }}>
                {`${hotel.address.street_address}, ${hotel.address.city}, ${hotel.address.state} ${hotel.address.postal_code}`.toLowerCase()}
              </div>
              {/* <S.Amenities>
                Search Hotels don't have amenities on them.  We need to axios.get the data from each Detailed Hotel (which gql will merge into the correct one)
                and then display the amenities that way.  This should display a loading skeleton for the amenities until its loaded.  Don't have time for that rn.
                {hotel.amenities &&
                  hotel.amenities
                    .slice(0, 3)
                    .map((a) => a.name)
                    .join(' | ') +
                    (hotel.amenities.length > 3 ? ` + ${hotel.amenities.length - 3} more` : '')}
              </S.Amenities> */}
            </S.Info>
            <S.Review>
              <FlameIcon color={colors.primary} style={{ marginRight: 6 }} />
              {parsedRating ? `${parsedRating}/5` : 'No ratings yet'}
            </S.Review>
          </S.Content>
        </S.Root>
      </S.Link>
    );
  }

  return <div />;
};

export default HotelSearchItem;

// Utils

function getMidResolutionFeaturedImage(imageUrl: string) {
  return imageUrl.replace('_70.jpg', '_300.jpg');
}
