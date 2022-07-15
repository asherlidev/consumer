import React from 'react';
import { navigate } from 'gatsby';
import { parse, stringifyUrl } from 'query-string';
import * as S from './styles';

interface Props {
  suggestion: any;
  type: 'movie' | 'event' | 'venue';
}

const SuggestionItem: React.FC<Props> = ({ suggestion, type }) => {
  const name = suggestion?.name;
  const image = suggestion?.cover_image?.url;
  const slug_name = suggestion?.slug_name;
  const subtitle =
    suggestion?.address?.city && suggestion?.address?.state
      ? `${suggestion?.address.city}, ${suggestion?.address.state}`
      : suggestion?.city && suggestion?.state
      ? `${suggestion?.city}, ${suggestion?.state}`
      : '';

  const getBaseUrlType = (type: String) => {
    switch (type) {
      case 'event':
        return 'events'; // update logic with isParent check in another PR
      case 'movie':
        return 'movies';
      case 'venue':
        return 'venues';
      case 'talent':
        return 'talent';
      default:
        return 'events';
    }
  };

  const urlBase = getBaseUrlType(type);

  const onQuerySubmit = (queryInput: string): void => {
    if (!queryInput) return;
    navigate(stringifyUrl({ url: `/${urlBase}/${queryInput}` }));
  };

  return (
    <S.Container onClick={() => onQuerySubmit(slug_name)}>
      <S.ImageWrapper type={type}>{image && <S.Image src={image} />}</S.ImageWrapper>
      <S.TitleWrapper>
        <S.Title>{name}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>
      </S.TitleWrapper>
      <S.SuggestionType>{type}</S.SuggestionType>
    </S.Container>
  );
};

export default SuggestionItem;
