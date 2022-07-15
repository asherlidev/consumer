import React from 'react';
import { useStaticQuery } from 'gatsby';
import * as S from './styles';
import festivalIcon from './images/festivalIcon.svg';
import dollarIcon from './images/dollarIcon.svg';

// import movieImage from './images/movie1.png';
import { Maybe, EventCardQuery } from '../../../../graphql-types';
import { data } from 'vfile';
import { Link } from 'gatsby';
import FestivalPassChip from './../FestivalPassChip/index';
import NormalChip from '../NormalChip';
import colors from '../../../constants/colors';
import moment from 'moment';

interface CardDetail {
  title?: string;
  image?: any;
  data?: any;
  slugName?: string;
  isFestivalPass?: boolean;
  isNew?: boolean;
  date?: Date;
  location?: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  margin?: string | number;
  cardDetails?: CardDetail[];
}

const RecommendedEventsCards: React.FC<Props> = ({ margin, cardDetails, ...otherProps }) => {
  return (
    <S.MainContainer>
      {cardDetails &&
        cardDetails.map((card: CardDetail) => (
          <S.Container key={card.slugName} margin={margin}>
            <Link to={`/events/${card.slugName}`}>
              <S.ImageContainer image={card.image ? card.image : card.data}>
                {card.isFestivalPass && (
                  <S.FestivalChipContainer>
                    <FestivalPassChip />
                  </S.FestivalChipContainer>
                )}
                {card.isNew && (
                  <S.NormalChipContainer>
                    <NormalChip label="NEW" backgroundColor={colors.blue} />
                  </S.NormalChipContainer>
                )}
              </S.ImageContainer>

              <S.Title>{card.title}</S.Title>
              <S.DateContainer>
                {`${card.location}  |  ${moment(card.date).format('ddd, MMMM DD')}`}
              </S.DateContainer>
            </Link>
          </S.Container>
        ))}
    </S.MainContainer>
  );
};

export default RecommendedEventsCards;
