import { PageProps, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React from 'react';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';
import AboutSection from './AboutSection';
import FestivalPartnersSection from './FestivalPartnersSection';
import FoundingMemberSection from './FoundingMemberSection';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import OurStorySection from './OurStorySection';
import { InboundSuperHeroSection } from './SuperHeroSection';
import { InboundCampaign } from './SuperHeroSection/InboundSuperHeroSection';
import WhatsDifferentSection from './WhatsDifferentSection';

const InboundCampaignLandingPage: React.FC<PageProps<{}, { inboundCampaign: InboundCampaign }>> = ({
  pageContext: { inboundCampaign },
}) => (
  <>
    <Helmet title={inboundCampaign.name} />
    <Header withoutBottomBorder />
    <InboundSuperHeroSection inboundCampaign={inboundCampaign} />
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

export default InboundCampaignLandingPage;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
