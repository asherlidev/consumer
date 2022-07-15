import styled from 'styled-components';
import mq from '../../../constants/layout';

interface EventsContainerProps {
  withoutPadding: boolean;
}

export const Container = styled.section<EventsContainerProps>`
  margin: 30px 0;
  text-align: left;
  ${mq.smUp} {
    ${(props) => !props.withoutPadding && `padding: 0 50px;`};
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flexdirection: row;
  alignitems: center;
  & > a {
    margin: 13px;
    padding-bottom: 5px;
  }
`;

interface EventsWrapperProps {
  isEmpty: boolean;
}

export const EventsRow = styled.div<EventsWrapperProps>`
  display: flex;
  justify-content: ${(props) => (props.isEmpty ? 'center' : 'flex-start')};
  overflow-x: scroll;
`;

export const EventsGrid = styled.div<EventsWrapperProps>`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow-y: auto;
`;

export const Title = styled.h4`
  padding-left: 10px;
`;
