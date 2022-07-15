import styled from 'styled-components';

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

export const FestivalPassContainer = styled.div`
  font-family: 'Sofia Pro';
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  letter-spacing: 0.21em;
  padding: 3px 5px;
  background: #f50756;
  border-radius: 8px;
  width: auto;
  position: absolute;
  top: 7%;
  left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 12px;
    height: 12.86px;
    margin-right: 3px;
    margin-bottom: 2px;
  }
`;

export const MovieContainer = styled.div`
  font-family: 'Sofia Pro';
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #091d2c;
  letter-spacing: 0.21em;
  padding: 3px 5px;
  background: #fff;
  border-radius: 8px;
  width: auto;
  position: absolute;
  top: 75%;
  left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const Text = styled.div`
  font-family: 'Sofia Pro';
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  color: #091d2c;
  display: flex;
  margin: 0px 2px;
  opacity: 0.7;
`;

export const CreditsContainer = styled.div`
  font-family: 'Sofia Pro';
  font-size: 15px;
  font-weight: 500;
  color: #091d2c;
  margin: 2px 0;
  display: flex;
  align-items: center;

  & img {
    width: 18.75px;
    height: 18.75px;
    margin-right: 4px;
  }
`;
