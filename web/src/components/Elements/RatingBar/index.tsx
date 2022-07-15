import React, { useEffect } from 'react';
import * as S from './styles';
import AsyncSelect from 'react-select/async';
import { useState } from 'react';

interface Options {
  value: string;
  label: string;
}

interface Props {
  className?: string;
  label?: any;
  margin?: string;
  darkMode?: boolean;
  boldLabel?: boolean;
  rating?: string;
}

const RatingBar: React.FC<Props> = ({
  className,
  label,
  margin,
  darkMode = false,
  boldLabel = false,
  rating,
  ...otherProps
}) => {
  const [barWidth, setBarWidth] = useState<string>('');

  useEffect(() => {
    if (rating) {
      const w = (Number(rating) * 100) / 5;
      setBarWidth(w.toFixed(1));
    }
  }, [rating]);

  return (
    <S.Container margin={margin} darkMode={darkMode} boldLabel={boldLabel} className={className}>
      <S.RatingSmall>{rating && rating}</S.RatingSmall>

      {label && <label>{label}</label>}
      <S.Rating>
        <S.Bar>
          <S.BarContent width={barWidth !== '' ? `${barWidth}%` : undefined} />
        </S.Bar>
        <p>{rating && rating}</p>
      </S.Rating>
    </S.Container>
  );
};

export default RatingBar;
