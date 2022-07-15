import styled from 'styled-components';

export const Container = styled.div<{ margin?: string | number }>`
  text-align: left;
  margin-top: ${(props) => props.margin || '10px'};
  margin-bottom: ${(props) => props.margin || '10px'};
  margin-right: 10px;
  display: inline-block;
  /* width: 100%; */
`;

export const Tag = styled.div<{ active?: boolean }>`
  background: ${(props) => (props.active ? '#000' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')} !important;

  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;

  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 30px;
  border-radius: 22px;
  color: #000;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;
