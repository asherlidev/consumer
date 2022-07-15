import styled from 'styled-components';
import colors from '../../../constants/colors';
import mq from '../../../constants/layout';

export const COLOR_MAP = {
  default: colors.textDefault,
  ...colors,
};

export const Container = styled.h1<{ color: keyof typeof COLOR_MAP; marginBottom?: string }>`
  color: ${(props) => COLOR_MAP[props.color]};
  font-family: 'Sofia Pro';
  font-size: 20px;
  line-height: 20px;
  margin-bottom: ${(props) => props.marginBottom || 0};

  ${mq.smUp} {
    line-height: 40px;
    font-size: 40px;
  }
`;
