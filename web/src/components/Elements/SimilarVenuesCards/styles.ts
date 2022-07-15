import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin-top: 2%;
  margin: auto;
`;

export const Container = styled.div<{ margin?: string | number }>`
  width: 100%;
  margin-bottom: 20px;
  margin-right: 30px;
  display: inline-block;
  max-width: 296px;
  min-width: 296px;
  cursor: pointer;

  @media (max-width: 768px) {
    min-width: 296px;
  }

  @media (max-width: 425px) {
    min-width: 276px;
  }
`;

export const ImageContainer = styled.div<{
  image?: string;
}>`
  width: 100%;
  height: 164px;
  border-radius: 16px;
  overflow: hidden;
  background-image: url(${(props) => props.image && props.image}) !important;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  background-color: #d6d6d6;
`;

export const Title = styled.div`
  font-family: 'Sofia Pro';
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  color: #091d2c;
  display: flex;
  margin: 0px 2px;
  margin-top: 16px;
`;
