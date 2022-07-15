import Img from 'gatsby-image';
import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const RelativeContainer = styled.div`
  position: relative;
`;

export const Container = styled.div`
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  height: 410px;
  width: 100%;
`;

export const GalleryWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-gap: 8px;
  grid-template-areas:
    'coverImage coverImage'
    'coverImage coverImage'
    '. .';
  position: relative;
  ${mq.smUp} {
    grid-template-areas:
      'coverImage coverImage . .'
      'coverImage coverImage . .';
  }
`;

export const CoverImageContainer = styled.div`
  position: relative;
  height: inherit;
  grid-area: coverImage;
  overflow: hidden;
`;

export const CoverImage = styled.img`
  background-color: #2c2c2c;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const GalleryImage = styled.img`
  background-color: #2c2c2c;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
`;
