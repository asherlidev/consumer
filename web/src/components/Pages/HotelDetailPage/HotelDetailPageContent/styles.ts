import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import colors from '../../../../constants/colors';
import mq from '../../../../constants/layout';

export const ChipsContainer = styled.span`
  display: flex;
  align-items: center;

  :not(:first-child) {
    margin-left: 8px;
  }
`;

export const TitleContainer = styled.h1`
  color: ${colors.black};
  font-size: 20px;
  line-height: 36px;
  margin-bottom: 0;
  font-family: 'Sofia Pro';
  font-weight: 700;
  margin: 0;
  margin-top: 20px;

  ${mq.smUp} {
    line-height: 36px;
    font-size: 30px;
  }
`;

export const Description = styled.div`
  white-space: pre-line;
  margin-bottom: 40px;
  font-weight: 400;
  font-family: 'Sofia Pro';
  font-size: 20px;
  color: ${colors.darkGray};
`;

export const features = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  border-top: 2px solid #ccc;
  padding-top: 30px;

  @media (max-width: 600px) {
    border-bottom: 2px solid #ccc;
    padding-bottom: 30px;
  }
`;

export const FeatureContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  width: 50%;
  padding: 5px 0;

  @media (max-width: 600px) {
    width: 100%;
  }

  & img {
    margin-right: 8%;
  }

  & p {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 14px;
    line-height: 24.39px;
    color: '#091D2C';
  }
`;

export const Infoheader = styled.div`
  ${mq.smUp} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    width: 100%;
    padding-top: 20px;
  }
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

export const EventInfoRow = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: no-wrap;

  ${mq.smUp} {
    margin-top: -10px;
  }

  & > div:nth-child(1) {
    justify-content: flex-start;
    display: flex;

    & > span {
      padding: 0 10px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;

      & > img {
        margin: 5px;
      }
    }
  }

  & > div:nth-child(2) {
    justify-content: flex-end;
    display: flex;
    align-items: flex-end;
    margin-top: -20px;

    & > div > button {
      padding: 0px 10px 10px 10px;
      color: ${colors.primary};

      & > img {
        margin: 5px;
        padding: 5px;
      }
    }

    & > div > button > img {
      margin: 5px;
    }
  }
`;

export const ShareAndLikeContainer = styled.div`
  ${mq.smDown} {
    margin-top: -30px;
  }

  & > div {
    justify-content: space-between;
    display: flex;
    align-items: center;

    & > div > button {
      padding: 0px 10px 10px 0px;
      color: ${colors.primary};
      justify-content: space-between;

      & > img {
        margin: 5px;
        padding: 5px;
      }
    }

    & > div > button > img {
      margin: 5px;
    }

    & p {
      font-family: 'Sofia Pro';
      font-weight: 500;
      font-size: 16px;
      color: #091d2c;
      cursor: pointer;
      margin: 0;
    }
  }
`;

export const FlexInfoSection = styled.div`
  flex-grow: 1;
  flex-wrap: wrap;

  & span {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  }
`;

export const Content = styled.div`
  padding: 20px;
  max-width: 1128px;
  margin: auto;
  /* width: 100%; */
`;

export const BtnRow = styled.div`
  display: flex;

  & > button {
    margin: 10px;
  }

  ${mq.smUp} {
    text-align: right;
  }
`;

export const FpInterestRow = styled.div`
  ${mq.smDown} {
    margin-top: 30px;
  }

  ${mq.smUp} {
    text-align: left;
    width: 100%;

    & > div:nth-child(1) {
      /* padding: 0; */

      & > h5 {
        margin-top: 0;
      }
    }

    & > div:nth-child(2) {
      text-align: right;
      padding: 0;
    }
  }
`;

export const ClaimEventContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const TicketsContainer = styled.div`
  background-color: ${colors.white} !important;
  border-radius: 16px;
  border: none;
  padding: 20px;
  box-shadow: 0px 5px 72px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;
`;

export const Category = styled.span`
  font-family: 'Sofia Pro';
  font-weight: 700;
  font-size: 12px;
  color: #091d2c;
  text-transform: uppercase;
  letter-spacing: 0.31em;
  margin: 0 10px 10px 0;
  padding: 5px 10px;
  height: 30px;
  border-radius: 8px;
  background-color: ${colors.white};
  border: 1px solid #091d2c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DescriptionTitle = styled.h5`
  font-family: 'Sofia Pro';
  font-weight: 700;
  font-size: 30px;
  color: ${colors.textDefault};

  @media (max-width: 600px) {
    margin-top: 30px;
  }
