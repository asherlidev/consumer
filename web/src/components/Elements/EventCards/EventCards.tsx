import { isEmpty, range, toInteger } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';
import EventCard from '../EventCard';
import { ApolloCardEvent, CardEvent, GatsbyCardEvent } from '../EventCard/EventCard';
import LoadingEventCard from '../EventCard/LoadingEventCard';
import * as S from './styles';
import { CATEGORIES_QUERY_WITH_IMAGE } from '../../../utils/gqlQueries';
import { useQuery } from '@apollo/client';

export interface EventCardsProps {
  className?: string;
  events: CardEvent[] | undefined;
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

const EventCards: React.FC<EventCardsProps> = ({
  className,
  events,
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
  const empty = isEmpty(events);

  const categoriesQuery = useQuery(CATEGORIES_QUERY_WITH_IMAGE);

  const renderContent = useMemo(() => {
    const categories = categoriesQuery?.data?.categories;

    if (loading) {
      return range(loadingItemsCount).map((index) => <LoadingEventCard key={index} />);
    }
    if (empty) {
      return t('eventCards.noEvents');
    }
    return events?.map((event) => {
      const eventId = toInteger(
        (event as GatsbyCardEvent).strapiId || (event as ApolloCardEvent).id
      );
      const festivalcategories: any[] = event.festivalcategories
        ? event.festivalcategories.map((category: any) => {
            const cat =
              categories && categories.find((c: any) => parseInt(c.id) === parseInt(category.id));

            return {
              ...category,
              cover_image: cat ? cat.cover_image : undefined,
            };
          })
        : [];

      return (
        <EventCard
          key={eventId}
          eventId={eventId}
          event={{ ...event, festivalcategories }}
          type={cardType}
          selected={selectedIds.includes(eventId)}
          toggleCardSelection={toggleCardSelection}
          withoutSubtitle={withoutSubtitles}
        />
      );
    });
  }, [
    cardType,
    empty,
    events?.map,
    loading,
    loadingItemsCount,
    selectedIds,
    t,
    toggleCardSelection,
    withoutSubtitles,
    showWhenEmpty,
    categoriesQuery?.data?.categories,
  ]);

  return loading || (events?.length || 0) > 0 || (events?.length == 0 && showWhenEmpty) ? (
    <S.Container withoutPadding={withoutPadding} className={className} id={htmlId}>
      <S.InnerContainer>
        {title && <S.Title>{`${title} ${userLocation ? userLocation : ''}`}</S.Title>}
        {userLocation ? <Link to="/app/settings/account">Update Location</Link> : ''}
      </S.InnerContainer>
      <EventsWrapper isEmpty={empty}>{renderContent}</EventsWrapper>
    </S.Container>
  ) : null;
};

export default EventCards;
