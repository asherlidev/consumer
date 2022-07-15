import PhoneNumberInput from 'react-phone-number-input';
import styled from 'styled-components';
import colors from '../../../constants/colors';

export const Container = styled.div<{ gutterBottom?: string | number }>`
  text-align: left;
  margin-bottom: ${(props) => (props.gutterBottom ? '30px' : '0')};
`;

export const Label = styled.label`
  margin: 0;
  padding: 0 5px;
  height: auto;
  font-weight: 500;
  color: ${colors.textDefault};
`;

export const HelperText = styled.div<{ error: boolean }>`
  padding: 0 5px;
  color: ${(props) => (props.error ? colors.error : colors.textDefault)};
`;

export const PhoneInput = styled(PhoneNumberInput)`
  > input {
    margin: 10px 0 10px 0 !important;
    height: 50px !important;
    border-radius: 16px !important;
    background-color: #f2f2f2;
    align-items: center;
    justify-content: flex-start;
    width: 100% !important;
    padding: 20px;
    border: none;
  }
`;