`;

export const FriendsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 0;

  & p {
    margin: 0;
    margin-left: 20px;
    font-family: 'Sofia Pro';
    font-weight: 400;
    font-size: 16px;
    color: rgb(9, 29, 44, 0.5);
  }

  & a {
    margin-left: 3px;
    border-bottom: 1px solid #f50756;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid transparent;
    }
  }

  @media (max-width: 990px) {
    justify-content: start;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;

    & p {
      margin-left: 0;
    }
  }
`;

export const FriendsImageContainer = styled.div`
  display: flex;
`;

export const FriendImg = styled.div<{
  image?: string | undefined;
}>`
  width: 32px;
  height: 32px;
  background: url(${(props) => (props.image ? props.image : '#ccc')});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid #fff;
  border-radius: 50%;
  position: relative;
  margin-right: -10px;
`;

export const EventLocationMap = styled.img`
  border-radius: 16px;
  margin-bottom: 40px;
  width: 100%;
`;

export const TalentPodRow = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding: 20px 0;
`;

export const TalentPodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 20px;

  & > p {
    font-family: 'Sofia Pro';
    font-size: 20px;
    font-weight: 500;
    color: #091d2c;
  }
`;

const talentImageCss = css`
  border-radius: 16px;
  margin-bottom: 5px;
  background-color: #eee;
`;

export const TalentGatsbyImage = styled(Img)`
  ${talentImageCss}
`;

export const TalentPreviewImage = styled.img`
  ${talentImageCss};
`;

export const TalentImagePlaceholder = styled.div`
  ${talentImageCss};
  width: 225px;
  height: 149px;
  background-color: #eee;
`;

export const TelentsCardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-top: 2%;
`;

export const TelentsContainer = styled.div`
  margin: 2% 0 0 0;
`;

export const RedeemButton = styled.div<{
  width?: string | undefined;
}>`
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  width: 100%;

  & a {
    text-decoration: none;
    background-color: #f50756;
    padding: 0 50px;
    height: 60px;
    color: #fff;
    font-family: 'Sofia Pro';
    font-weight: 700;
    font-size: 20px;
    cursor: pointer;
    border-radius: 8px;
    width: ${(props) => (props.width ? props.width : 'auto')};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & p {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 16px;
    color: #091d2c;
    cursor: pointer;
    margin: 0;
    margin: 0;
    margin-top: -5px;
    margin-bottom: 5px;
    margin-left: auto;
  }

  & .tooltip {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    color: ${colors.black};
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    opacity: 1;
  }
`;

export const RetingContainer = styled.div`
  background: ${colors.backgroundGray};
  width: 100%;
`;

export const RetingHeader = styled.div`
  display: flex;
  margin: 30px 0;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const RetingTitle = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & div {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }

  & p {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 16px;
    color: #091d2c;
    cursor: pointer;
    margin: 2px 0 2px 2px;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding-left: 10px;
    padding-bottom: 20px;
  }
`;

export const RatingsContent = styled.div`
  width: 66.66%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px;
  width: 100%;

  @media (max-width: 600px) {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
`;

export const Comment = styled.div`
  width: 33.33%;
  padding: 15px 15px 15px 0;

  @media (max-width: 600px) {
    width: 100%;
    display: inline-block;
    min-width: fit-content;
  }
`;

export const ViewAllReviewBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;

  & a {
    font-family: 'Sofia Pro';
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${colors.textDefault};
    border: 1px solid ${colors.textDefault};
    box-sizing: border-box;
    border-radius: 8px;
    padding: 21px 25px;
    height: 60px;
  }
`;

export const RecommendedEventsContainer = styled.div`
  background: ${colors.white};
`;

export const RecommendedEventsTitle = styled.div`
  font-family: 'Sofia Pro';
  font-weight: 700;
  font-size: 30px;
  color: ${colors.black};
  margin: 40px 0;

  @media (max-width: 600px) {
    margin: 10px 0;
  }
`;
