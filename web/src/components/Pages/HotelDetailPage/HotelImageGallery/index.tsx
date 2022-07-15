import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import zIndex from '../../../../constants/zIndex';
import { Hotel } from '../index';
import * as S from './styles';

interface Props {
  className?: string;
  hotel: Hotel;
}

const HotelImageGallery: React.FC<Props> = ({ hotel: { images } }) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  };

  function getHighResImg(imageUrl: string) {
    return imageUrl.replace('_300.jpg', '_804480.jpg');
  }

  return (
    <>
      <S.Container>
        {images.length > 4 ? (
          <S.GalleryWrapper>
            <S.CoverImageContainer onClick={() => selectImage(0)}>
              <S.CoverImage
                src={getHighResImg(images[0].url)}
                loading="lazy"
                style={{ transition: '0.2s' }}
              />
            </S.CoverImageContainer>

            {images.map((_, idx: number) => {
              if (idx > 0 && idx < 5) {
                return (
                  <S.GalleryImage
                    key={idx}
                    src={getHighResImg(images[idx].url)}
                    onClick={() => selectImage(idx)}
                  />
                );
              }
              return;
            })}
          </S.GalleryWrapper>
        ) : (
          <S.CoverImage
            src={getHighResImg(images[0].url)}
            loading="lazy"
            onClick={() => selectImage(0)}
          />
        )}
      </S.Container>
      {showLightbox && (
        <Lightbox
          mainSrc={getHighResImg(images[currentImageIndex].url)}
          nextSrc={getHighResImg(images[(currentImageIndex + 1) % images.length].url)}
          prevSrc={getHighResImg(
            images[(currentImageIndex + images.length - 1) % images.length].url
          )}
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
    </>
  );
};

export default HotelImageGallery;
