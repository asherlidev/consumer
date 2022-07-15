import styled from 'styled-components';
import colors from '../../../constants/colors';

export const Container = styled.div<{
  margin: string | undefined;
  darkMode: boolean;
  boldLabel: boolean;
}>`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
`;

export const Card = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  padding: 10px;
  display: flex;
`;

export const ProfileImage = styled.div<{
  image?: any;
}>`
  width: 50px;
  height: 50px;
  background: url(${(props) => (props.image ? props.image : colors.blue)}) !important ;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin: 10px 2px;
`;

export const DescriptionContainer = styled.div`
  & p {
    color: ${colors.darkGray};
    font-size: 15px;
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 400;
    margin: 10px;
  }

  & label {
    color: ${colors.black};
    font-size: 16px;
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 500;
    margin: 0;
    margin-left: 10px;
  }
`;
