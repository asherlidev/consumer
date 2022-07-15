import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import colors from '../../../../../constants/colors';
import mq from '../../../../../constants/layout';
import zIndex from '../../../../../constants/zIndex';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

export const Container = styled.div`
  paddin: 16px;
  margin: 16px;
`;

export const Title = styled.h3``;

export const MyCredit = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 30px;
`;

export const NeedMoreCredits = styled.div`
  font-size: 14px;
  color: ${colors.error};
  margin-bottom: 30px;
  margin-top: 30px;
`;

export const Button = styled.button``;

export const SpecSection = styled.div`
  margin-bottom: 36px;
  display: flex;
  gap: 24px;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  ${mq.smUp} {
    align-items: center;
    flex-direction: row;
  }
`;

export const SpecInfoSection = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const Circle = styled.div`
  border: 1px solid ${colors.darkGray};
  border-radius: 50px;
`;

export const SpecIcon = styled.img`
  padding: 8px;
`;

export const SpecCTAChangeLink = styled.a`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.primary};
  :hover {
    cursor: pointer;
  }
`;

export const SpecCTALink = styled(Link)`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.primary};
  :hover {
    cursor: pointer;
  }
`;

export const SpecCTAButton = styled.button`
  padding: 18px 48px;
  transition: 0.2s;
  background: none;
  font-size: 16px;
  font-weight: 700;
  border: 2px solid ${colors.gray};
  border-radius: 8px;
  :hover {
    background: ${colors.primary};
    color: white;
    border: 2px solid ${colors.primary};
  }
`;

export const MyPlan = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-top: 12px;
  color: ${colors.darkGray};
`;

export const DisclaimerSection = styled.div`
  color: ${colors.gray};
`;

export const DisclaimerLink = styled(Link)`
  :hover {
    cursor: pointer;
  }
`;

export const Notify = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #3a3a3a;
`;

export const ThankYou = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 35px;
  color: #3a3a3a;
`;

export const Wrong = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 30px;
  line-height: 33px;
  color: #3a3a3a;
`;

export const HowToDeliver = styled.p`
  margin-top: 30px;
  font-weight: 500;
  font-size: 24px;
  color: #3a3a3a;
  line-height: 28px;
`;

export const Transaction = styled.p`
  margin-top: 30px;
  font-weight: 500;
  font-size: 24px;
  color: #3a3a3a;
  line-height: 28px;
  margin-bottom: 20px;
`;
export const ShareRow = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: row;
  }

  ${mq.smUp} {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const FacebookButton = styled(FacebookShareButton)`
  margin: 10px;
`;

export const TwitterButton = styled(TwitterShareButton)`
  margin: 10px;
`;

export const MyTicket = styled.div`
  margin-left: 20px;
  a {
    text-decoration: underline;
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
`;
