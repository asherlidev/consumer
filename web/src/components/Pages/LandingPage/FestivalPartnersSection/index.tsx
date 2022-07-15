import { graphql, useStaticQuery } from 'gatsby';
import { map } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FestivalPartnersSectionQuery } from '../../../../../graphql-types';
import { Title } from '../../../Elements';
import EventCards from '../../../Elements/EventCards';
import * as LandingPageS from '../landingPageStyles';
import * as S from './styles';

interface Props {
  className?: string;
}

const FestivalPartnersSection: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  const data = useStaticQuery<FestivalPartnersSectionQuery>(festivalPartnersSectionQuery);

  return (
    <LandingPageS.Section withoutTopPadding className={className}>
      <div className="container">
        <LandingPageS.FpHiw>
          <S.TitleContainer>
            <Title>{t('landingPage.festivalPartners.title')}</Title>
            <small>{t('landingPage.festivalPartners.subtitle')}</small>
          </S.TitleContainer>
          <EventCards events={map(data.allStrapiFestival.edges, 'node')} />
        </LandingPageS.FpHiw>
      </div>
    </LandingPageS.Section>
  );
};

export default FestivalPartnersSection;

//
// Utils
//

const festivalPartnersSectionQuery = graphql`
  query FestivalPartnersSection {
    allStrapiFestival(
      limit: 20
      filter: { isActive: { eq: true }, isFeatured: { eq: true } }
      sort: { order: ASC, fields: order }
    ) {
      ...EventCardFragment
    }
  }
`;
