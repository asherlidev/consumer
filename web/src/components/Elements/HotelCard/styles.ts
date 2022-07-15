import { Link as RouterLink } from 'gatsby';
import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import zIndex from '../../../constants/zIndex';

export const ArtBoxTitle = styled.p`
  margin-left: 10px;
  width: 225px;
  text-align: left;
  font-size: 16px;
  margin-bottom: 0px;
  transition: text-shadow 200ms ease-in-out;
`;

export const SelectableCard = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Link = styled(RouterLink)`
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

export const ArtBox = styled.img`
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

export const Rating = styled.div`
  margin-left: 10px;
  width: 225px;
  height: 24px;
  display: flex;
  grid-gap: 4px;
  align-items: center;
  color: gray;
  font-weight: 700;
`;

export const Icon = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  border-radius: 3px;
`;
