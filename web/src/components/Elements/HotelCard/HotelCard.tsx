import React from 'react';

import { Hotel } from '../../Pages/HotelDetailPage/index';
import LoadingHotelCard from './LoadingHotelCard';
import colors from '../../../constants/colors';
import FlameIcon from './FlameIcon';
import * as S from './styles';

interface Props {
  loading?: boolean;
  hotel?: Hotel;
}

const HotelCard: React.FC<Props> = ({ loading, hotel }) => {
  if (loading || !hotel) return <LoadingHotelCard />;
  return (
    <S.Link to={`/hotels/${stringToSlug(hotel.name)}--${hotel.id}`}>
      <>
        <S.ArtBoxContainer>
          <S.ArtBox
            src={
              (hotel.images &&
                hotel.images.length > 0 &&
                getMidResolutionFeaturedImage(hotel.images[0]?.url || '')) ||
              ''
            }
            loading="lazy"
          />
        </S.ArtBoxContainer>

        <S.ArtBoxTitle>{hotel.name}</S.ArtBoxTitle>
        <RatingComponent rating={hotel.rating} />
      </>
    </S.Link>
  );
};

export default HotelCard;

export const RatingComponent: React.FC<{ rating?: number }> = ({ rating }) => {
  const parsedRating = getRating(rating);

  function getRating(hotelRating?: number) {
    if (!hotelRating) return undefined;

    if (hotelRating > 5 || hotelRating < 0) return undefined;

    return hotelRating;
  }
  return (
    <>
      {parsedRating ? (
        <S.Rating>
          Rating: {parsedRating}/5{' '}
          {[...Array(5)].map((_, index) => {
            const isHalf = index + 1 - parsedRating === 0.5;

            return (
              <div style={{ position: 'relative' }} key={index}>
                <FlameIcon color={'#bbb'} />
                {(index < parsedRating || isHalf) && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: isHalf ? '60%' : '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <FlameIcon color={colors.primary} />
                  </div>
                )}
              </div>
            );
          })}
        </S.Rating>
      ) : (
        <S.Rating>No Ratings Available</S.Rating>
      )}
    </>
  );
};

// UTILS

function getMidResolutionFeaturedImage(imageUrl: string) {
  return imageUrl.replace('_70.jpg', '_300.jpg');
}

export function stringToSlug(str: string) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaeeeeiiiioooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}
