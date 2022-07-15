import styled from 'styled-components';
import colors from '../../../constants/colors';

export const Container = styled.div<{
  margin: string | undefined;
  darkMode: boolean;
  boldLabel: boolean;
}>`
  display: flex;
  padding: 0px 10px;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 63px;

  & label {
    color: ${colors.fontPrimary};
    font-size: 16px;
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 500;
  }

  & p {
    color: ${colors.fontPrimary};
    font-size: 16px;
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 500;
    margin: 10px;
  }

  @media (max-width: 600px) {
    justify-content: start;
  }
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 200px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const RatingSmall = styled.div`
  display: none;
  padding: 15px;
  align-items: center;
  border-radius: 16px;
  background: ${colors.error};
  color: white;
  margin-right: 10px;

  @media (max-width: 600px) {
    display: flex;
  }
`;

export const Bar = styled.div`
  width: 80%;
  height: 10px;
  background: ${colors.barBackground};
  border-radius: 16px;
  position: relative;
`;

export const BarContent = styled.div<{
  width?: string | undefined;
}>`
  position: absolute;
  width: ${(props) => (props.width ? props.width : '0%')};
  height: 10px;
  background: ${colors.error};
  border-radius: 16px;
`;
