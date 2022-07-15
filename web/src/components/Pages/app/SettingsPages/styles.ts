import styled from 'styled-components';

export const Section = styled.section`
  text-align: left;
  border-bottom: 1px solid #d8d8d8;
  padding: 25px 0;
`;

export const SectionTitle = styled.h3`
  font-weight: 600;
  font-size: 1.6rem;
  margin: 0.5em 0 1.5em 0;
`;

export const SettingControlRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-gap: 50px;
  align-items: center;

  > div:last-child {
    justify-self: end;
  }
`;
