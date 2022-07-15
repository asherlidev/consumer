import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import mq from '../../../constants/layout';
import zIndex from '../../../constants/zIndex';
import { PageWrapper } from '../../Layout';

export const ContentContainer = styled(PageWrapper)`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: #fee8ef;
  text-align: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 10px;

  & > h1 {
    line-height: 20px;
    font-size: 20px;
    font-weight: 500;

    ${mq.smUp} {
      font-weight: inherit;
    }
  }

  ${mq.smUp} {
    margin-top: 50px;
  }
`;

export const PlansGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ArtBox = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  min-width: 263px;
  border-radius: 16px;
  margin-bottom: 13px;
  border: 2px solid ${(props) => (props.isSelected ? '#fdb3cc' : '#fff')};
  background-color: ${(props) => (props.isSelected ? '#fdb3cc' : '#fff')};
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  padding: 20px;

  :hover {
    border-color: #fdb3cc;
  }
`;

export const PlanContainer = styled.div`
  :last-child ${ArtBox} {
    border-color: #fdb3cc;
  }
`;

const highlightedDescriptionCss = css`
  font-weight: 600;
  color: #fa2069;
`;

export const ArtBoxDescriptionContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ArtBoxDescription = styled.p<{ isHighlighted?: boolean }>`
  text-align: left;
  font-size: 16px;
  opacity: 0.7;

  ${(props) => props.isHighlighted && highlightedDescriptionCss};
`;

export const ArtBoxBigTitle = styled.h1`
  font-size: 42px;
  text-align: left;
  font-weight: 600;

  ${mq.smUp} {
    font-size: 64px;
  }
`;

export const CheckedCircleImage = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: ${zIndex.checkedCardIcon};
`;

export const SubmitButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  ${mq.smUp} {
    margin-left: auto;
    margin-right: auto;
    width: 40%;
  }
`;

export const FreeSignupLink = styled(Link)`
  font-weight: 600;
  color: #3a3a3a;
`;

export const SmallTxt = styled.span`
  font-size: 10px;
  font-style: italic;
  margin-top: 20px;
`;

export const FormFooter = styled.div`
  text-align: center;
  margin-top: 40px;
`;

export const FooterLink = styled(Link)`
  :hover {
    color: #fa2069;
  }
`;
