import styled from 'styled-components';

export const ShowmoreModal = styled.div<{
  position?: { top?: string; bottom?: string; right?: string; left?: string };
}>`
  width: auto;
  background: #fff;
  position: absolute;
  top: ${(props) => props.position?.top || '75%'};
  bottom: ${(props) => props.position?.bottom || 'unset'};
  right: ${(props) => props.position?.right || 'unset'};
  left: ${(props) => props.position?.left || 'unset'};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 8px;
  display: flex;
  justify-content: start;
  z-index: 1;
  overflow-y: auto;

  & a {
    font-family: 'Sofia Pro';
    font-size: 14px;
    font-weight: 400;
    text-decoration: none;
    display: flex;
    color: #091d2c;
    cursor: pointer;
  }
`;

export const ShowmoreModalUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin: 0;
  padding: 5px;
`;

export const ShowmoreModalList = styled.li`
  font-family: 'Sofia Pro';
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 5px 20px 5px 14px;
`;
