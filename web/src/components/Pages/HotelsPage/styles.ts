import styled from 'styled-components';
import mq from '../../../constants/layout';

export const ContentContainer = styled.div`
  padding-top: 3rem;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;

  ${mq.smUp} {
    padding: '0 40px 40px 40px';
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

export const FestivalWrapperFp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  transition: all 0.5s;
  margin: 20px 0;

  ${mq.smUp} {
    flex-direction: row;
  }
`;

export const SearchContainer = styled.div`
  /* height: 290px; */
  // overflow-y: hidden;
  padding: 0px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  height: 280px;
  overflow-y: scroll;
`;
