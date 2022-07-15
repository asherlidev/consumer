import styled from 'styled-components';
import { Link as RouterLink } from 'gatsby';
import colors from '../../../constants/colors';
import mq from '../../../constants/layout';

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
  row-gap: 24px;
`;

export const Link = styled(RouterLink)`
  color: inherit;
  position: relative;
`;

export const CoverImage = styled.img`
  border: 1px solid rgba(170, 170, 170, 0.2);
  min-width: 300px;
  width: 300px;
  height: 200px;
  background: #eeeeee;
  border-radius: 16px;
  object-fit: cover;
`;

export const Content = styled.div`
  min-width: 320px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

export const Info = styled.div`
  display: block;
  overflow: hidden;
`;

export const Divider = styled.div`
  width: 60px;
  height: 1px;
  background-color: #aaaaaa;
  margin: 16px 0px;
`;

export const Amenities = styled.p`
  color: #aaaaaa;
`;

export const Heading = styled.h4`
  margin-bottom: 0px;
  ${mq.smUp} {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const Location = styled.p`
  color: #aaaaaa;
`;

export const Review = styled.div`
  display: flex;
  align-items: center;
`;
