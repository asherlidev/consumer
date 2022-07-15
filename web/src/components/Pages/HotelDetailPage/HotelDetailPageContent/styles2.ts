import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import colors from '../../../../constants/colors';
import mq from '../../../../constants/layout';

export const HotelImageContainer = styled.div`
  border-radius: 16px;
  width: 100%;
  min-height: 200px;
  max-height: 400px;
  overflow: hidden;
  position: relative;
`;

export const HotelImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center;
`;

export const Info = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  max-width: unset;
  width: 100%;
  ${mq.smUp} {
    width: 50%;
    max-width: 600px;
  }
`;

export const DescriptionTitle = styled.h3``;

export const DescriptionContent = styled.p``;

export const ContentContainer = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  grid-gap: 16px;
  position: relative;
  flex-direction: column;
  ${mq.smUp} {
    flex-direction: row;
  }
`;

export const AmenitiesContainer = styled.div``;
