import React from 'react';
import * as S from './styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  margin?: string | number;
  disabled?: boolean;
  darkMode?: boolean;
  boldLabel?: boolean;
  textArea?: boolean;
  listName?: string;
  options?: Option[];
  errorMessage?: string | undefined | boolean;
}

const Input: React.FC<Props> = ({
  label,
  margin,
  disabled = false,
  darkMode = false,
  boldLabel = false,
  textArea = false,
  listName,
  options,
  errorMessage,
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
      <>
        <S.Input list={listName} disabled={disabled} {...otherProps} />
        {options && <datalist id={listName}>{options.map(renderOption)}</datalist>}
      </>
    )}
    {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
  </S.Container>
);

export default Input;

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
