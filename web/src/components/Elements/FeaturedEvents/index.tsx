import React, { useMemo } from 'react';
import Slider from 'react-slick';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import useWindowDimensions from '../../../utils/useWindowDimensions';
import * as S from './styles';

import { Link } from 'gatsby';
import moment from 'moment';

interface CardDetail {
  label?: string;
  image?: any;
  data?: any;
  date?: Date[];
  slugName?: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  margin?: string | number;
  cardDetails?: CardDetail[];
}

const FeaturedEvents: React.FC<Props> = ({ margin, cardDetails, ...otherProps }) => {
  const breakpoints = useBreakpoint();
  const windowDimensions = useWindowDimensions();

  const locationMapWidth = useMemo(() => {
    const PADDING_IN_PX = 20;

    if (breakpoints.lgUp) {
      return 1170 - 2 * PADDING_IN_PX;
    } else if (breakpoints.mdUp) {
      return 970 - 2 * PADDING_IN_PX;
    } else if (breakpoints.smUp) {
      return 750 - 2 * PADDING_IN_PX;
    }
    return (windowDimensions?.width || 750) - 3 * PADDING_IN_PX;
  }, [breakpoints.lgUp, breakpoints.mdUp, breakpoints.smUp, windowDimensions?.width]);

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <S.MainContainer>
      <Slider {...settings}>
        {cardDetails &&
          cardDetails.map((card: CardDetail) => (
            <S.Container key={card.slugName} margin={margin}>
              <Link to={`/events/${card.slugName}`}>
                <S.ImageContainer image={card.image ? card.image : card.data}>
                  <S.Title>{card.label}</S.Title>
                  <S.DateContainer>
                    {card.date &&
                      card.date.length > 0 &&
                      `${moment(card.date[0]).format('MM/DD/YYYY').toUpperCase()}  +${
                        card.date.length
                      } MORE`}
                  </S.DateContainer>
                  <S.LikeIcon>&#10084;</S.LikeIcon>
                </S.ImageContainer>
              </Link>
            </S.Container>
          ))}
      </Slider>
    </S.MainContainer>
  );
};

export default FeaturedEvents;
