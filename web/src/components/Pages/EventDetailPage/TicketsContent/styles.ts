import styled from 'styled-components';
import colors from '../../../../constants/colors';
import mq from '../../../../constants/layout';

export const Container = styled.div`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  padding: 24px;
  background: white;
  z-index: 1500;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    text-align: center;

    .credit-value {
      font-size: 22px;
      font-weight: 500;
    }

    .credit {
      margin-left: 8px;
      font-size: 22px;
      font-weight: 500;
      margin-right: 8px;
    }

    .person {
      font-size: 16px;
      font-weight: 400;
    }

    margin-bottom: 10px;
  }

  .ticket-box {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }

  .button-group {
    border: 1px solid rgb(221, 221, 221);
    height: 40px;
    display: flex;
    align-items: center;

    .control {
      background: #dddddd;
      width: 64px;
      height: 100%;
      font-size: 18px;
      margin-bottom: 0px;
    }
  }

  .ticket-dropdown {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0px 20px 0px 20px;
    flex: 1;
    svg {
      transform: rotate(180deg);
      cursor: ponter;
    }

    ${mq.xsDown} {
      justify-content: space-between;
    }
  }

  .ticket-label {
    font-size: 16px;
    font-weight: 400;
    margin-right: 12px;
    margin-left: 8px;
    padding-left: 8px;
    padding-right: 0px;
    text-align: center;
  }

  .count {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    height: 100%;
    display: flex;
    margin-right: 16px;
    align-items: center;
    white-space: nowrap;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    ${mq.xsDown} {
      position: unset;
      left: unset;
      transform: unset;
    }
  }

  .count-icon {
    position: absolute;
    right: 20px;
    cursor: pointer;
    user-select: none;
    ${mq.xsDown} {
      position: unset;
      right: unset;
    }
  }
  .seat-value {
    font-size: 16px;
    font-weight: 400;
  }

  .select-seats {
    color: #f40a56;
    font-size: 16px;
    font-weight: 400;
    text-decoration: underline;
    font-style: italic;
    text-align: center;
    flex: 1;
    cursor: pointer;
  }

  .ticket-counter-container {
    border-radius: 8px 8px 0px 0px;
    border-color: rgb(176, 176, 176);
    border-width: 1px;
    border-style: solid;
    padding: 5px 12px;
    width: 100%;
    background: white;
    height: 56px;
    display: flex;
    align-items: center;
    margin-bottom: 0;
    justify-content: space-between;
    border-bottom-width: 0px;
  }

  .seat-info {
    border-radius: 0px 0px 8px 8px;
    border-color: rgb(176, 176, 176);
    border-width: 1px;
    border-style: solid;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 5px 12px;
    justify-content: space-between;
  }

  & button {
    height: 54px;
    width: 100%;
    font-weight: 600;
  }

  &.sticky {
    position: fixed;
    top: 110px;
    z-index: 1050;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-color: rgb(176, 176, 176);
    border-radius: 4px;
    width: calc(100% - 40px);

    .header {
      flex-direction: column;
      .person {
        width: 100%;
        text-align: left;
      }
    }

    ${mq.mdDown} {
      top: 110px;
      left: 20px;
      border: 1px solid rgb(221, 221, 221);
      border-radius: 12px;
      box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
      transform: none;
      flex-direction: column;

      .header {
        width: 100%;
        flex-direction: row;
      }

      .ticket-box {
        width: 100%;
      }

      .ticket-counter-container {
        width: 100%;
      }
    }

    ${mq.smDown} {
      top: 164px;
    }

    ${mq.mdUp} {
      top: 110px;
      left: 20px;
      transform: none;
      .ticket-box {
        flex-direction: row;
        margin-bottom: 0px;
      }

      .ticket-counter-container {
        height: 50px;
        min-width: 281px;
        width: unset;
        border-radius: 4px 0px 0px 4px;
        border-bottom-width: 1px;
        border-right-width: 1px;
      }

      .seat-info {
        border-radius: 0px 4px 4px 0px;
        min-width: 150px;
        .ticket-label {
          font-weight: bold;
        }
      }

      .select-seats {
        color: #f40a56;
        font-size: 16px;
        font-weight: 400;
        width: 263px;
        text-decoration: underline;
        font-style: italic;
        text-align: left;
        flex: 1;
        cursor: pointer;
      }

      & button {
        width: unset;
        height: 50px;
        padding: 6px 20px;
        font-weight: 500;
      }
    }

    ${mq.lgUp} {
      .header {
        flex-direction: row;
      }

      max-width: 1088px;
      left: unset;
      transform: translateX(-57%);
    }
  }
`;

