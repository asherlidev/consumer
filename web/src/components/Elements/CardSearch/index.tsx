import React from 'react';
import { useStaticQuery } from 'gatsby';
import * as S from './styles';
import festivalIcon from './images/festivalIcon.svg';
import dollarIcon from './images/dollarIcon.svg';

// import movieImage from './images/movie1.png';
import { Maybe, EventCardQuery } from '../../../../graphql-types';
import { data } from 'vfile';

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  margin?: string | number;
  label?: string;
  imageUrl?: any;
  festivapass?: boolean;
  catagory?: Maybe<string>;
  title?: string;
  place?: Maybe<string>;
  date?: Maybe<string>;
  credit?: Maybe<string>;
  image?: any;
  data?: any;
  onClick?: (queryInput: string) => void;
}

const CardSearch: React.FC<Props> = ({
  margin,
  label,
  imageUrl,
  festivapass = true,
  catagory,
  title,
  place,
  date,
  credit,
  image,
  data,
  onClick,
  ...otherProps
}) => {
  return (
    <S.Container margin={margin} onClick={onClick}>
      <S.ImageContainer image={image ? image : data}>
        {festivapass ? (
          <S.FestivalPassContainer>
            <img src={festivalIcon} alt="icon" />
            festival pass
          </S.FestivalPassContainer>
        ) : null}
        {catagory ? <S.MovieContainer>{catagory}</S.MovieContainer> : null}
      </S.ImageContainer>

      <S.Title>{title}</S.Title>
      {place && <S.Text>{place}</S.Text>}
      {date && <S.Text>{date}</S.Text>}
      {credit ? (
        <S.CreditsContainer>
          <img src={dollarIcon} alt="icon" />
          {credit}
        </S.CreditsContainer>
      ) : null}
    </S.Container>
  );
};

export default CardSearch;
