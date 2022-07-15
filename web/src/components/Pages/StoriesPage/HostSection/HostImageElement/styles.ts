import styled from 'styled-components';
import mq from '../../../../../constants/layout';
import DecorativeDots from '../../DecorativeDots';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq.mdUp} {
    justify-content: flex-start;
    float: right;
    margin: 0 0 20px 20px;
  }
`;

const PlusIconWrap = styled.div`
  position: absolute;
  color: white;
  opacity: 0.9;
  font-size: 3rem;
`;

export const PlusIconTopWrap = styled(PlusIconWrap)`
  top: 87px;
  right: -24px;
  ${mq.mdDown} {
    display: none;
  }
`;

export const PlusIconBottomWrap = styled(PlusIconWrap)`
  bottom: -51px;
  right: 33%;
  font-size: 2.5rem;
`;

// TODO: include svg in project instead of through cloudinary
export const DecorativeDotsBlue = styled(DecorativeDots)`
  background-image: url(https://res.cloudinary.com/festivalpass/image/upload/v1589256428/fp-content/organic-shapes/oval-dots-2.svg);
  position: absolute;
  right: -97px;
  top: 261px;

  ${mq.mdDown} {
    display: none;
  }
`;

export const HostImg = styled.img`
  display: block;
  z-index: 1;
  max-width: 100%;
  position: relative;
  width: 300px;

  ${mq.mdUp} {
    width: 550px;
  }
`;
