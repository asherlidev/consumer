import Img from 'gatsby-image';
import styled from 'styled-components';
import colors from '../../../constants/colors';

export const Container = styled.div`
  padding: 20px;
  max-width: 1128px;
  margin: auto;
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
  height: 144px;
  border: 1px solid ${colors.lightGray};
  border-radius: 16px;
  margin-bottom: 32px;
  background-color: ${colors.white};

  @media (max-width: 998px) {
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    height: auto;
    overflow: hidden;
    position: relative;
  }
`;

export const EventDateContainer = styled.div`
  width: 91px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.white};
  background-color: ${colors.primary};
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  align-items: center;
  text-align: center;

  & span {
    font-family: 'Sofia Pro';
    font-weight: 700;
    font-size: 17px;
    opacity: 0.7;
    text-transform: uppercase;
  }

  @media (max-width: 998px) {
    display: none;
  }
`;

export const EventDateContainerSmall = styled.div`
  display: none;

  @media (max-width: 998px) {
    position: absolute;
    top: 3%;
    left: 3%;
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${colors.white};
    background-color: ${colors.primary};
    border-radius: 16px;
    align-items: center;
    text-align: center;

    & span {
      font-family: 'Sofia Pro';
      font-weight: 700;
      font-size: 13px;
      opacity: 0.7;
      text-transform: uppercase;
    }
  }
`;

export const CoverImage = styled(Img)`
  width: 184px;
  height: 100%;
`;

export const NonGatsCoverImage = styled.div<{ backgroundUrl: string }>`
  width: 184px;
  height: 100%;
  background: url(${(props) => props.backgroundUrl});
  background-size: cover;
  background-position: center center;

  @media (max-width: 998px) {
    width: 100%;
    height: 184px;
  }
`;

export const EventDate = styled.h1`
  font-family: 'Sofia Pro';
  font-weight: 700;
  font-size: 46px;
  color: ${colors.white};
  margin: 0;
  text-transform: uppercase;

  @media (max-width: 998px) {
    font-size: 30px;
  }
`;

export const EventContent = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 600px) {
    padding: 20px 30px;
  }
`;

export const TitleContainer = styled.h2`
  color: ${colors.black};
  font-size: 25px;
  /* line-height: 36px; */
  margin-bottom: 0;
  font-family: 'Sofia Pro';
  font-weight: 500;
  margin: 0;
  margin-top: 20px;

  @media (max-width: 600px) {
    font-size: 27px;
  }
`;

export const EventButtonContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 998px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    align-items: flex-start;
    justify-content: start;
    flex-direction: column;
  }
`;

export const CreditsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & img {
    margin: -3px 5px 5px 0;
  }

  & p {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: ${colors.black};
  }
`;

export const CreditsTitle = styled.h4`
  font-family: 'Sofia Pro';
  font-weight: 500;
  font-size: 24px;
  color: ${colors.black};
  margin: 0;
`;

export const DateSubtitle = styled.p`
  font-family: 'Sofia Pro';
  font-weight: 500;
  font-size: 14px;
  color: #999;
  margin: 5px 0 0 0;
`;

export const CreditsSummery = styled.p`
  font-family: 'Sofia Pro';
  font-weight: 400;
  font-size: 14px;
  color: ${colors.darkGray};
  margin: 5px 0 0 0;
`;

export const ViewDetailBtn = styled.button`
  height: 40px;
  padding: 0 10px;
  border: 1px solid ${colors.black};
  color: ${colors.black};
  box-sizing: border-box;
  border-radius: 8px;
  font-family: 'Sofia Pro';
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  margin-right: 10px;

  @media (max-width: 500px) {
    width: 100%;
    font-size: 16px;
    height: 40px;
    padding: 0;
  }
`;

export const RedeemBtn = styled.button`
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: 'Sofia Pro';
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.error};
  color: ${colors.white};

  @media (max-width: 500px) {
    width: 100%;
    font-size: 16px;
    height: 40px;
    padding: 0;
  }
`;

export const DatePikerContainer = styled.div`
  width: 387px;
  height: 70px;

  @media (max-width: 600px) {
    width: 100%;
    margin: 10px 0;
  }
`;

export const ViewMorebtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
