import styled from 'styled-components';
import colors from '../../../../constants/colors';
import { Title } from '../../../Elements';

export const Root = styled.section`
  padding: 0 30px;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const Paper = styled.div`
  border-radius: 8px;
  padding: 30px 100px;
  background-color: ${colors.white};
  max-width: 620px;
  position: relative;
  box-shadow: 0px 5px 72px rgba(0, 0, 0, 0.1);
`;

export const InputWrap = styled.div`
  margin-bottom: 40px;
`;

export const SectionTitle = styled(Title)`
  margin: 0;
`;

export const IconAccentGroup1 = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  font-size: 4rem;
  color: ${colors.blue};
  display: grid;
  grid-template-columns: repeat(2, 11px);
`;

export const IconAccentGroup2 = styled.div`
  position: absolute;
  bottom: 34%;
  right: 22px;
  font-size: 4rem;
  color: ${colors.primary};
`;
