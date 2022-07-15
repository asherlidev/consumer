import React from 'react';
import { useStaticQuery } from 'gatsby';
import * as S from './styles';
import festivalIcon from './images/festivalIcon.svg';
import dollarIcon from './images/dollarIcon.svg';

// import movieImage from './images/movie1.png';
import { Maybe, EventCardQuery } from '../../../../graphql-types';
import { data } from 'vfile';
import { Link } from 'gatsby';

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  margin?: string | number;
  label?: string;
  title?: string;
  image?: any;
  data?: any;
  slugName?: string;
}

const CardSearch: React.FC<Props> = ({
  margin,
  label,
  title,
  image,
  data,
  slugName,
  ...otherProps
}) => {
  return (
    <S.Container margin={margin}>
      <Link to={`/talent/${slugName}`}>
        <S.ImageContainer image={image ? image : data}></S.ImageContainer>

        <S.Title>{title}</S.Title>
      </Link>
    </S.Container>
  );
};

export default CardSearch;
