import styled from 'styled-components';
import mq from '../../../../constants/layout';
import colors from '../../../../constants/colors';
import { PageWrapper } from '../../../Layout';

export const Container = styled(PageWrapper)`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;

  ${mq.smUp} {
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
  }
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 40px auto;
`;

export const WhenTitle = styled.h4`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  margin-top: 36px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(1, 1fr);

  ${mq.xsUp} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mq.mdUp} {
    grid-gap: 32px;
    grid-template-columns: repeat(3, 1fr);
  }

  ${mq.lgUp} {
    grid-gap: 40px;
  }
`;
