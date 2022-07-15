import React from 'react';
import * as S from './styles';
import festivalIcon from './images/festivalPassLogo.svg';
import ReactTooltip from 'react-tooltip';

interface Props {
  className?: string;
  message?: string;
}

const FestivalPassChip: React.FC<Props> = ({ className, message, ...otherProps }) => (
  <S.Container>
    <S.FestivalPassContainer data-tip={message} data-for="festivalPass">
      <img src={festivalIcon} alt="icon" />
      festival pass
    </S.FestivalPassContainer>
    {message && <ReactTooltip id="festivalPass" effect="solid" type="light" className="tooltip" />}
  </S.Container>
);

export default FestivalPassChip;
