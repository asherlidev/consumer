import styled from 'styled-components';
import colors from '../../../../../../constants/colors';

export const NewsletterHeader = styled.div<{ isMobile: boolean }>`
  height: auto;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-bottom: 1px solid #d6d6d6;
`;

export const NewsletterContent = styled.div`
  & > h5 {
    margin-bottom: 0px;
  }

  & > p {
    margin-top: 0px;
  }
`;

export const FormValidation = styled.div`
  color: ${colors.error};
  font-weight: 700;
`;
