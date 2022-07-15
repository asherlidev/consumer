import styled from 'styled-components';

export const CheckedCircleImage = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const ArtBox = styled.div<{ active: boolean }>`
  position: relative;
  cursor: pointer;
  width: 240px;
  height: auto;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 13px;
  background-color: ${(props) => (props.active ? '#fdb3cc' : '#fff')};
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding-bottom: 20px;
  padding-left: 15px;
  border: 2px solid #fdb3cc;
`;

export const ArtBoxDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ArtBoxDescription = styled.p`
  text-align: left;
  font-size: 16px;
  opacity: 0.7;
`;

export const ArtBoxBigTitle = styled.h1`
  font-size: 64px;
  text-align: left;
  font-weight: 600;
`;

export const PlansGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-y: scroll;
  flex-wrap: wrap;
`;
