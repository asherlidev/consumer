import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// hotfix for the form field alignment
export const TwoColumnInputWrapper = styled.div`
  & > div {
    margin-top: 20px;
    margin-bottom: 0;
  }
`;

// hotfix for the form field alignment
export const TwoColumnRowWrapper = styled.div``;
