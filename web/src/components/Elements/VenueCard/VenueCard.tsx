import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import moment from 'moment';
import React, { useMemo } from 'react';
import { VenueCardQuery } from '../../../../graphql-types';
import colors from '../../../constants/colors';
import { RestImage } from '../../../context/user/UserProvider';
import { CloudinaryImage, GalleryImage } from '../../../types/common';
import { getTransformedImageUrl } from '../../../utils/cloudinary';
import { FlameIcon } from '../../Icons';
import { Venue } from '../../Pages/VenueDetailPage';
import Chip from '../Chip';
import * as S from './styles';

interface Props {
  className?: string;
  linkTo?: string;
  id: number;
  venue: Venue;
  type?: 'link' | 'selectable';
  withoutSubtitle?: boolean;
}

const Card: React.FC<Props> = ({ className, linkTo, id, venue, withoutSubtitle = false }) => {
  const { t } = useTranslation();

  const data = useStaticQuery<VenueCardQuery>(venueCardQuery);

  const { updated_at, slug_name, cover_image, isConfirmed, name, address } = venue;

  const locationText = useMemo(() => {
    if (!address) {
      return undefined;
    }
    const { street_address, city, state, extended_address } = address;
    if (street_address || city || state || extended_address) {
      return `${street_address} ${extended_address}, ${city}, ${state}`;
    } else {
      return undefined;
    }
  }, [address]);

  const timestamp = moment(updated_at).format();
  const weekAgo = moment().utc().subtract(1, 'w').format();

  const renderCardContent = useMemo(() => {
    const cloudinaryUrl = getTransformedImageUrl(
      (cover_image as ApolloImage | RestImage | GalleryImage | CloudinaryImage)?.url,
      225
    );

    return (
      <>
        <S.ArtBoxContainer>
          {cloudinaryUrl ? (
            <S.NonGatsbyArtBox backgroundUrl={cloudinaryUrl} />
          ) : (
            <S.ArtBox
              fluid={data.venuePlaceholderImage?.childCloudinaryAsset?.fluid as FluidObject}
            />
          )}
        </S.ArtBoxContainer>

        <S.ArtBoxTitle>{name}</S.ArtBoxTitle>

        {!withoutSubtitle && (
          <span>
            <S.ArtBoxSubTitle>{locationText}</S.ArtBoxSubTitle>
          </span>
        )}
      </>
    );
  }, [
    cover_image,
    data.venuePlaceholderImage?.childCloudinaryAsset?.fluid,
    venue,
    location,
    name,
    t,
    withoutSubtitle,
    locationText,
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

  return (
    <S.Link key={id} to={linkTo || `/venues/${slug_name}`} className={className}>
      {renderChips}
      {renderCardContent}
    </S.Link>
  );
};

export default Card;

//
// Utils
//

interface ApolloImage {
  __typename: 'UploadFile';
  id: string;
  url: string;
}

const venueCardQuery = graphql`
  query VenueCard {
    venuePlaceholderImage: file(
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
