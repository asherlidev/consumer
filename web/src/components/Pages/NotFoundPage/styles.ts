import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  padding: 100px 10px 10px 10px;
  height: calc(100vh - 66.25px);
`;

export const Logo = styled.img`
  width: 120px;
  height: 120px;
  margin: 0 auto;
`;

export const CaptionText = styled.p`
  font-size: 16px;
  padding: 20px;
  text-align: center;
  line-height: 30px;
  color: #091d2c;
  margin-left: auto;
  margin-right: auto;
`;
