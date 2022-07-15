import styled from 'styled-components';

export const Container = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  text-align: left;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  margin-right: -15px;
  margin-left: -15px;
`;

export const ListCheckCircle = styled.img`
  margin: 15px;
`;

export const ListItemContent = styled.span`
  font-weight: 600;
`;
