import styled from 'styled-components';
import mq from '../../../constants/layout';

export const ContentContainer = styled.div`
  padding-top: 3rem;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;

  ${mq.smUp} {
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 100%;

  ${mq.smUp} {
    margin: 0px;
    padding: 0px;

    & > h1 {
      margin-top: 0px;
    }
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s;

  ${mq.smUp} {
    flex-direction: row;
    padding: 50px;
  }
`;

export const SearchContainer = styled.div`
  overflow-y: hidden;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;

  ${mq.smUp} {
    padding: 0px;
  }
`;
