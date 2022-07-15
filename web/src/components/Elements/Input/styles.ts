import styled from 'styled-components';

export const Container = styled.div<{ margin?: string | number }>`
  text-align: left;
  margin-top: ${(props) => props.margin || '10px'};
  margin-bottom: ${(props) => props.margin || '10px'};
`;

export const Input = styled.input`
  border: none;
  border-radius: 8px !important;
  background-color: #f2f2f2;
  width: 100%;
  margin-left: 0px;
  padding: 20px;
  height: 52px;
`;

export const Textarea = styled.textarea`
  border: none;
  border-radius: 16px !important;
  background-color: #f2f2f2;
  width: 100%;
  resize: vertical;
  margin-left: 0px;
  padding: 20px;
  height: 144px;
  min-height: 144px;
`;

export const Label = styled.label<{ darkMode?: boolean; bold?: boolean }>`
  margin: 0px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${(props) => (props.darkMode ? '#fff' : '#091d2c')};
  font-weight: ${(props) => (props.bold ? '600' : '500')};
`;

export const ErrorMessage = styled.div`
  color: #f94994;
  font-weight: 600;
  margin-bottom: 2rem;
`;
