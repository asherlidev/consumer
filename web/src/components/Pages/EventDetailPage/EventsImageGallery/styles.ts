import Img from 'gatsby-image';
import styled from 'styled-components';
import mq from '../../../../constants/layout';

export const RelativeContainer = styled.div`
  position: relative;
`;

export const GalleryWrapper = styled.div`
  & > div:nth-child(1) {
    padding-right: 0px;
  }
  & > div:nth-child(2) {
    padding-left: 5px;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const GalleryWrapperSmall = styled.div`
  display: none;

  @media (max-width: 1200px) {
    display: block;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ClickableWrapper = styled.div`
  cursor: pointer;
`;

export const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 15px;

  & > div {
    margin: 5px;
  }

  & > a {
    cursor: pointer;
  }

  ${mq.smUp} {
    & > a:nth-child(2) > div {
      border-top-right-radius: 16px;
    }
    & > a:nth-child(4) > div {
      border-bottom-right-radius: 16px;
    }
  }
`;

export const GalleryContainerSmall = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0;

  & > div {
    margin: 5px;
  }

  & > a {
    cursor: pointer;
    margin: 5px;
  }

  ${mq.smUp} {
    & > a:nth-child(2) > div {
      border-top-right-radius: 16px;
    }
    & > a:nth-child(4) > div {
      border-bottom-right-radius: 16px;
    }
  }
`;

export const CoverImage = styled(Img)<{ multiple?: boolean }>`
  margin: 20px 0 40px 0;
  border-radius: 16px;
  background-color: #2c2c2c;
  height: 410px;
  width: 100%;
  object-fit: cover;

  ${mq.lgUp} {
    border-top-right-radius: ${(props) => (props.multiple ? 0 : '16px')};
    border-bottom-right-radius: ${(props) => (props.multiple ? 0 : '16px')};
  }
`;

export const CoverImagesmall = styled(Img)<{ multiple?: boolean }>`
  margin: 20px 0 40px 0;
  border-radius: 16px;
  background-color: #2c2c2c;
  height: 410px;
  object-fit: cover;
`;

export const GalleryImage = styled(Img)`
  margin: 5px;
  background-color: #2c2c2c;
  height: 200px;
  width: 258px;
  object-fit: cover;
  /* border-radius: 16px; */
`;

export const GalleryImageSmall = styled(Img)`
  margin: 20px 0 40px 0;
  border-radius: 16px;
  background-color: #2c2c2c;
  height: 410px;
  object-fit: cover;
`;
