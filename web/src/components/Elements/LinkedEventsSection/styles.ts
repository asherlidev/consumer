import Img from 'gatsby-image';
import styled from 'styled-components';
import colors from '../../../constants/colors';

export const Container = styled.div`
  padding: 0;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const SectionHeader = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SelectEventDate = styled.select`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  outline: none;
  appearance: none;
  font-size: 1.125rem;
  padding-left: 1rem;
  padding-right: 2rem;
  height: 40px;
  border-radius: 0.25rem;
  border: 1px solid rgb(242, 242, 242);
  background-color: rgb(255, 255, 255);
  padding-bottom: 1px;
  line-height: normal;
  color: inherit;
`;

export const EventContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  height: 120px;
  border: 1px solid ${colors.lightGray};
  border-radius: 16px;
  margin-bottom: 16px;
`;

export const EventDateContainer = styled.div`
  width: 80px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.white};
  background-color: ${colors.primary};
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  padding: 20px;
  text-align: center;
`;

export const CoverImage = styled(Img)`
  width: 170px;
  height: 100%;
`;

export const NonGatsCoverImage = styled.div<{ backgroundUrl: string }>`
  width: 170px;
  height: 100%;
  background: url(${(props) => props.backgroundUrl});
  background-size: cover;
  background-position: center center;
`;

export const EventDate = styled.h1`
  color: ${colors.white};
  margin: 0;
`;

export const EventContent = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const EventButtonContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
