import styled from 'styled-components';

export const Container = styled.div``;

export const Label = styled.label`
  font-weight: 500;
  color: rgb(9, 29, 44);
  padding: 5px;
  margin: 0;
`;

export const ImagesGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const ImagesGridElement = styled.div<{ imageUrl?: string }>`
  width: 225px;
  height: 149px;
  border-radius: 16px;
  margin-bottom: 13px;
  margin: 10px;
  background-color: #e7e7e7;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center center;
`;

export const AddImageGridElement = styled(ImagesGridElement)`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e7e7e7;
  position: relative;
`;

export const ImageInput = styled.input`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  width: 100%;
  z-index: 1;
  cursor: pointer;
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 15px;
  width: 35px;
  height: 35px;
  overflow: hidden;
  background: transparent;
  margin-bottom: 0;
  padding: 0;
  border: 1px solid transparent;
  cursor: pointer;

  :before,
  :after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: #fff;
    border-radius: 5px;
    margin-top: -6px;
    transition: background-color 200ms ease-in-out;
  }

  :hover:before,
  :hover:after {
    background-color: #fa2069;
  }

  :before {
    transform: rotate(45deg);
  }

  :after {
    transform: rotate(-45deg);
  }
`;
