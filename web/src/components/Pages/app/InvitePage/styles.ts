import { FacebookShareButton, TwitterShareButton } from 'react-share';
import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const Wrapper = styled.div`
  background-color: #f7f7f7;
`;

export const Container = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  background-color: #f7f7f7;
  overflow-x: hidden;
`;

export const LeftPanel = styled.div`
  padding: 25px;

  ${mq.smUp} {
    padding: 145px 65px 0;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 80px;
`;

export const CodeContainer = styled.code`
  background-color: #f2f2f2 !important;
  padding: 5px;
  padding-left: 20px;
  color: #091d2c;
  font-size: 13px;
  font-weight: bold;
  height: 42px;
  border-radius: 12px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  width: 100%;
`;

export const Mask = styled.div`
  background-image: url('https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1565042087/storybackgrround_imjvby.svg');
  background-repeat: no-repeat;
  background-position: right top;
  background-size: contain;
  text-align: center;
  min-height: 100vh;
  width: 100%;
`;

export const FeatureImage = styled.img`
  max-width: 90%;
  padding: 30px;

  ${mq.xlUp} {
    max-width: 70%;
    padding: 30px;
  }
`;

export const Circle = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #dbdbdb;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fa2069;
  font-weight: 900;
  margin-bottom: 10px;
`;

export const CopyButton = styled.button`
  background-color: #fa2069;
  color: #ffffff;
  font-weight: 400;
  border-radius: 12px;
`;

export const Subheader = styled.div`
  text-align: left;

  ${mq.smUp} {
    text-align: left;
    display: flex;
    flex-direction: column;
  }
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

export const ReferralsSection = styled.section`
  margin: 40px 0;
  text-align: left;
`;

export const ReferralsTableHeader = styled.div`
  margin-top: 40px;
`;

export const ReferralsTableRow = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ReferralEarnedAmountContainer = styled.p<{ isPositiveAmount: boolean }>`
  color: ${(props) => (props.isPositiveAmount ? '#fa2069' : 'inherit')};
`;

export const FacebookButton = styled(FacebookShareButton)`
  margin: 10px;
`;

export const TwitterButton = styled(TwitterShareButton)`
  margin: 10px;
`;

export const CopiableTextSection = styled.section`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const ModalCreditsText = styled.p`
  font-weight: 600;
  margin-bottom: 40px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
