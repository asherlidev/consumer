import styled, { css } from 'styled-components';
import colors from '../../../constants/colors';
import mq from '../../../constants/layout';
import { FormikInput } from '../../Elements';

export const Container = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow-x: hidden;
`;

// TODO: use gatsby-image
export const Mask = styled.div<{ imageUrl: string }>`
  background: url('${(props) => props.imageUrl}')
    center center no-repeat;
  background-size: cover;
  background-color: #fee8ef;
  text-align: center;
  min-height: 100vh;
  height: 100%;
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

export const SmallBtn = styled.button`
  color: ${colors.error};
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

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FormValidation = styled.div`
  color: ${colors.error};
  font-weight: 700;
`;

export const SmallTxt = styled.p`
  font-size: 14px;
  color: #454f57;
`;

export const Header = styled.div`
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
`;

export const Subheader = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`;

export const TermsTxt = styled.p`
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  margin-top: 15px;
`;

const whiteTextFormWrapperCss = css`
  ${Title}, ${Subtitle}, ${SmallTxt}, ${TermsTxt}, ${Input} > label {
    color: ${colors.white};
  }
`;

const centeredFormWrapperCss = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FormWrapper = styled.div<{ whiteText?: boolean; centered: boolean }>`
  padding: 30px;

  ${mq.smUp} {
    padding: 0;
  }

  ${(props) => props.whiteText && whiteTextFormWrapperCss}
  ${(props) => props.centered && centeredFormWrapperCss}
`;
