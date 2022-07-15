import styled from 'styled-components';
import mq from '../../../../constants/layout';
import { Btn } from '../../../Elements';
import EventCardsComponent from '../../../Elements/EventCards';

export const Container = styled.div`
  ${mq.smUp} {
    min-height: 100vh;
    max-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr 96px;
    padding: 0;
  }
`;

export const ContinueButtonContainer = styled.div`
  padding: 20px 0;
`;

export const ContinueButton = styled(Btn)`
  margin: 0 auto;

  ${mq.smDown} {
    position: fixed;
    bottom: 80px;
    left: 0;
    right: 0;
    z-index: 5;
  }
`;

export const Title = styled.h1`
  color: #091d2c;
  line-height: 45px;
  margin: 0;
  padding-top: 40px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  line-height: 30px;
  margin: 0;
  padding-bottom: 10px;
  color: #454f57;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: auto;
  margin-right: auto;

  ${mq.xlUp} {
    padding: 0 15%;
    width: 90%;
  }
`;

export const EventCards = styled(EventCardsComponent)`
  justify-content: center;
  overflow-y: auto;
`;
