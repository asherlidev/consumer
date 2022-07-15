import { head, isEmpty, map } from 'lodash';
import React, { useMemo, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import zIndex from '../../../../constants/zIndex';
import { getYoutubeVideoId } from '../../../../utils/youtube';
import { PreviewEvent } from '../EventDetailPageContent';
import PlayYoutubeVideoButton from '../PlayYoutubeVideoButton';
import * as S from './styles';

interface Props {
  className?: string;
  event: Partial<PreviewEvent>;
}

const PreviewEventImageGallery: React.FC<Props> = ({
  className,
  event: { cover_image, video_url, gallery },
}) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const youtubeVideoThumbnailUrl = useMemo(() => {
    const youtubeVideoId = getYoutubeVideoId(video_url);
    return youtubeVideoId ? `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg` : null;
  }, [video_url]);

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  };

  const images = useMemo(() => {
    let list: string[] = [];

    if (youtubeVideoThumbnailUrl) {
      list = [youtubeVideoThumbnailUrl];
    }

    if (cover_image?.url) {
      list = [...list, cover_image?.url];
    }

    if (gallery) {
      list = [...list, ...map(gallery, 'url')];
    }

    if (isEmpty(list)) {
      list = [
        ...list,
        'https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1569456634/fp-content/default-share-image-5_3x_viqmie.jpg',
      ];
    }

    return list;
  }, [cover_image?.url, gallery, youtubeVideoThumbnailUrl]);

  return (
    <S.Container className={className}>
      {video_url && <PlayYoutubeVideoButton youtubeVideoUrl={video_url} />}
      <S.ClickableWrapper onClick={() => selectImage(0)}>
        <S.CoverImage backgroundUrl={head(images) as string} />
      </S.ClickableWrapper>

      {showLightbox && (
        <Lightbox
          mainSrc={images[currentImageIndex]}
          nextSrc={images[(currentImageIndex + 1) % images.length]}
          prevSrc={images[(currentImageIndex + images.length - 1) % images.length]}
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
    </S.Container>
  );
};

export default PreviewEventImageGallery;
