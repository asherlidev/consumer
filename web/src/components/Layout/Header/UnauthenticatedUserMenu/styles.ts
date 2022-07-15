import { Link as LinkComponent } from 'gatsby';
import styled, { css } from 'styled-components';
import colors from '../../../../constants/colors';

export const SignUpButton = styled.button`
  color: ${colors.white};
  border: 1px solid ${colors.primary};
  height: 32px;
  border-radius: 11px;
  line-height: 0;
  background-color: ${colors.primary};
  margin-bottom: 0;
`;

export const LoginButton = styled.button`
  color: ${colors.white};
  border: 1px solid #dbdbdb;
  height: 32px;
  border-radius: 11px;
  line-height: 0;
  background-color: transparent;
  margin-bottom: 0;
`;

export const Link = styled(LinkComponent)`
  padding: 0 10px 0 0;
`;

export const solidContainerCss = css`
  ${LoginButton} {
    color: ${colors.darkGray};
  }
`;

export const Container = styled.div<{ solid: boolean }>`
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  ${(props) => props.solid && solidContainerCss};
`;
