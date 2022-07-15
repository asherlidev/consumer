import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import colors from '../../../../../constants/colors';
import mq from '../../../../../constants/layout';
import zIndex from '../../../../../constants/zIndex';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

export const Container = styled.div`
  margin: 16px;
`;

export const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #3a3a3a;
`;

export const MyCredit = styled.div`
  font-size: 14px;
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
  flex-direction: row;
  ${mq.xsDown} {
    align-items: flex-start;
    flex-direction: column;
  }

  .spec-cta {
    margin-left: 64px;
  }
  a:last-child {
    margin-left: 64px;
  }
  button:last-child {
    margin-left: 64px;
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

export const SpecCTALink = styled(Link)`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.primary};
  :hover {
    cursor: pointer;
  }
`;

export const SpecCTALinkSpan = styled.span`
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
  margin-top: 4px;
  color: ${colors.darkGray};
`;

export const DisclaimerSection = styled.div`
  color: ${colors.textSecondary};
  margin-bottom: 40px;
`;

export const Reference = styled.div`
  margin-bottom: 8px;
`;

export const DisclaimerLink = styled.a`
  color: ${colors.textSecondary};
  text-decoration: underline;
  :hover {
    cursor: pointer;
  }
`;

export const Notify = styled.span`
  font-weight: 700;
  font-size: 24px;
  color: #3a3a3a;
`;

export const ThankYou = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 35px;
  color: #3a3a3a;
`;

export const Wrong = styled.p`
  font-weight: 700;
  font-size: 30px;
  line-height: 33px;
  color: #3a3a3a;
`;

export const HowToDeliver = styled.p`
  margin-top: 16px;
  font-weight: 400;
  font-size: 14px;
  color: #558844;
  line-height: 20px;
`;

export const Transaction = styled.p`
  margin-top: 26px;
  font-weight: 700;
  font-size: 24px;
  color: #3a3a3a;
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
  button {
    margin-right: 16px;
  }
  ${mq.xsDown} {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;
