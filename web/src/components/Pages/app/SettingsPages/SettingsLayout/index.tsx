import React from 'react';
import { Title } from '../../../../Elements';
import { Footer, Header, PageWrapper } from '../../../../Layout';
import * as S from './styles';
import Tabs from './Tabs';

interface Props {
  title: string;
}

const SettingsLayout: React.FC<Props> = ({ children, title }) => (
  <S.BackgroundContainer>
    <Header />
    <PageWrapper>
      <S.ContentContainer>
        <S.TopSection>
          <Title>{title}</Title>
          <Tabs />
        </S.TopSection>
        {children}
      </S.ContentContainer>
    </PageWrapper>
    <Footer />
  </S.BackgroundContainer>
);

export default SettingsLayout;
