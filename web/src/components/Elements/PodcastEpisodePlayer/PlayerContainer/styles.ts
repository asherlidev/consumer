import Img from 'gatsby-image';
import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  ${mq.smUp} {
    display: grid;
    align-items: start;
    grid-template-columns: auto 1fr;
    text-align: left;
    grid-gap: 20px;
  }
`;

export const EpisodeTitle = styled.h1`
  font-size: 4rem;
  margin: 0 0 45px;

  ${mq.mdUp} {
    font-size: 3.5rem;
    margin: 0 0 20px;
  }
`;

const IMG_SIZE = '270px';
const IMG_SIZE_SM_UP = '300px';

export const EpisodeImage = styled(Img)`
  width: ${IMG_SIZE};
  height: ${IMG_SIZE};
  border-radius: 8px;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.4);
  margin-bottom: 20px;
  object-fit: cover;

  ${mq.smUp} {
    width: ${IMG_SIZE_SM_UP};
    height: ${IMG_SIZE_SM_UP};
  }

  ${mq.mdUp} {
    margin-bottom: 0;
  }
`;
