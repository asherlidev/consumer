import React from 'react';
import moment from 'moment';
import * as S from './styles';

interface Options {
  value: string;
  label: string;
}

interface Props {
  className?: string;
  margin?: string;
  darkMode?: boolean;
  boldLabel?: boolean;
  name?: string;
  date?: Date;
  image?: any;
  desciption?: string;
}

const CommentCard: React.FC<Props> = ({
  className,
  margin,
  darkMode = false,
  boldLabel = false,
  name,
  date,
  image,
  desciption,
  ...otherProps
}) => {
  return (
    <S.Container margin={margin} darkMode={darkMode} boldLabel={boldLabel} className={className}>
      <S.Card>
        <div>
          <S.ProfileImage image={image} />
        </div>
        <S.DescriptionContainer>
          <p>{desciption}</p>
          <label>
            {name} | {moment(date).format('MMMM YYYY')}
          </label>
        </S.DescriptionContainer>
      </S.Card>
    </S.Container>
  );
};

export default CommentCard;
