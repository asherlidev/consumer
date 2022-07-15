import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow-x: hidden;
`;

export const Mask = styled.div`
  background-color: #fee8ef;
  text-align: left;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 100px;
`;

export const Logo = styled.img`
  position: absolute;
  top: 10px;
  left: 45px;
`;

export const FeatureImg = styled.img`
  max-width: 104%;
`;

export const CaptionTxt = styled.p`
  font-size: 16px;
  width: 417px;
  padding: 20px;
  text-align: center;
  line-height: 30px;
  color: #091d2c;
  margin-left: auto;
  margin-right: auto;
`;
