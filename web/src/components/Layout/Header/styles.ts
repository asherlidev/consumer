import { Link } from 'gatsby';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import mq from '../../../constants/layout';
import { HEADER_HEIGHT_IN_PX } from './constants';
import zIndex from './../../../constants/zIndex';
import Input from '../../Elements/Input';

export const NavContainer = styled.nav<{ solid: boolean; withoutBottomBorder: boolean }>`
  position: fixed;
  margin-bottom: 0;
  width: 100%;
  border-radius: 0;
  height: ${HEADER_HEIGHT_IN_PX}px;
  z-index: ${zIndex.header};

  ${mq.smUp} {
    border-bottom: ${(props) =>
      props.solid && !props.withoutBottomBorder ? '1px solid #e7e7e7' : null};
  }
`;

export const Content = styled.div<{ solid: boolean; searchActive: boolean }>`
  width: 100%;
  height: ${HEADER_HEIGHT_IN_PX}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${(props) =>
    props.solid && props.searchActive ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.3)'} !important;
  background-color: ${(props) =>
    props.solid ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.3)'} !important;
  transition: all 0.5s;
  padding: 0 10px;

  @media (max-width: 768px) {
    justify-content: start;
    /* padding-top: 6%;
    padding-bottom: 16%; */
  }

  @media (max-width: 475px) {
    /* padding-top: 9%;
    padding-bottom: 13%; */
  }
`;

export const HeaderLogoLink = styled(Link)`
  margin-left: 10px;
  padding: 10px 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderLogo = styled.img`
  width: 170px;
  height: 55px;
  object-fit: contain;
`;

export const HeaderMobileLogo = styled.img`
  display: none;

  @media (max-width: 768px) {
    width: 85px;
    height: 55px;
    object-fit: contain;
    margin-left: 10px;
    display: block;
    margin-right: auto;
  }
`;

export const RightNavigation = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RightNavigationMenuIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin: 10px 10px 10px 0;
    width: auto;
    margin-left: auto;
  }
`;

export const MenuIconBar = styled.div`
  width: 40px;
  height: 6px;
  background: #f50756;
  border-radius: 60px;
  margin: 6px 10px;
`;

export const SearchButton = styled.button`
  color: ${colors.white};
  border: 1px solid ${colors.searchIconColor};
  padding: 0;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  line-height: 0;
  background-color: ${colors.searchIconColor};
  margin: auto 20px;

  & svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    margin: auto;
    padding: 0 5px;
    margin-right: 5%;
  }
`;

// export const UserMenuContainer = styled.div`
//   display:flex;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

export const SearchContainer = styled.div`
  padding: 0 10px;
  position: relative;
  width: 80%;
  max-width: 436px;
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

export const FilterContainer = styled.div`
  width: 100%;
  /* padding: 20px; */
  position: absolute;
  z-index: 1;
  background-color: #fff;
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
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  max-width: 1304px;
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
  max-width: 1304px;
  margin: auto;
  margin-top: 20px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
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
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .row {
    margin: 0;
    width: 100%;
  }
`;
