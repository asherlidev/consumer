import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import PageWrapper from '../PageWrapper';
import * as S from './styles';

interface Props {
  title: string;
  subtitle: any;
  imageUrl: string;
}

const RightSideImagePage: React.FC<Props> = ({ title, subtitle, imageUrl, children }) => {
  const breakpoints = useBreakpoint();

  return (
    <>
      <Header />
      <PageWrapper>
        <div className="row">
          <S.Left className="col-lg-6 col-md-6">
            <div className="col-xs-12 col-sm-9">
              <S.Title>{title}</S.Title>
              <S.Subtitle>{subtitle}</S.Subtitle>
              {children}
            </div>
          </S.Left>

          {breakpoints.mdUp && (
            <S.Right className="col-lg-6 col-md-6">
              <S.Mask>
                <S.FeatureImg src={imageUrl} />
              </S.Mask>
            </S.Right>
          )}
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default RightSideImagePage;
