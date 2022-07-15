import React from 'react';
import * as S from './styles';
import SearchIcon from '../../Icons/SearchIcon';
import { stringifyUrl } from 'query-string';
import { navigate } from 'gatsby';

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  value?: string;
  margin?: string | number;
  disabled?: boolean;
  darkMode?: boolean;
  boldLabel?: boolean;
  textArea?: boolean;
  listName?: string;
  options?: Option[];
  errorMessage?: string | undefined | boolean;
}

const onQuerySubmit = (queryInput: string): void => {
  // if (!queryInput) return;
  navigate(stringifyUrl({ url: '/search', query: { q: queryInput } }), {
    replace: true,
  });
};

const SearchInput: React.FC<Props> = ({
  label,
  margin,
  disabled = false,
  darkMode = false,
  boldLabel = false,
  textArea = false,
  listName,
  options,
  errorMessage,
  value,
  ...otherProps
}) => (
  <S.Container margin={margin}>
    {label && (
      <S.Label bold={boldLabel} darkMode={darkMode}>
        {label}
      </S.Label>
    )}
    {textArea ? (
      <S.Textarea disabled={disabled} {...otherProps} />
    ) : (
      <S.SearchBar>
        <S.Input list={listName} disabled={disabled} {...otherProps} />
        {options && <datalist id={listName}>{options.map(renderOption)}</datalist>}
        <S.SearchButton aria-label="Search" onClick={() => onQuerySubmit(value)}>
          <SearchIcon />
        </S.SearchButton>
      </S.SearchBar>
    )}
    {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
  </S.Container>
);

export default SearchInput;

//
// Utils
//

interface Option {
  id: string;
  slug_name: string;
  name: string;
}

// TODO: This is too specific to what's using it. To be refactored.
const renderOption = ({ id, name, slug_name }: Option) => (
  <option key={id} value={name} data-value={id}>
    {slug_name}
  </option>
);
