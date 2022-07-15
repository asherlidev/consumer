import { Form } from 'formik';
import BackgroundImage from 'gatsby-background-image';
import styled from 'styled-components';
import mq from '../../../../../constants/layout';
import zIndex from '../../../../../constants/zIndex';
import { Btn, Title as TitleComponent } from '../../../../Elements';
import {
  TOTAL_DESKTOP_HEADER_HEIGHT_IN_PX,
  TOTAL_MOBILE_HEADER_HEIGHT_IN_PX,
} from '../../../../Layout/Header/constants';

export const Root = styled(BackgroundImage)`
  background-size: cover;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

export const BackgroundWrapper = styled.div<{ backgroundUrl: string }>`
  background-size: cover;
  background-color: #f7f7f7;
  min-height: 100vh;
  background: url(${(props) => props.backgroundUrl});
  background-size: cover;
  background-position: center center;
`;

export const ContentWrapper = styled.div`
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 01) 95%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 30px;
  padding-top: ${30 + TOTAL_MOBILE_HEADER_HEIGHT_IN_PX}px;

  ${mq.smUp} {
    padding-top: ${30 + TOTAL_DESKTOP_HEADER_HEIGHT_IN_PX}px;
  }
`;

export const Content = styled.div`
  z-index: ${zIndex.superhero};
  text-align: left;
`;

export const Title = styled(TitleComponent)`
  margin-top: 0;
`;

export const WhiteTxtBg = styled.div`
  background-color: #fff;
  padding: 10px;
  text-align: left;
  margin-bottom: 20px;
  display: inline-block;

  ${Title} {
    margin-top: 0px;
    font-size: 5rem;

    ${mq.smDown} {
      font-size: 3rem;
      line-height: 3rem;
    }
  }
`;

export const HeroBodyTxt = styled.p`
  font-size: 2.2rem;
  line-height: 1.2;
  margin-bottom: 20px;
  color: #fff;

  ${mq.smUp} {
    width: 50%;
  }
`;

export const SignupForm = styled(Form)`
  width: 100%;

  ${mq.smUp} {
    max-width: 70rem;
  }
`;

export const HeroFooter = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;

  & > div {
    flex: 1;
    margin-right: 20px;

    input {
      height: 56px;
      font-size: 2rem;
    }
  }

  ${mq.smDown} {
    flex-direction: column;
    & > *,
    & > div {
      width: 100%;
      margin-right: 0;
    }
  }
`;

export const RegisterButton = styled(Btn)`
  font-size: 2rem;
  padding: 20px;
  height: auto;
`;
