import React, { useState } from 'react';
import { navigate } from 'gatsby';

import { stringToSlug } from '../../../Elements/HotelCard/HotelCard';
import { Hotel } from '../../HotelDetailPage';
import * as S from './styles';

const HotelMapMarker: React.FC<{
  lat: number;
  lng: number;
  hotel: Hotel;
  index: number;
  hovered: number;
  setHovered: (idx: number) => void;
}> = ({ hotel, index, hovered, setHovered }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        style={{ margin: 0, background: 'none', padding: 0 }}
        onClick={() => {
          setIsOpen(true);
        }}
        onBlur={(e) => {
          // @ts-ignore
          if (e.relatedTarget?.id + '' !== hotel.id + '') {
            setIsOpen(false);
          }
          setHovered(-1);
        }}
      >
        <img
          src={
            'https://www.pinclipart.com/picdir/big/359-3598915_map-marker-icon-location-icon-png-clipart.png'
          }
          style={{
            width: '28px',
            height: '36px',
            transform: 'translateX(-50%) translateY(-100%)',
          }}
        ></img>
      </button>
      <button
        id={hotel.id + ''}
        style={{
          display: isOpen || index === hovered ? 'block' : 'none',
          position: 'absolute',
          bottom: '70px',
          left: '-120px',
          padding: 0,
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'white',
          zIndex: 1,
        }}
        onClick={() => navigate(`/hotels/${stringToSlug(hotel.name)}--${hotel.id}`)}
      >
        <HotelPopoverContent hotel={hotel} />
      </button>
    </div>
  );
};

const HotelPopoverContent: React.FC<{
  hotel: Hotel;
}> = ({ hotel }) => {
  return (
    <div style={{ width: '240px', height: '170px', padding: 0 }}>
      <img
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src={hotel.images.length > 0 ? getMidResolutionFeaturedImage(hotel.images[0].url) : ''}
      />
      <div
        style={{
          position: 'absolute',
          color: 'white',
          width: '100%',
          height: '50%',
          bottom: 0,
          background:
            'linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.5) 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 'min-content',
            padding: '0 12px',
          }}
        >
          <S.HotelName>{hotel.name}</S.HotelName>
          <p>{hotel.address.city}</p>
        </div>
      </div>
    </div>
  );
};

export default HotelMapMarker;

// Utils

function getMidResolutionFeaturedImage(imageUrl: string) {
  return imageUrl.replace('_70.jpg', '_300.jpg');
}
