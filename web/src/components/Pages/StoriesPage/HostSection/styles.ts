import styled from 'styled-components';
import mq from '../../../../constants/layout';
import { Button, Title } from '../../../Elements';
import MiniTitle from '../MiniTitle';

export const Root = styled.section`
  padding: 60px 0;

  ${mq.mdUp} {
    text-align: left;
    padding: 0 0 72px;
  }
`;

export const Container = styled.div`
  margin: auto;
  max-width: 1000px;
`;

export const HostTitle = styled(MiniTitle)`
  margin: 0 0 10px;
`;

export const HostName = styled(Title)`
  margin: 0 0 10px;
`;

export const LogoWrap = styled.div`
  margin-bottom: 60px;
  display: flex;
  justify-content: center;

  ${mq.mdUp} {
    justify-content: flex-start;
  }
`;

export const CtaButton = styled(Button)`
  margin-top: 50px;

  ${mq.mdUp} {
    margin-top: 0;
  }
`;

export const HostContentBody = styled.div`
  padding: 0 40px;
  margin: 40px 0 60px;

  ${mq.mdUp} {
    padding: 0;
  }
`;
