import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { head } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { GatsbyEventImageGalleryQuery } from '../../../../../graphql-types';
import zIndex from '../../../../constants/zIndex';
import { CloudinaryImage, GalleryImage } from '../../../../types/common';
import { GatsbyEvent } from '../EventDetailPageContent';
import PlayYoutubeVideoButton from '../PlayYoutubeVideoButton';
import * as S from './styles';

interface Props {
  className?: string;
  event: GatsbyEvent;
}

const GatsbyEventImageGallery: React.FC<Props> = ({
  className,
  event: { videoThumbnail, cover_image, video_url, gallery },
}) => {
  const breakpoints = useBreakpoint();
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const data = useStaticQuery<GatsbyEventImageGalleryQuery>(gatsbyEventImageGalleryQuery);

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  };

  const images = useMemo(() => {
    let list: Array<CloudinaryImage | GalleryImage> = [];

    if (videoThumbnail) {
      list = [videoThumbnail];
    }

    if (cover_image) {
      list = [...list, cover_image];
    }

    if (gallery) {
      list = [...list, ...gallery];
    }

    return list;
  }, [cover_image, gallery, videoThumbnail]);

  const getFluidImage = useCallback(
    (image: CloudinaryImage | undefined): FluidObject =>
      image?.childCloudinaryAsset?.fluid || data.eventPlaceholderImage?.childCloudinaryAsset?.fluid,
    [data.eventPlaceholderImage?.childCloudinaryAsset?.fluid]
  );

  const getImageProps = useCallback(
    (img: CloudinaryImage | GalleryImage) =>
      img?.url
        ? { as: 'img', src: img.url }
        : {
            fluid: getFluidImage(img),
          },
    [getFluidImage]
  );

  const getImageSrc = useCallback(
    (img: CloudinaryImage | GalleryImage) => img?.url || getFluidImage(img).src,
    [getFluidImage]
  );

  // TODO: handle case where 'main' image comes from the gallery

  return (
    <div className={className}>
      {images.length > 4 ? (
        <S.GalleryWrapper className="row">
          <S.RelativeContainer className="col-lg-6">
            {video_url && <PlayYoutubeVideoButton youtubeVideoUrl={video_url} />}
            <S.ClickableWrapper onClick={() => selectImage(0)}>
              <S.CoverImage multiple {...getImageProps(head(images))} />
            </S.ClickableWrapper>
          </S.RelativeContainer>
          {breakpoints.lgUp && (
            <S.GalleryContainer className="col-lg-6">
              {images.map((img, idx: number) => {
                if (idx > 0 && idx < 5) {
                  return (
                    <a key={idx} onClick={() => selectImage(idx)}>
                      <S.GalleryImage {...getImageProps(img)} />
                    </a>
                  );
                }
                return null;
              })}
            </S.GalleryContainer>
          )}
        </S.GalleryWrapper>
      ) : (
        <S.RelativeContainer>
          {video_url && <PlayYoutubeVideoButton youtubeVideoUrl={video_url} />}
          <S.ClickableWrapper onClick={() => selectImage(0)}>
            <S.CoverImage {...getImageProps(head(images))} />
          </S.ClickableWrapper>
        </S.RelativeContainer>
      )}

      {showLightbox && (
        <Lightbox
          mainSrc={getImageSrc(images[currentImageIndex])}
          nextSrc={getImageSrc(images[(currentImageIndex + 1) % images.length])}
          prevSrc={getImageSrc(images[(currentImageIndex + images.length - 1) % images.length])}
          onCloseRequest={() => setShowLightbox(false)}
          clickOutsideToClose={false}
          onMovePrevRequest={() =>
            setCurrentImageIndex(
              (prevImageIndex) => (prevImageIndex + images.length - 1) % images.length
            )
          }
          onMoveNextRequest={() =>
            setCurrentImageIndex((prevImageIndex) => (prevImageIndex + 1) % images.length)
          }
          reactModalStyle={{
            zIndex: zIndex.lightbox,
          }}
        />
      )}
    </div>
  );
};

export default GatsbyEventImageGallery;

//
// Utils
//

const gatsbyEventImageGalleryQuery = graphql`
  query GatsbyEventImageGallery {
    eventPlaceholderImage: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "event-placeholder.jpg" }
    ) {
      childCloudinaryAsset {
        fluid {
          ...CloudinaryAssetFluid
        }
      }
    }
  }
`;
