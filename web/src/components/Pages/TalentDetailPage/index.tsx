import { PageProps, graphql } from 'gatsby';
import { head } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { Maybe } from '../../../../graphql-types';
import colors from '../../../constants/colors';
import { CloudinaryImage, GalleryImage } from '../../../types/common';
import { LinkedEventsSection, Title } from '../../Elements';
import NormalChip from '../../Elements/NormalChip';
import { LinkedEvent } from '../../Elements/LinkedEventsSection';
import ScrollToTop from '../../Elements/ScrollToTop';
import { Footer, Header, PageWrapper } from '../../Layout';
import GatsbyEventImageGallery from '../EventDetailPage/GatsbyEventImageGallery';
import websiteLinkIcon from '../OrganizationDetailPage/icons/websiteLinkIcon.svg';
import facebookIcon from './icons/facebookIcon.svg';
import instagramIcon from './icons/instagramIcon.svg';
import twitterIcon from './icons/twitterIcon.svg';
import * as S from './styles';
import VenueCards from '../../Elements/VenueCards/VenueCards';
import VanueEvents from '../../Elements/VenuesEvents';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import NotFoundPage from '../../../components/Pages/NotFoundPage';
import { Btn } from '../../Elements';
import LinkIcon from '../VenueDetailPage/icons/link-icon.svg';
import shareIcon from '../EventDetailPage/EventDetailPageContent/icons/shareIcon.svg';
import heartIcon from '../VenueDetailPage/icons/heart-white-outline-icon.svg';
import EventsImageGallery from '../EventDetailPage/EventsImageGallery';
import { GatsbyEvent } from '../EventDetailPage/EventDetailPageContent';
import ShareModal from '../EventDetailPage/EventShareButton/ShareModal';

export interface Talent {
  id: number;
  strapiId: number;
  name: string;
  slug_name: string;
  website_url: Maybe<string>;
  facebook_url: Maybe<string>;
  twitter_url: Maybe<string>;
  instagram_url: Maybe<string>;
  image: Maybe<CloudinaryImage>;
  gallery: GalleryImage[];
  description: string;
  events: LinkedEvent[];
}

const TalentDetailPage: React.FC<PageProps<{}, { talent: Talent }>> = ({
  pageContext: {
    talent: {
      id,
      gallery,
      events,
      image,
      name,
      description,
      website_url,
      facebook_url,
      twitter_url,
      instagram_url,
    },
  },
}) => {
  const { t } = useTranslation();

  const breakpoints = useBreakpoint();

  const pageTitle = name ? `Festival Pass - ${name}` : 'Festival Pass - Live. Life. Live.';
  const pageDescription = description ? description : '';
  const now = moment().unix();

  const checkDate = (i) => {
    if (i && i.start) {
      const date = moment(i.start).unix();
      if (date >= now) {
        return true;
      }
    }
    return false;
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const newEvents = events ? events.filter(checkDate) : [];

  return (
    <>
      <Helmet>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={pageDescription} key="ogdesc" />
        <meta property="og:image" content={image?.url} key="ogimage" />
        <title>{pageTitle}</title>
      </Helmet>
      <ScrollToTop />
      <Header withoutBottomBorder />
      {/* {<CenteredLoading />} */}
      {/* {error && <div>{error}</div>} */}
      {!name && (
        <PageWrapper backgroundColor={colors.white}>
          <S.NotFoundWrapper>
            <NotFoundPage />
          </S.NotFoundWrapper>
        </PageWrapper>
      )}
      {name && (
        <PageWrapper backgroundColor={colors.white}>
          <S.Content className="">
            <S.Infoheader className="row">
              <div className="col-md-8 col-xs-12">
                {/* <Chip backgroundColor="#00B7EB" text={t('venueDetailPageContent.chip.venue')} /> */}
                <S.ChipsContainer>
                  <NormalChip
                    backgroundColor={colors.blue}
                    fontColor={colors.white}
                    label={t('talentDetailPageContent.chip.talent')}
                  />
                </S.ChipsContainer>
                <S.TitleContainer>{name}</S.TitleContainer>
              </div>
            </S.Infoheader>

            <S.EventInfoRow>
              <S.FlexInfoSection>
                <span>
                  <img src={LinkIcon} alt="Link icon" />
                  {website_url ? (
                    <a href={website_url || ''}> Website</a>
                  ) : (
                    <small>No website available</small>
                  )}
                </span>
              </S.FlexInfoSection>

              {breakpoints.smUp && (
                <div>
                  <Btn
                    img={shareIcon}
                    background={colors.transparent}
                    color={colors.black}
                    height="40px"
                    fontSize="14px"
                    fontWeight={500}
                    onClick={onOpen}
                  >
                    {t('eventDetailPageContent.share')}
                  </Btn>
                  <S.FavouriteBtn>
                    <img src={heartIcon} alt="icon" />
                    <a>{t('venueDetailPageContent.favorite')}</a>
                  </S.FavouriteBtn>
                </div>
              )}
            </S.EventInfoRow>

            <EventsImageGallery event={{ cover_image: image, gallery } as GatsbyEvent} />

            {/* <GatsbyEventImageGallery event={{ cover_image, gallery }} /> */}

            {!breakpoints.smUp && (
              <S.ShareAndLikeContainer>
                <div>
                  <S.FavouriteBtn>
                    <img src={heartIcon} alt="icon" />
                    <a>{t('venueDetailPageContent.favorite')}</a>
                  </S.FavouriteBtn>
                  <Btn
                    img={shareIcon}
                    background={colors.transparent}
                    color={colors.black}
                    height="40px"
                    fontSize="14px"
                    fontWeight={500}
                  >
                    {t('eventDetailPageContent.share')}
                  </Btn>
                </div>
              </S.ShareAndLikeContainer>
            )}

            <S.FpInterestRow className="row">
              <div className="col-xs-12 col-md-6">
                <S.DescriptionTitle>
                  {t('talentDetailPageContent.description.title')}
                </S.DescriptionTitle>
                <S.SocialRow>
                  {instagram_url && (
                    <a href={instagram_url} target="_blank" rel="noreferrer">
                      <img src={instagramIcon} alt="Instagram icon" />
                    </a>
                  )}

                  {twitter_url && (
                    <a href={twitter_url} target="_blank" rel="noreferrer">
                      <img src={twitterIcon} alt="Twitter icon" />
                    </a>
                  )}

                  {facebook_url && (
                    <a href={facebook_url} target="_blank" rel="noreferrer">
                      <img src={facebookIcon} alt="Facebook icon" />
                    </a>
                  )}
                </S.SocialRow>
              </div>
              <div className="col-xs-12 col-md-5 col-md-offset-1">
                <S.Description>{description || head(events)?.summary}</S.Description>
              </div>
            </S.FpInterestRow>
          </S.Content>
          <S.EventVanueContainer>
            <VanueEvents events={newEvents || []} />
          </S.EventVanueContainer>

          <S.Content>
            <S.SimilarVenueContainer>
              <S.DescriptionTitle>{t('talentDetailPageContent.similarTalent')}</S.DescriptionTitle>
              <VenueCards venues={[]} withoutPadding={true} />
            </S.SimilarVenueContainer>
          </S.Content>
          <ShareModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} type="talent" />
        </PageWrapper>
      )}
      <Footer />
    </>
  );
};

export default TalentDetailPage;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
