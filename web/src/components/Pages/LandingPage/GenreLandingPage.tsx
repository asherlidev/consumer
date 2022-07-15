import { PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';
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
import WhatsDifferentSection from './WhatsDifferentSection';

const GenreLandingPage: React.FC<PageProps<{}, { genre: string; heroImage: FluidObject }>> = ({
  pageContext: { genre, heroImage },
}) => (
  <>
    <Helmet title={genre} />
    <Header withoutBottomBorder isTransparent />
    <HeroSection heroImage={heroImage} />
    <AboutSection />
    <FestivalPartnersSection />
    <WhatsDifferentSection />
    <HowItWorksSection />
    <FoundingMemberSection />
    <OurStorySection />
    <Footer />
  </>
);

export default GenreLandingPage;

// export const query = graphql`
//   {
//     ...LocaleQuery
//   }
// `;
