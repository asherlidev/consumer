import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React from 'react';
import * as S from './styles';

interface Props {
  imageUrl: string;
  centered?: boolean;
}

const SideImageFormPage: React.FC<Props> = ({ imageUrl, centered = false, children }) => {
  const breakpoints = useBreakpoint();

  return (
    <S.Container>
      <div className="row">
        {breakpoints.smUp && (
          <div className="col-md-6">
            <S.Mask imageUrl={imageUrl}>
              {breakpoints.sm && (
                <S.FormWrapper className="col-sm-offset-2 col-sm-8" whiteText centered={centered}>
                  {children}
                </S.FormWrapper>
              )}
            </S.Mask>
          </div>
        )}
        {!breakpoints.sm && (
          <S.Right className="col-xs-12 col-md-offset-1 col-md-4">
            <S.FormWrapper centered={centered}>{children}</S.FormWrapper>
          </S.Right>
        )}
      </div>
    </S.Container>
  );
};

export default SideImageFormPage;
