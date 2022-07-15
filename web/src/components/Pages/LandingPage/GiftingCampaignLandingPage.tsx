import { PageProps, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';
import AboutSection from './AboutSection';
import FestivalPartnersSection from './FestivalPartnersSection';
import FoundingMemberSection from './FoundingMemberSection';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import OurStorySection from './OurStorySection';
import { GiftingSuperHeroSection } from './SuperHeroSection';
import { InboundCampaign } from './SuperHeroSection/InboundSuperHeroSection';
import WhatsDifferentSection from './WhatsDifferentSection';

const GiftingCampaignLandingPage: React.FC<PageProps<{}, { campaign_id: string; name: string }>> =
  ({ pageContext: { campaign_id, name } }) => (
    <>
      <Helmet title={name} />
      <Header withoutBottomBorder />
      <GiftingSuperHeroSection campaign_id={campaign_id} />
      <HeroSection />
      <AboutSection />
      <FestivalPartnersSection />
      <WhatsDifferentSection />
      <HowItWorksSection />
      <FoundingMemberSection />
      <OurStorySection />
      <Footer />
    </>
  );

export default GiftingCampaignLandingPage;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
