import styled from 'styled-components';

export const Hero = styled.section<{ backgroundUrl: string }>`
  background: url('${(props) => props.backgroundUrl}') center center no-repeat;
  background-size: cover;
  padding: 20px;
  display: grid;
  position: relative;
`;

export const CopyGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-items: start;
`;

export const ViewAllSection = styled.section`
  display: flex;
  display: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  & > a {
    border: 1px solid #091d2c !important;
    color: #091d2c !important;
    padding: 20px !important;
    border-radius: 8px;
    min-width: 150px;
    text-align: center;
    font-weight: 600;
  }
`;
