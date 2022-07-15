import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import colors from '../../../../../constants/colors';
import mq from '../../../../../constants/layout';

export const AmenitiesHeader = styled.h4`
  z-index: 1;
  top: 165px;
  ${mq.smUp} {
    top: 110px;
  }
  background: ${colors.white};
  position: sticky;
  padding: 16px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
`;

export const AmenitiesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  height: 100%;
  max-height: 230px;
`;

export const Amenity = styled.div`
  width: 100%;
  height: 45px;
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

export const ShowMoreButton = styled.button`
  display: flex;
  height: 50px;
  width: 100%;
  border: 2px solid ${colors.darkGray};
  background: ${colors.white};
  border-radius: 8px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  color: ${colors.darkGray};
`;
