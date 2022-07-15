import React, { useCallback, useEffect, useState } from 'react';
import { customFetch, runIfNotAborted } from '../../../../utils/httpClient';
import * as S from './styles';
import { gql, useMutation, useQuery } from '@apollo/client';

interface Props {
  className?: string;
}

const CrowdfundingBanner: React.FC<Props> = ({ className }) => {
  const bannerQuery = gql`
    query searchdynamicHeaderBanner {
      dynamicHeaderBanner {
        cta_url
        cta_text
      }
    }
  `;

  const { data, loading, error } = useQuery<any>(bannerQuery);

  if (loading || error || !data) return <div />;

  return (
    <S.Container className={className}>
      <S.NavLink rel="noopener noreferrer" to={data.dynamicHeaderBanner.cta_url} target="_blank">
        {data.dynamicHeaderBanner.cta_text} &raquo;
      </S.NavLink>
    </S.Container>
  );
};

export default CrowdfundingBanner;
