import styled from 'styled-components';
import colors from '../../../constants/colors';

export const Container = styled.span<{ backgroundColor: string; color?: string }>`
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: ${(props) => props.backgroundColor || 'rgba(255, 255, 255, 0.2)'};
  color: ${(props) => props.color || (props.backgroundColor ? colors.white : 'inherit')};
  border-radius: 16px;
  padding: 0 10px;
  height: 24px;
  margin: 5px 5px 5px 0;
  cursor: pointer;
  display: inline-block;
`;

export const Icon = styled.img<{ withMargin: boolean }>`
  margin-right: ${(props) => (props.withMargin ? '5px' : null)};
`;

export const Text = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;
