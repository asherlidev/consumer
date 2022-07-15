import { Link } from 'gatsby';
import styled from 'styled-components';
import { baseArtBoxCss } from '../../../Elements/EventCard/styles';
import { PageWrapper } from '../../../Layout';

export const ContentContainer = styled(PageWrapper)`
  padding-left: 4rem;
  padding-right: 4rem;
  padding-bottom: 4rem;
`;

export const EventsGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const AddEventGridElement = styled(Link)`
  ${baseArtBoxCss};
  border: 1px solid #e7e7e7;
  font-weight: 500;
  color: #454f57;
  cursor: pointer;
  opacity: 0.7;
  transition: border-width 200ms ease-in-out, text-shadow 200ms ease-in-out;

  :hover {
    text-shadow: 0px 0px 0.5px #454f57;
    border-width: 2px;
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  color: #fa2069;
`;
