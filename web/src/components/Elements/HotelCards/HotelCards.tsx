import { isEmpty, range, toInteger } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';
import HotelCard from '../HotelCard';
import LoadingHotelCard from '../HotelCard/LoadingHotelCard';
import * as S from './styles';
import { Hotel } from '../../Pages/HotelDetailPage/index';

export interface HotelCardProps {
  className?: string;
  hotels: Hotel[] | undefined;
  title?: string;
  type?: 'row' | 'grid';
  cardType?: 'link' | 'selectable';
  selectedIds?: number[];
  toggleCardSelection?: (id: number) => void;
  loading?: boolean;
  withoutSubtitles?: boolean;
  withoutPadding?: boolean;
  loadingItemsCount?: number;
  hitsPerPage?: number;
  htmlId?: string;
  userLocation?: string | '';
  showWhenEmpty?: boolean;
}

const HotelCards: React.FC<HotelCardProps> = ({
  className,
  hotels,
  type = 'row',
  cardType = 'link',
  selectedIds = [],
  toggleCardSelection,
  title,
  loading,
  withoutSubtitles = false,
  withoutPadding = false,
  loadingItemsCount = 5,
  htmlId,
  userLocation,
  showWhenEmpty = false,
}) => {
  const { t } = useTranslation();
  const EventsWrapper = type === 'grid' ? S.EventsGrid : S.EventsRow;
  const empty = isEmpty(hotels);

  const renderContent = useMemo(() => {
    if (loading) {
      return range(loadingItemsCount).map((index) => <LoadingHotelCard key={index} />);
    }
    if (empty) {
      return t('eventCards.noEvents');
    }
    return hotels?.map((hotel, index) => {
      return <HotelCard key={index} hotel={hotel} type={cardType} />;
    });
  }, [
    cardType,
    empty,
    hotels?.map,
    loading,
    loadingItemsCount,
    selectedIds,
    t,
    toggleCardSelection,
    withoutSubtitles,
    showWhenEmpty,
  ]);

  return loading || (hotels?.length || 0) > 0 || (hotels?.length == 0 && showWhenEmpty) ? (
    <S.Container withoutPadding={withoutPadding} className={className} id={htmlId}>
      <S.InnerContainer>
        {title && <S.Title>{`${title} ${userLocation ? userLocation : ''}`}</S.Title>}
        {userLocation ? <Link to="/app/settings/account">Update Location</Link> : ''}
      </S.InnerContainer>
      <EventsWrapper isEmpty={empty}>{renderContent}</EventsWrapper>
    </S.Container>
  ) : null;
};

export default HotelCards;
