import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  tr th,
  tr td {
    &:last-child {
      text-align: right;
    }
  }
  td {
    padding: 10px 0;
  }
`;

export const CenteredContainer = styled.div`
  width: 100%;
  padding: 50px 0;
  text-align: center;
`;
