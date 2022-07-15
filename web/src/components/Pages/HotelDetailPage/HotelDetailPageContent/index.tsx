import React, { useMemo, useState, useRef } from 'react';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';

import colors from '../../../../constants/colors';
import useWindowDimensions from '../../../../utils/useWindowDimensions';
import { Btn, Title } from '../../../Elements';
import EventShareButton from '../../EventDetailPage/EventShareButton';
import StickyInfo from './StickyInfo';
import AmenitiesSection from './AmenitiesSection';
import { Hotel, Room } from '../index';
import HotelImageGallery from '../HotelImageGallery';
import HotelRecommendedEvents from '../HotelRecommendedEvents';
import { RatingComponent } from '../../../Elements/HotelCard/HotelCard';
import * as Icons from './icons';
import * as S from './styles';
import * as S2 from './styles2';
import HotelDetailSkeleton from '../HotelDetailSkeleton';
import AvailableRoomsSection from './AvailableRoomsSection';
import { searchHotels } from '../../../../utils/gqlQueries';
import HotelInterestButton from '../HotelInterestButton';

const HotelDetailPageContent: React.FC<{ hotel?: Hotel; loading: boolean }> = ({
  hotel,
  loading,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);

  const breakpoints = useBreakpoint();
  const windowDimensions = useWindowDimensions();

  const locationMapWidth = useMemo(() => {
    const PADDING_IN_PX = 20;

    if (breakpoints.lgUp) {
      return 1170 - 2 * PADDING_IN_PX;
    } else if (breakpoints.mdUp) {
      return 970 - 2 * PADDING_IN_PX;
    } else if (breakpoints.smUp) {
      return 750 - 2 * PADDING_IN_PX;
    }
    return (windowDimensions?.width || 750) - 3 * PADDING_IN_PX;
  }, [breakpoints.lgUp, breakpoints.mdUp, breakpoints.smUp, windowDimensions?.width]);

  if (!hotel || loading)
    return (
      <S.Content>
        <HotelDetailSkeleton />
      </S.Content>
    );

  return (
    <div>
      <S.Content>
        <S.Infoheader className="row">
          <div className={'col-md-8 col-xs-12'}>
            <S.TitleContainer>{hotel.name}</S.TitleContainer>
          </div>
        </S.Infoheader>

        <S.EventInfoRow>
          <S.FlexInfoSection>
            <span>
              <img src={Icons.LocationIcon} alt="Location icon" />
              <small>{`${hotel.address.street_address}${
                hotel.address.extended_address ? ' ' + hotel.address.extended_address : ''
              }, ${hotel.address.city}, ${hotel.address.state} ${
                hotel.address.postal_code
              }`}</small>
            </span>
            <span style={{ verticalAlign: 'baseline' }}>
              <RatingComponent rating={hotel.rating} />
            </span>
          </S.FlexInfoSection>

          {breakpoints.smUp && (
            <div>
              <HotelInterestButton color={colors.textDefault} fontSize="14px" hotelId={hotel.id} />
              <EventShareButton />
            </div>
          )}
        </S.EventInfoRow>

        <S2.HotelImageContainer>
          <HotelImageGallery hotel={hotel} />
        </S2.HotelImageContainer>

        {!breakpoints.smUp && (
          <div>
            <HotelInterestButton color={colors.textDefault} fontSize="14px" hotelId={hotel.id} />
            <Btn
              img={Icons.ShareIcon}
              background={colors.transparent}
              color={colors.textDefault}
              height="40px"
              fontSize="20px"
            >
              Share
            </Btn>
          </div>
        )}
        <S2.ContentContainer>
          <S2.Info>
            <S2.DescriptionTitle>Details</S2.DescriptionTitle>
            <S2.DescriptionContent>{hotel.description}</S2.DescriptionContent>
            <AmenitiesSection hotel={hotel} />
            <AvailableRoomsSection hotel={hotel} onSelectClick={setSelectedRoom} />
          </S2.Info>
          <StickyInfo hotel={hotel} room={selectedRoom} />
        </S2.ContentContainer>

        <S.EventLocationMap
          src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+F50756(${
            hotel.longitude
          },${hotel.latitude})/${hotel.longitude},${
            hotel.latitude
          },${14},0/${locationMapWidth}x400?access_token=${process.env.GATSBY_MAPBOX_KEY}`}
          height="400"
          width={locationMapWidth}
          alt={'location'}
        />
      </S.Content>

      <S.Content>
        <S.RecommendedEventsContainer>
          <S.RecommendedEventsTitle>
            <Title>Recommended Events</Title>
          </S.RecommendedEventsTitle>
          <HotelRecommendedEvents
            coords={{ latitude: hotel.latitude, longitude: hotel.longitude }}
          />
        </S.RecommendedEventsContainer>
      </S.Content>
    </div>
  );
};

export default HotelDetailPageContent;
