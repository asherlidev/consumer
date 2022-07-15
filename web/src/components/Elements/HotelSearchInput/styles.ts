import styled from 'styled-components';
import colors from '../../../constants/colors';
import mq from '../../../constants/layout';

export const Container = styled.div<{ margin?: string | number }>`
  text-align: left;
  margin-top: ${(props) => props.margin || '10px'};
  margin-bottom: ${(props) => props.margin || '10px'};
`;

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const Input = styled.input`
  margin: 0;
  border: none;
  background: none;
  border-radius: 16px;
  width: 100%;
  margin-left: 0px;
  padding: 20px;
  ::placeholder {
    color: #999999;
  }
  :focus {
    background: white;
    box-shadow: 0 5px 10px rgba(170, 170, 170, 0.3);
    outline: none;
  }
`;

export const CityLink = styled.button`
  margin: 0;
  border: none;
  background: none;
  width: 100%;
  padding: 16px;
  line-height: unset;
  text-align: left;
  :hover {
    background: #eee;
    box-shadow: 0 5px 10px rgba(170, 170, 170, 0.3);
  }
`;

export const InputButton = styled.button<{ hasValue?: boolean; focused?: boolean }>`
  margin: 0;
  border: none;
  background: none;
  border-radius: 16px;
  width: 100%;
  margin-left: 0px;
  padding: 20px;
  line-height: unset;
  color: ${(props) => (props.hasValue ? '#000000' : '#999999')};
  text-align: left;
  ${(props) =>
    props.focused
      ? `
  background: white;
  box-shadow: 0 5px 10px rgba(170, 170, 170, 0.3);
  `
      : ''}
  :focus {
    background: white;
    box-shadow: 0 5px 10px rgba(170, 170, 170, 0.3);
  }
`;

export const GuestsChangeButton = styled.button`
  border-radius: 50%;
  background-color: white;
  border: 1px solid rgba(170, 170, 170, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 40px;
  width: 40px;
  font-size: 24px;
  font-weight: 700;
  :hover {
    background-color: rgba(170, 170, 170, 0.1);
    box-shadow: 0 3px 5px rgba(170, 170, 170, 0.3);
  }
  :active {
    background-color: rgba(170, 170, 170, 0.2);
    box-shadow: inset 0 0 4px rgba(170, 170, 170, 0.8);
  }
  :disabled {
    color: gray;
    background-color: rgba(170, 170, 170, 0.4);
  }
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
  background-color: #f2f2f2;
  border-radius: 25px !important;
  display: flex;
  align-items: center;
  position: relative;
  ${mq.lgDown} {
    flex-direction: column;
  }
`;

export const SearchButton = styled.button`
  color: ${colors.white};
  border: 1px solid ${colors.searchIconColor};
  padding: 0;
  width: 32px;
  height: 32px;
  border-radius: 50px;
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

  ${mq.lgDown} {
    /* display: none; */
    bottom: 12px;
  }
`;

export const Divider = styled.div`
  width: 2px;
  height: 30px;
  background-color: rgba(170, 170, 170, 0.3);
  ${mq.lgDown} {
    width: 100%;
    height: 1px;
  }
`;
