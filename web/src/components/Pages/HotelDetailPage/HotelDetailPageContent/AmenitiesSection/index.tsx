import React, { useState } from 'react';

import { Hotel } from '../..';
import * as S from './styles';

const AmenitiesSection: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const [isOpen, setIsOpen] = useState(false);

  // This calculates the max height of the amenities container based on the number of amenities
  // and their height.  Pretty hacky, but transitions using relative heights isn't supported.
  const maxHeight = (hotel.amenities.length || 0) * 45;

  const numOfAmenities = hotel.amenities?.length;

  return (
    <div>
      <S.AmenitiesHeader>
        Amenities&nbsp;
        <span style={{ fontSize: 12, color: 'gray' }}>({numOfAmenities || 0} total)</span>
      </S.AmenitiesHeader>
      <S.AmenitiesContainer
        style={{
          maxHeight: isOpen ? `${maxHeight}px` : '230px',
          transition: 'all 1s',
        }}
      >
        {hotel.amenities?.map((amenity, index: number) => {
          return <S.Amenity key={index}>{amenity.name}</S.Amenity>;
        })}
      </S.AmenitiesContainer>
      {numOfAmenities > 10 && (
        <S.ShowMoreButton onClick={() => setIsOpen(!isOpen)}>
          Show {isOpen ? 'Less' : 'More'}{' '}
        </S.ShowMoreButton>
      )}
    </div>
  );
};

export default AmenitiesSection;
