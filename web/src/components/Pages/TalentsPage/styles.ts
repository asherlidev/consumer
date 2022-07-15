import styled from 'styled-components';
import mq from '../../../constants/layout';
import Input from '../../Elements/Input';

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

export const SearchIconContainer = styled.div`
  position: absolute;
  right: 20px;
  top: calc(50% + 5px);
  transform: translateY(-50%);
  cursor: pointer;
`;

export const SearchSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  cursor: pointer;
  margin-right: 4%;

  @media (max-width: 768px) {
    max-width: 100%;
    position: absolute;
    background: #fff;
    top: 125%;
    z-index: 10;
  }
`;

export const SearchInput = styled(Input)<{ hasRoundBorder: boolean }>`
  font-family: 'Sofia Pro';
  /* width: 416px; */
  width: 100%;
  max-width: 416px;
  font-size: 14px;
  padding-right: 50px;
  background-color: white;
  border: 1px solid rgba(9, 29, 44, 0.3);
  border-bottom-left-radius: ${(props) => !props.hasRoundBorder && 0} !important;
  border-bottom-right-radius: ${(props) => !props.hasRoundBorder && 0} !important;
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
  position: relative;
  padding: 0px;
  // padding-bottom: 20px;
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

export const FilterIconButton = styled.div`
  height: 52px;
  width: 52px;
  border-radius: 8px;
  position: relative;
  border: 1px solid rgba(9, 29, 44, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
`;
