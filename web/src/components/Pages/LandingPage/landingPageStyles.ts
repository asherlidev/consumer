import styled from 'styled-components';

export const FpHiw = styled.div`
  overflow-x: hidden;
`;

export const Section = styled.section<{ white?: boolean; withoutTopPadding?: boolean }>`
  width: 100%;
  padding: 150px 20px 150px 20px;
  position: relative;
  z-index: 1;
  background-color: ${(props) => (props.white ? '#fff' : '#e8f0fe')};
  ${(props) => props.withoutTopPadding && `padding-top: 0;`}
`;
