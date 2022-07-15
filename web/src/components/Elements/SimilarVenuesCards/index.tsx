import React from 'react';
import { useStaticQuery } from 'gatsby';
import * as S from './styles';
import festivalIcon from './images/festivalIcon.svg';
import dollarIcon from './images/dollarIcon.svg';

// import movieImage from './images/movie1.png';
import { Maybe, EventCardQuery } from '../../../../graphql-types';
import { data } from 'vfile';
import { Link } from 'gatsby';

interface CardDetail {
  title?: string;
  image?: any;
  data?: any;
  slugName?: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  margin?: string | number;
  cardDetails?: CardDetail[];
}

const SimilarVenuesCards: React.FC<Props> = ({ margin, cardDetails, ...otherProps }) => {
  return (
    <S.MainContainer>
      {cardDetails &&
        cardDetails.map((card: CardDetail) => (
          <S.Container key={card.slugName} margin={margin}>
            <Link to={`/talent/${card.slugName}`}>
              <S.ImageContainer image={card.image ? card.image : card.data}></S.ImageContainer>

              <S.Title>{card.title}</S.Title>
            </Link>
          </S.Container>
        ))}
    </S.MainContainer>
  );
};

export default SimilarVenuesCards;
