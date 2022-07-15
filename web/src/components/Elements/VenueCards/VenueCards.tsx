import { isEmpty, range, toInteger } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';
import VenueCard from '../VenueCard/VenueCard';
import LoadingEventCard from '../EventCard/LoadingEventCard';
import * as S from './styles';
import { Venue } from '../../Pages/VenueDetailPage';

export interface CardsProps {
  className?: string;
  venues: Venue[] | undefined;
  title?: string;
  type?: 'row' | 'grid';
  cardType?: 'link' | 'selectable';
  loading?: boolean;
  withoutSubtitles?: boolean;
  withoutPadding?: boolean;
  loadingItemsCount?: number;
  hitsPerPage?: number;
  htmlId?: string;
  userLocation?: string | '';
  showWhenEmpty?: boolean;
}

const Cards: React.FC<CardsProps> = ({
  className,
  venues,
  type = 'row',
  cardType = 'link',
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
  const Wrapper = type === 'grid' ? S.Grid : S.Row;
  const empty = isEmpty(venues);

  const renderContent = useMemo(() => {
    if (loading) {
      return range(loadingItemsCount).map((index) => <LoadingEventCard key={index} />);
    }
    if (empty) {
      return t('venueCards.noVenues');
    }
    return venues?.map((venue) => {
      const id = toInteger((venue as Venue).strapiId || (venue as Venue).id);

      return (
        <VenueCard
          key={id}
          id={id}
          venue={venue}
          type={cardType}
          withoutSubtitle={withoutSubtitles}
        />
      );
    });
  }, [cardType, empty, venues?.map, loading, loadingItemsCount, t, withoutSubtitles]);

  return loading || (venues?.length || 0) > 0 || (venues?.length == 0 && showWhenEmpty) ? (
    <S.Container withoutPadding={withoutPadding} className={className} id={htmlId}>
      <S.InnerContainer>
        {title && <S.Title>{`${title} ${userLocation ? userLocation : ''}`}</S.Title>}
        {userLocation ? <Link to="/app/settings/account">Update Location</Link> : ''}
      </S.InnerContainer>
      <Wrapper isEmpty={empty}>{renderContent}</Wrapper>
    </S.Container>
  ) : null;
};

export default Cards;
