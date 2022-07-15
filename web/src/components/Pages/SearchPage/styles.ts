import styled from 'styled-components';
import mq from '../../../constants/layout';

export const Container = styled.section`
  padding: 0 16px;
  ${mq.smUp} {
    padding: 0 50px;
  }
`;

export const CategoriesContainer = styled.div`
  display: flex;
  align-items: start;
`;

export const CategoriesList = styled.div<{ expanded: boolean }>`
  display: flex;
  flex-wrap: wrap;
  height: ${({ expanded }) => (expanded ? undefined : '52px')};
  overflow: ${({ expanded }) => (expanded ? undefined : 'hidden')};
`;

export const ShowMore = styled.button`
  margin: 10px;
`;

/*** */

export const FilterContainer = styled.div`
  width: 100%;
  /* padding: 20px; */
  /* position: absolute; */
  z-index: 1000;
  background-color: transparent;
  padding-top: 30px;
  /* min-height: 100vh; */
  /* height: 100vhx; */
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding-top: 10%;
  }

  @media (max-width: 618px) {
    padding-top: 13%;
  }

  @media (max-width: 490px) {
    padding-top: 9%;
  }

  @media (max-width: 375px) {
    padding-top: 13%;
  }
`;

export const FilterInputContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 485px) {
    padding-top: 10%;
  }
`;

export const filterSectionContainer = styled.div`
  max-width: 230px;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 1%;
    max-width: 100%;
  }
`;

export const InputContainer = styled.div`
  margin-right: 10px;
  position: relative;

  & div {
    border: 1px solid rgba(9, 29, 44, 0.3);
    border-radius: 8px;
  }

  & label {
    z-index: 1;
    position: absolute;
    left: 15px;
    color: #475765;
    top: 7px;
    font-size: 13px !important;
    font-style: normal;
    font-weight: 700;
  }

  & input {
    background-color: #fff;
    font-size: 14px;
    padding: 44px 21px 21px 20px;
    width: 100%;
    display: flex;
  }
`;

export const LinkContainer = styled.div`
  margin-right: 10px;
  min-width: 60px;
  & a {
    color: #091d2c;
    cursor: pointer;
  }
`;

/*** */

export const TagsContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  max-width: 1128px;
  margin: auto;
  margin-top: 20px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AllTabsDiv = styled.div`
  display: block;
  flex-wrap: wrap;
`;

export const AllTags = styled.div`
  display: none;
  overflow: scroll;

  @media (max-width: 768px) {
    display: flex;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ShowMoreTags = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #091d2c;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
  padding-left: 1%;
  margin-right: 1%;
  height: fit-content;
  margin: auto;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-top: 2px solid black;
    border-right: 2px solid black;
    transform: rotate(135deg);
    position: relative;
    left: 10%;
    top: -4%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UpsaleContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  width: 100%;
  max-width: 1128px;
  margin: auto;
  margin-top: 20px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }

  &:last-child {
    padding-bottom: 30px;
  }
`;

export const Title = styled.div`
  font-family: 'Sofia Pro';
  font-size: 34px;
  font-weight: 700;
  display: flex;

  & span {
    font-family: 'Sofia Pro';
    font-size: 34px;
    font-weight: 400 !important;

    @media (max-width: 900px) {
      margin-top: 5%;
      font-size: 22px;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: baseline;
    font-size: 22px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 12px;
  margin: 20px 0;
  align-items: center;
`;

export const ShowmoreButton = styled.a`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: rgba(9, 29, 44, 0.6);
  padding: 10px 20px;
  background: #ffffff;
  border: 1px solid rgba(9, 29, 44, 0.3);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: end;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CardContainer = styled.div`
  font-family: 'Sofia Pro';
  display: flex;
  position: relative;
  margin-top: 20px;
  width: 100%;
  overflow-x: scroll;

  /* &::-webkit-scrollbar {
    display: none;
  } */
`;
