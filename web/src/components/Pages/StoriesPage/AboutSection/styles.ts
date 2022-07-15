import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const Root = styled.section`
  padding: 60px 0 0;

  ${mq.mdUp} {
    text-align: left;
    padding: 40px 0;
  }

  ${mq.lgUp} {
    padding: 60px 0 0;
  }
`;

export const Container = styled.div`
  margin: auto;
  max-width: 1000px;

  ${mq.mdUp} {
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-gap: 25px;
  }

  ${mq.lgUp} {
    grid-gap: 50px;
  }
`;

export const TitleWrap = styled.div`
  h1 {
    margin: 0 0 1em;
  }

  ${mq.mdUp} {
    h1 {
      font-size: 6rem;
      line-height: 1.1;
    }
  }
`;

export const TextWrap = styled.div`
  padding: 10px 40px;
  font-size: 1.6rem;

  ${mq.mdUp} {
    padding: 0 0 30px;
  }
`;
