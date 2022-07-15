import React from 'react';
import * as S from './styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  margin?: string | number;
  label: string;
  active?: boolean;
  onClick?: any;
}

const Tags: React.FC<Props> = ({ margin, label, active = false, onClick, ...otherProps }) => (
  <S.Container margin={margin} onClick={onClick}>
    <S.Tag active={active}>{label}</S.Tag>
  </S.Container>
);

export default Tags;
