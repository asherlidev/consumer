import styled from 'styled-components';
import { FoundingMemberBadgeIcon } from '../../Icons';

export const Container = styled.div`
  position: relative;
`;

export const Circle = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #e7e7e7;
  margin-bottom: 0;
`;

export const FoundingMemberBadge = styled(FoundingMemberBadgeIcon)`
  position: absolute;
  top: 50%;
  left: -5px;
`;

export const Badge = styled.img`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  position: absolute;
  top: 60%;
  left: -5px;
  border: 1px solid #777777;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
  background: rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 100%;
  border-radius: 100%;
  text-align: center;
`;

export const Icon = styled.img<{ isBrighter?: boolean }>`
  position: absolute;
  top: 50%;
  bottom: 0;
  left: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  height: 75%;
  filter: brightness(${(props) => (props.isBrighter ? '97%' : '64%')});
  transition: filter 200ms ease-in-out;
`;

export const ContentWrapper = styled.div`
  position: relative;

  :hover ${Icon} {
    filter: brightness(97%);
  }
`;
