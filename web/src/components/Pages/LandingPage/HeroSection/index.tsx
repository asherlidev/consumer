import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { get, range } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalVideo from 'react-modal-video';
import Slider from 'react-slick';
import { HeroSectionQuery } from '../../../../../graphql-types';
import playVideoIcon from './playVideoIcon.svg';
import * as S from './styles';

interface Props {
  className?: string;
  heroImage?: FluidObject;
}

const HeroSection: React.FC<Props> = ({ className, heroImage }) => {
  const { t } = useTranslation();
  const [isVideoModalOpened, setIsVideoModalOpened] = useState(false);
  const data = useStaticQuery<HeroSectionQuery>(heroSectionQuery);

  return (
    <S.Section className={className}>
      <ModalVideo
        channel="youtube"
        isOpen={isVideoModalOpened}
        videoId="OFktXAW1sqE"
        onClose={() => setIsVideoModalOpened(false)}
      />

      {heroImage ? (
        <S.CarouselImage fluid={heroImage} />
      ) : (
        <Slider {...sliderSettings}>
          {range(1, 5).map((nr) => (
            <S.CarouselImage
              key={nr}
              fluid={get(data, `genre${nr}.childCloudinaryAsset.fluid`) as FluidObject}
            />
          ))}
        </Slider>
      )}

      <S.ContentWrapper>
        <S.CenteredContent>
          <S.HeroText className="animated fadeInDown">{t('landingPage.hero')}</S.HeroText>
          <S.WatchVideoButton
            onClick={() => setIsVideoModalOpened(true)}
            className="animated fadeInUp"
          >
            <img src={playVideoIcon} alt={t('common.watchVideoAlt')} width={12} height={16} />
            {t('common.watchVideo')}
          </S.WatchVideoButton>
        </S.CenteredContent>
      </S.ContentWrapper>
    </S.Section>
  );
};

export default HeroSection;

//
// Utils
//

const heroSectionQuery = graphql`
  query HeroSection {
    genre1: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/HeroSection/genre-cover-image-1.jpg" }
    ) {
      ...GenreCoverImage
    }
    genre2: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/HeroSection/genre-cover-image-2.jpg" }
    ) {
      ...GenreCoverImage
    }
    genre3: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/HeroSection/genre-cover-image-3.jpg" }
    ) {
      ...GenreCoverImage
    }
    genre4: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "components/Pages/LandingPage/HeroSection/genre-cover-image-4.jpg" }
    ) {
      ...GenreCoverImage
    }
  }
  fragment GenreCoverImage on File {
    childCloudinaryAsset {
      fluid {
        ...CloudinaryAssetFluid
      }
    }
  }
`;

const sliderSettings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
};
