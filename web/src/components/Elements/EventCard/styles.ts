import { Link as RouterLink } from 'gatsby';
import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import zIndex from '../../../constants/zIndex';

export const ArtBoxTitle = styled.p`
  margin-left: 10px;
  width: 225px;
  text-align: left;
  font-size: 14px;
  margin-bottom: 0px;
  transition: text-shadow 200ms ease-in-out;
`;

export const SelectableCard = styled.div`
  position: relative;
  cursor: pointer;
`;

export const a = styled.a`
  color: inherit;
  position: relative;

  :hover ${ArtBoxTitle} {
    text-shadow: 0px 0px 0.5px #454f57;
    text-decoration: underline;
  }
`;

export const ArtBoxContainer = styled.div`
  position: relative;
`;

export const baseArtBoxCss = css`
  width: 225px;
  height: 149px;
  border-radius: 16px;
  margin-bottom: 13px;
  background-color: #e7e7e7;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  object-fit: cover;
`;

export const LoadingArtbox = styled.div`
  ${baseArtBoxCss};
`;

export const CenteredLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ArtBox = styled(Img)`
  ${baseArtBoxCss};
`;

export const NonGatsbyArtBox = styled.div<{ backgroundUrl: string }>`
  ${baseArtBoxCss};
  background: url(${(props) => props.backgroundUrl});
  background-size: cover;
  background-position: center center;
`;

export const ArtBoxSubTitle = styled.p`
  margin-left: 10px;
  margin-bottom: 0px;
  width: 225px;
  text-align: left;
  font-size: 12px;
  opacity: 0.7;
`;

export const CategoryChip = styled.span`
  z-index: ${zIndex.cardChip};
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 0 10px 0 10px;
  margin: 5px;
  height: 24px;
  position: absolute;
  top: 123px;
  left: 12px;
  color: #333;
`;

export const ChipsContainer = styled.span`
  z-index: ${zIndex.cardChip};
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;

  :not(:first-child) {
    margin-left: 8px;
  }
`;

export const CheckedCircleImage = styled.img`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: ${zIndex.checkedCardIcon};
`;
