import { PageProps, graphql } from 'gatsby';
import { head } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Maybe } from '../../../../graphql-types';
import colors from '../../../constants/colors';
import { CloudinaryImage, GalleryImage } from '../../../types/common';
import { Chip, LinkedEventsSection, Title } from '../../Elements';
import { LinkedEvent } from '../../Elements/LinkedEventsSection';
import ScrollToTop from '../../Elements/ScrollToTop';
import { Footer, Header, PageWrapper } from '../../Layout';
import GatsbyEventImageGallery from '../EventDetailPage/GatsbyEventImageGallery';
import websiteLinkIcon from './icons/websiteLinkIcon.svg';
import * as S from './styles';

export interface Organization {
  id: number;
  strapiId: number;
  name: string;
  slug_name: string;
  website_url: Maybe<string>;
  logo: Maybe<CloudinaryImage>;
  gallery: GalleryImage[];
  description: string;
  events: LinkedEvent[];
}

const OrganizationDetailPage: React.FC<PageProps<{}, { organization: Organization }>> = ({
  pageContext: {
    organization: { gallery, events, logo, name, description, website_url },
  },
}) => {
  const { t } = useTranslation();

  return (
    <>
      <ScrollToTop />
      <Header withoutBottomBorder />
      <PageWrapper backgroundColor={colors.white}>
        <S.Content className="container">
          <S.Infoheader className="row">
            <div className="col-md-8 col-xs-12">
              <Chip
                backgroundColor="#5552A2"
                text={t('organizationDetailPageContent.chip.organizer')}
              />
              <Title>{name}</Title>
            </div>
          </S.Infoheader>

          {website_url && (
            <>
              <S.InfoIcon src={websiteLinkIcon} alt="Website link icon" />
              <S.WebsiteLink href={website_url} target="_blank" rel="noreferrer">
                {t('organizationDetailPageContent.website')}
              </S.WebsiteLink>
            </>
          )}

          <GatsbyEventImageGallery event={{ cover_image: logo, gallery }} />

          <Title>{t('organizationDetailPageContent.description.title')}</Title>
          <S.Description>
            {description ||
              head(events)?.summary ||
              t('organizationDetailPageContent.description.placeholder')}
          </S.Description>

          <LinkedEventsSection events={events} />
        </S.Content>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default OrganizationDetailPage;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
