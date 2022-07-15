import styled from 'styled-components';
import mq from '../../../constants/layout';

export const Title = styled.h1`
  color: #091d2c;
  line-height: 45px;
  margin-bottom: 0px;
  text-align: left;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  padding: 20px 0;
  text-align: left;
  line-height: 30px;
  color: #091d2c;
  margin-left: 0;
`;

export const Left = styled.div`
  padding: 0 40px;
  display: flex;
  justify-content: center;
  min-height: 100vh;

  ${mq.smUp} {
    padding: 0 80px;
    display: flex;
    justify-content: center;
  }
`;

export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Mask = styled.div`
  background: url('https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1564110212/fp-content/payment-info-bg_yuecgi.svg')
    right top no-repeat;
  background-size: contain;
  text-align: right;
  min-height: 100vh;
  padding: 25px;
  width: 100%;
`;

export const FeatureImg = styled.img`
  max-width: 110%;
`;
