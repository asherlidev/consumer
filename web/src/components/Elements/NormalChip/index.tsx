import React from 'react';
import * as S from './styles';
import ReactTooltip from 'react-tooltip';

interface Props {
  className?: string;
  backgroundColor?: string;
  fontColor?: string;
  label?: string;
  icon?: string;
  message?: string;
}

const NormalChip: React.FC<Props> = ({
  className,
  backgroundColor,
  fontColor,
  label,
  icon,
  message,
  ...otherProps
}) => (
  <S.Container>
    <S.FestivalPassContainer
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      data-tip={message}
      data-for="chip-tip"
    >
      {icon && <S.TagIcon src={icon} alt="icon" />}
      {label ? label : 'NEW'}
    </S.FestivalPassContainer>
    {message && <ReactTooltip id="chip-tip" effect="solid" type="light" className="tooltip" />}
  </S.Container>
);

export default NormalChip;
