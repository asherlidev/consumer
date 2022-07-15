import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const Root = styled.div`
  ${mq.smUp} {
    padding: 0;
  }
`;

export const Flex = styled.div`
  display: flex;
  position: relative;
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flexstart;
  align-items: flexstart;
  padding: 24px;
  max-width: none;
  min-width: 300px;
  width: 100%;
  ${mq.mdUp} {
    max-width: 840px;
  }
`;

export const MapButtonContainer = styled.button`
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  color: white;
  border-radius: 50px;
  display: block;
  ${mq.mdUp} {
    display: none;
  }
`;

export const MapContainer = styled.div`
  float: right;
  position: sticky;
  top: 196px;
  height: calc(100vh - 110px);
  width: 100%;
  min-width: 450px;
  display: none;
  ${mq.mdUp} {
    display: block;
  }
`;

export const MobileMapContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

export const CloseMobileMapButton = styled.button`
  position: fixed;
  font-weight: 800;
  color: #666666;
  top: 12px;
  left: 12px;
  z-index: 1;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  border-radius: 2px;
`;

export const InputContainer = styled.div`
  position: sticky;
  top: 164px;
  width: 100%;
  z-index: 1;
  padding: 12px;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mq.smUp} {
    top: 110px;
  }
  ${mq.mdUp} {
    flex-direction: row;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  align-self: flex-end;
`;

export const PaginationButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  padding: 0;
  margin: 12px;
  color: gray;
  background: white;
  border: 1px solid gray;
  border-radius: 50%;
`;
