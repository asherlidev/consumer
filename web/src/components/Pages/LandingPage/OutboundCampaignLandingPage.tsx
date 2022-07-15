import { PageProps, graphql } from 'gatsby';
import { stringifyUrl } from 'query-string';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { navigate } from 'gatsby';
import { usePresignup } from '../../../context/presignup';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';
import AboutSection from './AboutSection';
import FestivalPartnersSection from './FestivalPartnersSection';
import FoundingMemberSection from './FoundingMemberSection';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import OurStorySection from './OurStorySection';
import { OutboundSuperHeroSection } from './SuperHeroSection';
import { OutboundCampaign } from './SuperHeroSection/OutboundSuperHeroSection';
import WhatsDifferentSection from './WhatsDifferentSection';

const OutboundCampaignLandingPage: React.FC<
  PageProps<{}, { outboundCampaign: OutboundCampaign }>
> = ({ pageContext: { outboundCampaign } }) => {
  const { savedEmail, savePresignupInDb } = usePresignup();

  const onOutboundSubmit = useCallback(
    async (email: string) => {
      await savePresignupInDb(email);
      navigate(stringifyUrl({ url: '/register', query: { src: 'presignup' } }));
    },
    [savePresignupInDb]
  );

  return (
    <>
      <Helmet title={outboundCampaign.headline} />
      <Header withoutBottomBorder isTransparent />
      <OutboundSuperHeroSection
        outboundCampaign={outboundCampaign}
        email={savedEmail || ''}
        onSubmit={onOutboundSubmit}
      />
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
};
export default OutboundCampaignLandingPage;

export const query = graphql`
  {
    ...LocaleQuery
  }
`;
