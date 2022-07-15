import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { head, isEmpty } from 'lodash';
import moment from 'moment';
import React, { useMemo } from 'react';
import {
  EventCardQuery,
  Maybe,
  StrapiFestival,
  StrapiFestivalFestivalcategories,
} from '../../../../graphql-types';
import colors from '../../../constants/colors';
import { RestEvent, RestImage } from '../../../context/user/UserProvider';
import { GalleryImage } from '../../../types/common';
import { getTransformedImageUrl } from '../../../utils/cloudinary';
import { isVirtualEvent } from '../../../utils/eventUtils';
import { FlameIcon } from '../../Icons';
import { GatsbyInterest } from '../../Pages/app/AddInterestsPage';
import checked from '../../Pages/app/EventFormPage/EventForm/utils/CheckboxField/checked.svg';
import { Category } from '../../Pages/EventDetailPage/EventDetailPageContent';
import Chip from '../Chip';
import * as S from './styles';

interface Props {
  className?: string;
  linkTo?: string;
  eventId: number;
  event: CardEvent;
  type?: 'link' | 'selectable';
  selected?: boolean;
  toggleCardSelection?: (id: number) => void;
  withoutSubtitle?: boolean;
  withoutLabels?: boolean;
}

const EventCard: React.FC<Props> = ({
  className,
  linkTo,
  eventId,
  event,
  selected,
  toggleCardSelection,
  withoutSubtitle = false,
  type = 'link',
}) => {
  const { t } = useTranslation();

  const data = useStaticQuery<EventCardQuery>(eventCardQuery);

  const {
    start,
    end,
    updated_at,
    slug_name,
    cover_image,
    isConfirmed,
    name,
    location,
    festivalcategories,
  } = event;

  // TODO: Verify if we need to use moment.utc(start)
  const startDate = start
    ? moment(start).format('MMM DD YYYY, hh:mma')
    : t('eventDetailPageContent.date.placeholder');
  const endDate = end
    ? moment(end).format('MMM DD YYYY, hh:mma')
    : t('eventDetailPageContent.date.placeholder');
  const timestamp = moment(updated_at).format();
  const weekAgo = moment().utc().subtract(1, 'w').format();

  const isInterest = useMemo(
    () => (event as GatsbyInterest)?.__typename === 'StrapiInterest',
    [event]
  );

  const renderCardContent = useMemo(() => {
    const category = festivalcategories?.find((item: any) => item.cover_image?.url);

    const cloudinaryUrl =
      getTransformedImageUrl((cover_image as ApolloImage | RestImage | GalleryImage)?.url, 225) ||
      category?.cover_image?.url;

    return (
      <>
        <S.ArtBoxContainer>
          {cloudinaryUrl ? (
            <S.NonGatsbyArtBox backgroundUrl={cloudinaryUrl} />
          ) : (
            <S.ArtBox
              fluid={data.eventPlaceholderImage?.childCloudinaryAsset?.fluid as FluidObject}
            />
          )}
        </S.ArtBoxContainer>

        <S.ArtBoxTitle>{name}</S.ArtBoxTitle>

        {!withoutSubtitle && (
          <span>
            <S.ArtBoxSubTitle>
              {isVirtualEvent(location)
                ? t('eventCard.virtual')
                : location || t('eventCard.noLocation')}
            </S.ArtBoxSubTitle>
            <S.ArtBoxSubTitle>{startDate}</S.ArtBoxSubTitle>
          </span>
        )}
      </>
    );
  }, [
    cover_image,
    data.eventPlaceholderImage?.childCloudinaryAsset?.fluid,
    event,
    location,
    name,
    startDate,
    t,
    withoutSubtitle,
  ]);

  const renderChips = useMemo(
    () => (
      <S.ChipsContainer>
        {isConfirmed && (
          <Chip
            backgroundColor={colors.primary}
            iconComponent={FlameIcon}
            text={t('eventChips.partner.label')}
            title={t('eventChips.partner.explanation')}
          />
        )}
        {timestamp > weekAgo && <Chip backgroundColor={colors.blue} text={t('eventChips.new')} />}
      </S.ChipsContainer>
    ),
    [isConfirmed, t, timestamp, weekAgo]
  );

  const renderCategoryChip = useMemo(
    () =>
      !isEmpty((event as GatsbyCardEvent | ApolloCardEvent).festivalcategories) ? (
        <S.CategoryChip>
          {!isEmpty((event as GatsbyCardEvent | ApolloCardEvent).festivalcategories) &&
            (head((event as GatsbyCardEvent | ApolloCardEvent).festivalcategories) as Category)
              .name}
        </S.CategoryChip>
      ) : null,
    [event]
  );

  if (type === 'selectable') {
    return (
      <S.SelectableCard
        key={eventId}
        className={className}
        onClick={() => {
          toggleCardSelection && toggleCardSelection(eventId);
        }}
      >
        {selected && <S.CheckedCircleImage src={checked} width="32" alt="Checked circle" />}
        {!isInterest && renderChips}
        {!isInterest && renderCategoryChip}
        {renderCardContent}
      </S.SelectableCard>
    );
  }

  return (
    <S.a key={eventId} href={`events/${slug_name}`} className={className} target="_blank">
      {!isInterest && renderChips}
      {!isInterest && renderCategoryChip}
      {renderCardContent}
    </S.a>
  );
};

export default EventCard;

//
// Utils
//

interface BaseCardEvent {
  start: string;
  end: string;
  updated_at: string;
  slug_name: string;
  festivalcategories: Category[];
  isConfirmed: boolean;
  name: string;
  location: string;
}

export type GatsbyCardEvent = { __typename: 'StrapiFestival' } & Pick<
  StrapiFestival,
  'strapiId' | 'start' | 'end' | 'updated_at' | 'slug_name' | 'isConfirmed' | 'name' | 'location'
> & {
    cover_image?: Maybe<{
      url: string;
    }>;
    festivalcategories?: Maybe<Array<Maybe<Pick<StrapiFestivalFestivalcategories, 'id' | 'name'>>>>;
  };

interface ApolloImage {
  __typename: 'UploadFile';
  id: string;
  url: string;
}

export interface ApolloCardEvent extends BaseCardEvent {
  __typename: 'Festival';
  id: string;
  cover_image: Maybe<ApolloImage>; // TODO: double check
}

export type CardEvent = GatsbyCardEvent | ApolloCardEvent | RestEvent | GatsbyInterest;

const eventCardQuery = graphql`
  query EventCard {
    eventPlaceholderImage: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "event-placeholder.jpg" }
    ) {
      childCloudinaryAsset {
        fluid(maxWidth: 225) {
          ...CloudinaryAssetFluid
        }
      }
    }
  }
`;
