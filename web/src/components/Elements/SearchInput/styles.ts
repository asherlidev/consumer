import styled from 'styled-components';
import colors from '../../../constants/colors';

export const Container = styled.div<{ margin?: string | number }>`
  text-align: left;
  margin-top: ${(props) => props.margin || '10px'};
  margin-bottom: ${(props) => props.margin || '10px'};
`;

export const Input = styled.input`
  border: none;
  background-color: #f2f2f2;
  width: 100%;
  margin-left: 0px;
  padding: 20px;
  height: 52px;
  border-radius: 25px !important;
`;

export const Textarea = styled.textarea`
  border: none;
  background-color: #f2f2f2;
  width: 100%;
  resize: vertical;
  margin-left: 0px;
  padding: 20px;
  height: 144px;
  min-height: 144px;
  border-radius: 25px !important;
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

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const SearchButton = styled.button`
  color: ${colors.white};
  border: 1px solid ${colors.searchIconColor};
  padding: 0;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  line-height: 0;
  background-color: ${colors.searchIconColor};
  margin: auto 20px;
  position: absolute;
  right: 0;

  & svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    margin: auto;
    padding: 0 5px;
    margin-right: 5%;
  }
`;
