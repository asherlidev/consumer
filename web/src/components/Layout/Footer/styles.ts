import { Link as LinkComponent } from 'gatsby';
import styled from 'styled-components';
import mq from '../../../constants/layout';

export const Container = styled.div`
  background: #091d2c;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  padding: 40px 0;

  ${mq.smDown} {
    align-items: flex-start;
    flex-direction: column;
    padding-left: 2rem;
  }
`;

export const Logo = styled.img`
  width: 160px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > a {
    margin: 5px;
  }
`;

export const ExternalLink = styled.a`
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  line-height: 2;
  letter-spacing: normal;

  &:hover {
    color: #fa2069;
  }
`;

export const Link = styled(LinkComponent)`
  color: #fff;
  font-size: 14px;
  line-height: 2;
  letter-spacing: normal;

  &:hover {
    color: #fa2069;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
`;

export const ColumnHeader = styled.div`
  color: #fff;
  font-size: 16px;
  line-height: 3;
  letter-spacing: normal;
  font-weight: bold;

  ${mq.smDown} {
    padding-top: 1.5rem;
  }
`;

export const Copyright = styled.p`
  font-size: 12px;
  color: #fff;
  margin-top: 3rem;
`;
