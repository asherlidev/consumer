import React from 'react';
import Skeleton from 'react-loading-skeleton';

import * as S from './styles';

const HotelDetailSkeleton: React.FC = () => {
  return (
    <div style={{ paddingTop: '36px' }}>
      <S.Heading>
        <Skeleton width={'100%'} height={40} />
      </S.Heading>
      <div>
        <Skeleton width={200} height={20} />
      </div>
      <div style={{ paddingBottom: '20px' }}>
        <Skeleton width={'100%'} height={400} style={{ borderRadius: '20px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <S.InfoSection>
          <S.Description style={{ paddingBottom: '18px' }}>
            <Skeleton width={'100%'} height={80} />
          </S.Description>
          <div style={{ paddingBottom: '18px' }}>
            <Skeleton width={300} height={40} />
          </div>
          <div style={{ paddingBottom: '12px' }}>
            <Skeleton width={'100%'} height={20} />
          </div>
          <div style={{ paddingBottom: '12px' }}>
            <Skeleton width={'100%'} height={20} />
          </div>
          <div style={{ paddingBottom: '12px' }}>
            <Skeleton width={'100%'} height={20} />
          </div>
          <div style={{ paddingBottom: '12px' }}>
            <Skeleton width={'100%'} height={20} />
          </div>
          <div style={{ paddingBottom: '12px' }}>
            <Skeleton width={'100%'} height={20} />
          </div>
        </S.InfoSection>
        <S.BookingSection>
          <Skeleton width={400} height={300} />
        </S.BookingSection>
      </div>
    </div>
  );
};

export default HotelDetailSkeleton;
