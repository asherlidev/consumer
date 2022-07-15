import styled from 'styled-components';
import mq from '../../../../constants/layout';
import { Link } from 'gatsby';
import { PageWrapper } from '../../../Layout';

import { Button } from '../../../Elements';

export const Container = styled(PageWrapper)`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;

  ${mq.smUp} {
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
  }
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 40px auto;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(1, 1fr);

  ${mq.xsUp} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mq.mdUp} {
    grid-gap: 32px;
    grid-template-columns: repeat(3, 1fr);
  }

  ${mq.lgUp} {
    grid-gap: 40px;
  }
`;

export const WishlistItem = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
`;

export const WishlistImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const WishlistContent = styled.div`
  width: 100%;
  padding: 12px 16px;
`;

export const Name = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Description = styled.p`
  margin: 0;
  opacity: 0.7;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const HorizontalLine = styled.hr`
  margin: 12px 0;
`;

export const CtaRow = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;

export const CtaLink = styled(Link)`
  width: 100%;
  color: black;
`;

export const CtaButton = styled(Button)`
  width: 100%;
  margin: 4px 0;
  border: 1px solid #d2d2d2;
  background-color: #f2f2f2;
`;
