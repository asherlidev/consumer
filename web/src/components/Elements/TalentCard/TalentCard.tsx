import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React, { useMemo } from 'react';
import { TalentCardQuery } from '../../../../graphql-types';
import { Talent } from '../../Pages/TalentDetailPage';
import moment from 'moment';
import { FlameIcon } from '../../Icons';
import colors from '../../../constants/colors';
import Chip from '../Chip';

import { RestEvent, RestImage } from '../../../context/user/UserProvider';
import { GalleryImage } from '../../../types/common';
import { getTransformedImageUrl } from '../../../utils/cloudinary';

import * as S from './styles';

interface Props {
  className?: string;
  id: number;
  talent: Talent;
}

const Card: React.FC<Props> = ({ className, talent, id }) => {
  const { t } = useTranslation();

  const data = useStaticQuery<TalentCardQuery>(talentCardQuery);

  const { name, description, image, slug_name } = talent;

  const renderCardContent = useMemo(() => {
    const cloudinaryUrl = getTransformedImageUrl(
      (image as ApolloImage | RestImage | GalleryImage)?.url,
      225
    );

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
      </>
    );
  }, [image, data.eventPlaceholderImage?.childCloudinaryAsset?.fluid, location, name, t]);

  const renderChips = useMemo(
    () => (
      <S.ChipsContainer>
        {
          <Chip
            backgroundColor={colors.primary}
            iconComponent={FlameIcon}
            text={t('eventChips.partner.label')}
            title={t('eventChips.partner.explanation')}
          />
        }
      </S.ChipsContainer>
    ),
    [t]
  );

  return (
    <S.Link key={id} to={`/talent/${slug_name}`} className={className}>
      {renderChips}
      {renderCardContent}
    </S.Link>
  );
};

export default Card;

interface ApolloImage {
  __typename: 'UploadFile';
  id: string;
  url: string;
}

const talentCardQuery = graphql`
  query TalentCard {
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
