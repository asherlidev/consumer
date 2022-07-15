import styled from 'styled-components';
import mq from '../../../constants/layout';

interface ContainerProps {
  withoutPadding: boolean;
}

export const Container = styled.section<ContainerProps>`
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

interface WrapperProps {
  isEmpty: boolean;
}

export const Row = styled.div<WrapperProps>`
  display: flex;
  justify-content: ${(props) => (props.isEmpty ? 'center' : 'flex-start')};
  overflow-x: scroll;
`;

export const Grid = styled.div<WrapperProps>`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow-y: auto;
`;

export const Title = styled.h4`
  padding-left: 10px;
`;
