import styled from 'styled-components';
import mq from '../../../constants/layout';

export const Container = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  background-color: #f7f7f7;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const FpLogo = styled.div`
  padding: 15px;
`;

export const FpList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export const FpListItem = styled.li`
  display: flex;
  flex-direction: row;
  text-align: left;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
`;

export const FpTopMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
`;

export const MenuItem = styled.button`
  color: #454f57;
  font-size: 14px;
  margin: 10px;
  opacity: 0.7;
  background-color: #fff;
`;

export const FpRightMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 15px;
`;

export const FpCircle = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #e7e7e7;
  margin-bottom: 0;
`;

export const Left = styled.div`
  position: relative;
  padding: 0 40px 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  @media (${mq.smUp}) {
    padding: 0 80px 0 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 120px;
  }
`;

export const JumpPlaceholder = styled.div`
  position: absolute;
  top: -80px;
`;

export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Panel = styled.div``;

export const Mask = styled.div`
  background: url('https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1564110212/fp-content/payment-info-bg_yuecgi.svg')
    right top no-repeat;
  background-size: contain;
  text-align: right;
  min-height: 100vh;
  padding: 25px;
  width: 100%;
`;

export const Title = styled.h1`
  color: #091d2c;
  line-height: 45px;
  margin-bottom: 0px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  line-height: 30px;
  color: #454f57;
`;

export const FpBtnRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const FpBtn = styled.button`
  background-color: #fa2069;
  color: #fff;
  border-radius: 16px;
  margin-top: 10px;
  height: 56px;
  font-weight: bold;
  width: 100%;
`;

export const FpBtnAlt = styled.button`
  background-color: #fff;
  color: #fa2069;
  border-radius: 16px;
  border-color: #fa2069;
  margin-top: 10px;
  height: 56px;
  font-weight: bold;
  width: 100%;
`;

export const FormValidation = styled.div`
  margin-left: 15px;
  color: #fa2069;
  text-align: center;
`;

export const FpFeatureImg = styled.img`
  max-width: 110%;
`;

export const FpSmallTxt = styled.p`
  font-size: 14px;
  color: #454f57;
`;

export const FpAltHeader = styled.div`
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
`;

export const FpSubheader = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-left: -15px;
`;

export const FpContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  padding: 100px;
`;

export const CaptionTxt = styled.p`
  font-size: 16px;
  padding: 20px 0px 20px 0px;
  text-align: left;
  line-height: 30px;
  color: #091d2c;
  margin-left: 0;
`;

export const PaddedImg = styled.img`
  margin: 5px;
`;

export const Title2 = styled.h1`
  color: #091d2c;
  line-height: 45px;
  margin-bottom: 0px;
  text-align: left;
`;

export const HeroImgFp = styled.div`
  background-size: cover;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 01) 95%);
  text-align: center;
  min-height: 100vh;
  height: 100%;
`;

export const HeroImgContainerFp = styled.div`
  background: url(${(props) => (props.img && props.img.url ? props.img.url : null)}) center center
    no-repeat;
  background-size: cover;
  text-align: center;
  min-height: 100vh;
  height: 100%;
  z-index: 99;
  margin-top: 0;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 0;
  padding: 30px;
  padding-top: 25%;
  text-align: left;

  & > p {
    color: #ffffff;
  }
`;

export const WhiteTxtBg = styled.div`
  background-color: #ffffff;
  padding: 10px;
  text-align: left;
  margin-bottom: 20px;

  & > h1 {
    margin-top: 0px;
    font-size: 5rem;
  }
`;

export const HeroBodyTxt = styled.p`
  font-size: 2.2rem;
  line-height: 1.2;
  margin-bottom: 20px;
  @media (${mq.mdUp}) {
    width: 50%;
  }
`;

export const HeroBodyTxtMD = styled.span`
  margin-bottom: 20px;
  @media (${mq.mdUp}) {
    width: 50%;
  }

  & > p {
    font-size: 2.2rem;
    line-height: 1.2;
    color: #ffffff;
  }
`;

export const HeroFooter = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & > div {
    width: 100%;
    margin-right: 20px;
  }

  & > div > input {
    height: 70px;
    font-size: 2rem;
  }

  @media (${mq.mdUp}) {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
