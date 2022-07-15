import styled from 'styled-components';
import colors from '../../../../constants/colors';
import mq from '../../../../constants/layout';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  padding: 40px;
  margin-top: 40px;

  ${mq.smUp} {
    margin-left: 20%;
    margin-right: 20%;
  }

  & > hr {
    width: 100%;
  }
`;

export const CustomerSupportLink = styled.a`
  color: #091d2c;
  text-decoration: underline;
`;

export const ButtonContainer = styled.section`
  ${mq.smUp} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ErrorMessage = styled.div`
  color: ${colors.error};
  margin-top: 0.25rem;
`;