export const Header = styled.div<{ center?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: ${(props) => (props.center ? 'center' : 'flex-start')};
  flex-direction: row;
  text-align: ${(props) => (props.center ? 'center' : 'left')};

  & span {
    font-family: 'Sofia Pro';
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    & small {
      margin-left: 8px;
    }
  }
  margin-bottom: 10px;
`;

export const TicketBox = styled.div`
  border-radius: 8px;
  border-color: rgb(176, 176, 176);
  border-width: 1px;
  border-style: solid;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const TicketCountContainer = styled.button`
  padding: 5px;
  width: 100%;
  background: white;
  height: 56px;
  border-top-width: 1px;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 0;
  justify-content: center;
  &:focus,
  &:active,
  &:visited,
  &:focus-within,
  &:focus-visible,
  &:target {
    border: 1px solid #000;
  }
`;

export const RightIconWrap = styled.div<{ rotate?: boolean }>`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  & svg {
    transform: ${(props) => (props.rotate ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

export const DropDownMenu = styled.div`
  background: white;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 6px, rgb(0 0 0 / 7%) 0px 0px 0px 1px;
  box-sizing: border-box;
  margin-bottom: 16px;
  padding: 8px 4px 8px 4px;
  position: absolute;
  text-align: left;
  width: 100%;
  max-width: 150px;
  z-index: 999;
  right: 0px;
  top: calc(100% + 2px);
  font-size: 14px;
  color: rgb(34, 34, 34);

  div:last-child {
    border-bottom: none;
  }
`;

export const Desc = styled.span`
  font-weight: 600;
  font-size: 16px;
`;
export const Control = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  font-size: 18px;
  font-weight: 400;
  border: 1px solid rgb(176, 176, 176);
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: rgb(113, 113, 113);
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    border: 1px solid black;
  }
`;

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px;
`;

export const Count = styled.div``;

export const MenuItem = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  padding: 5px 5px 5px 10px;
  border-bottom: 1px solid ${colors.lightGray};
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

export const Close = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-decoration: underline;
`;

export const CloseWrap = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-end;
`;

export const SeatInfo = styled.div`
  border-radius: 8px;
  border-color: rgb(176, 176, 176);
  border-width: 1px;
  border-style: solid;
  padding: 20px 8px 8px 20px;
  min-height: 64px;
  margin-bottom: 20px;
  display: flex;
  position: relative;
  font-size: 18px;
`;

export const DateContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 8px;
  padding: 5px;
`;

export const TicketsContainer = styled.div<{
  key?: any;
}>`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: space-around;
  }
`;

export const TicketsWrapper = styled.div`
  width: 100%;

  @media (max-width: 600px) {
    width: 50%;
  }
`;

export const TicketsLabel = styled.div`
  width: 100%;
  text-align: left;

  @media (max-width: 600px) {
    text-align: center;
  }

  & h6 {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 20px;
    color: ${colors.textDefault};
  }
`;

export const ContentText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 24px;
`;

export const CreditContainer = styled.div<{
  key?: any;
}>`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  border-bottom: 1px solid rgba(32, 105, 250, 0.1);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CreditsTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  & h6 {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 18px;
    color: #091d2c;
    margin: 3px 0 3px 0px;
    padding: 0;
  }

  & p {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 14px;
    color: #091d2c;
    margin: 2px 0;
    padding: 0;
  }
`;

export const CounterWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const CounterValue = styled.div`
  margin-left: 24px;
`;
export const CreditsButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    text-decoration: none;
    background-color: #f50756;
    padding: 0 15px;
    height: 50px;
    color: #fff;
    font-family: 'Sofia Pro';
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 10px;
    & a {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const SeeMoreDatesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #091d2c;
  border-radius: 8px;
  padding: 18px 0;
  cursor: pointer;

  & p {
    font-family: 'Sofia Pro';
    font-weight: 500;
    font-size: 18px;
    color: #091d2c;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
`;

export const TicketRowFp = styled.tr<{ active: boolean }>`
  background-color: ${(props) => (props.active ? 'rgba(32,105,250,0.1)' : null)};

  & > td {
    vertical-align: middle !important;
  }
`;

export const CreditBalanceRowFp = styled.div`
  & > div:nth-child(2) {
    text-align: right;
  }
`;

export const FormValidation = styled.div`
  margin: 0;
  color: #fa2069;
  text-align: center;
  width: 80%;
  font-weight: 600;
`;

export const CenteredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
`;

export const SelectTicket = styled.button`
  position: fixed;
  bottom: 100px;
  right: 20px;
  z-index: 1500;
  appearance: none;
  border: none;
  -webkit-font-smoothing: antialiased;
  // font-family: proxima-nova, "Proxima Nova", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 1.25rem;
  line-height: 1.5rem;
  letter-spacing: 0.0125rem;
  margin: 0px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 2.4375rem;
  border-radius: 6.25rem;
  padding: 0px 0.9375rem;
  user-select: none;
  background: ${colors.error};
  cursor: pointer;
  color: rgb(255, 255, 255);
  box-shadow: rgb(36 63 97 / 11%) 0px 2px 12px, rgb(36 63 97 / 12%) 0px 0.5px 2px;
  & svg {
    width: 14px;
    height: 14px;
  }
`;
