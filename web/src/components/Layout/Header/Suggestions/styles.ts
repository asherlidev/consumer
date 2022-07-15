import styled from 'styled-components';

export const SuggestionsBox = styled.div`
  position: absolute;
  top: calc(100% - 10px);
  width: calc(100% - 20px);
  left: 50%;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid rgba(9, 29, 44, 0.5);
  border-top: transparent;
  border-radius: 0 0 8px 8px;
  transform: translateX(-50%);
  background-color: white;
  z-index: 1000;
`;

export const Items = styled.div`
  position: relative;
  z-index: 2;
`;

export const Backdrop = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e2eaf1;
`;
