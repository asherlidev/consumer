import Img from 'gatsby-image';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import mq from '../../../constants/layout';
import zIndex from '../../../constants/zIndex';
import { FormikInput } from '../../Elements';
import { PageWrapper } from '../../Layout';

export const Container = styled(PageWrapper)`
  overflow-x: hidden;
`;

export const TitleP2 = styled.span`
  color: ${colors.primary};
  margin-left: 0.5rem;
`;

export const HeroImage = styled(Img)`
  height: 50%;
  z-index: -1;
`;

export const TopSection = styled.section`
  text-align: left;
  position: relative;

  & > div:nth-child(1) {
    padding: 40px;

    & > p {
      margin-top: 10px;
    }
  }

  ${mq.smUp} {
    & > div:nth-child(1) {
      padding: 80px;
      z-index: ${zIndex.header - 1};

      & > p {
        margin-top: 10px;
      }
    }
  }
`;

export const BottomSection = styled.section`
  padding: 40px;
  position: relative;

  & > div:nth-child(1) {
    text-align: left;
    margin-bottom: 56px;

    & > div > img {
    }
  }

  ${mq.smUp} {
    padding: 80px;
  }
`;

export const InfoColumn = styled.div`
  text-align: left;
`;

export const FixedImg = styled.div`
  position: absolute;
  top: 0;
  right: -10px;
  text-align: right;
  padding: 0px;
  z-index: ${zIndex.lowerOverlay};
`;

export const TopSectionOrganicShape = styled.img`
  opacity: 0.5;
`;

export const FormWrapper = styled.div`
  z-index: ${zIndex.header - 1};
  padding: 30px;

  ${mq.smUp} {
    background-color: ${colors.white};
    border: solid 1px #dbdbdb;
    border-radius: 16px;
    width: 360px;
    position: absolute;
    right: 10%;
    top: 10%;
    padding: 30px;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

export const FormTitleSection = styled.section`
  text-align: center;

  ${mq.smUp} {
    text-align: left;
  }
`;

export const FormTitle = styled.h5`
  ${mq.smUp} {
    margin-bottom: 5px;
  }
`;

export const FormSubtitle = styled.p`
  color: #454f57;
`;

// Same as in Register page
export const SmallTxt = styled.p`
  font-size: 14px;
  color: #454f57;
`;

export const FpSmallBtn = styled.button`
  color: #fa2069;
  border: 1px solid #dbdbdb;
  height: 32px;
  border-radius: 11px;
  line-height: 0px;
  background-color: #fff;
`;

export const Input = styled(FormikInput)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const FormValidation = styled.div`
  color: ${colors.error};
  font-weight: 700;
`;

export const ContentHighlight = styled.span`
  color: ${colors.primary};
  font-weight: 600;
  margin-left: 0.5rem;
`;
