import styled from 'styled-components';
import mq from '../../../constants/layout';
import {
  TOTAL_DESKTOP_HEADER_HEIGHT_IN_PX,
  TOTAL_MOBILE_HEADER_HEIGHT_IN_PX,
} from '../../Layout/Header/constants';

//
// Utils
//

export const Container = styled.div`
  background-color: #f7f7f7;
  width: 100%;
  padding-top: ${TOTAL_MOBILE_HEADER_HEIGHT_IN_PX}px;

  ${mq.smUp} {
    padding-top: ${TOTAL_DESKTOP_HEADER_HEIGHT_IN_PX}px;
  }
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

export const Left = styled.div`
  padding: 20px 40px 20px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (${mq.smUp}) {
    padding: 0 80px 0 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 120px;
  }
`;

export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
`;

export const Panel = styled.div``;

export const Mask = styled.div`
  background: url('https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1564110212/fp-content/payment-info-bg_yuecgi.svg')
    right top no-repeat;
  background-size: contain;
  text-align: right;
  padding: 25px;
  width: 100%;

  @media (${mq.smUp}) {
    min-height: 100vh;
  }
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

export const FpFeatureImg = styled.img`
  max-width: 110%;
`;

export const CaptionTxt = styled.div`
  padding: 20px 0px 20px 0px;
  & > p {
    font-size: 16px;
    text-align: left;
    line-height: 30px;
    color: #091d2c;
    margin-left: 0;
  }
`;

export const Title = styled.h1`
  color: #091d2c;
  line-height: 45px;
  margin-bottom: 0px;
  text-align: left;
`;
