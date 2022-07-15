import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  padding: 8px;

  > :not(:first-child) {
    margin-left: 8px;
  }
`;
