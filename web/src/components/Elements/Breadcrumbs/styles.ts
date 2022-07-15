import { Link } from 'gatsby';
import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  margin: 1em 0;
  white-space: nowrap;
  overflow: auto;
`;

export const Crumb = styled(Link)`
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

export const Separator = styled.span`
  margin: 0 0.4em;
`;
