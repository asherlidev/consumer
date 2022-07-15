import styled from 'styled-components';
import colors from '../../../constants/colors';

export const MainContainer = styled.div`
  /* display: flex;
  overflow-x: scroll;
  margin-top: 2%;
  margin: auto; */
  width: 80%;
  margin: auto;

  .slick-prev,
  .slick-next {
    z-index: 100;
    opacity: 1;
  }

  .slick-prev {
    left: -6px;
  }

  .slick-next {
    right: 14px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 40px;
    opacity: 1;
    line-height: 0;
    z-index: 1000;
  }
`;

export const Container = styled.div<{ margin?: string | number }>`
  width: 100%;
  margin-bottom: 20px;
  margin-right: 30px;
  /* display: inline-block; */
  /* max-width: 345px; */
  padding: 5px;
  min-width: 200px;

  cursor: pointer;

  @media (max-width: 950px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    /* min-width: 296px; */
    max-width: 100%;
  }

  @media (max-width: 425px) {
    /* min-width: 276px; */
    max-width: 100%;
  }
`;

export const ImageContainer = styled.div<{
  image?: string;
}>`
  padding-top: 110px;
  width: 100%;
  height: 230px;
  border-radius: 16px;
  overflow: hidden;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 70%),
    url(${(props) => props.image && props.image}) !important;
  background-size: cover;

  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  background-color: #000;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.div`
  font-family: 'Sofia Pro';
  text-align: left;
  font-size: 24px;
  font-weight: 700;
  color: ${colors.white};
  display: flex;
  margin-left: 35px;
  margin-bottom: 3px;
`;

export const DateContainer = styled.div`
  font-family: 'Sofia Pro';
  text-align: left;
  font-size: 16px;
  font-weight: 100;
  color: ${colors.white};
  display: flex;
  margin-left: 35px;
  margin-top: 5px;
`;

export const LikeIcon = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  color: ${colors.brightGrey};
  font-size: 22px;
`;
