import React from 'react';
import checkCircle from './checkCircle.svg';
import * as S from './styles';

interface Props {
  className?: string;
  features: any[]; // TODO: this needs to be a type that can be rendered (string | jsx |...)
}

const FeatureList: React.FC<Props> = ({ className, features }) => (
  <S.Container className={className}>
    {features.map((featureContent, index) => (
      <S.ListItem key={index}>
        <S.ListCheckCircle src={checkCircle} width="25" />
        <S.ListItemContent>{featureContent}</S.ListItemContent>
      </S.ListItem>
    ))}
  </S.Container>
);

export default FeatureList;
