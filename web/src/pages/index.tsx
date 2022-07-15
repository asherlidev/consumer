import { graphql, navigate, PageProps } from 'gatsby';
import { get } from 'lodash';
import { parse, stringifyUrl } from 'query-string';
import React, { useCallback, useEffect, useMemo } from 'react';
import { HomepageQuery } from '../../graphql-types';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import AboutSection from '../components/Pages/LandingPage/AboutSection';
import FestivalPartnersSection from '../components/Pages/LandingPage/FestivalPartnersSection';
import FoundingMemberSection from '../components/Pages/LandingPage/FoundingMemberSection';
import HeroSection from '../components/Pages/LandingPage/HeroSection';
import HowItWorksSection from '../components/Pages/LandingPage/HowItWorksSection';
import OurStorySection from '../components/Pages/LandingPage/OurStorySection';
import {
  OutboundSuperHeroSection,
  ReferralSuperHeroSection,
} from '../components/Pages/LandingPage/SuperHeroSection';
import { OutboundCampaign } from '../components/Pages/LandingPage/SuperHeroSection/OutboundSuperHeroSection';
import WhatsDifferentSection from '../components/Pages/LandingPage/WhatsDifferentSection';
import { useAuth } from '../context/auth';
import { usePresignup } from '../context/presignup';

const Page: React.FC<PageProps<HomepageQuery>> = ({ location, data }) => {
  const { isAuthenticated } = useAuth();

  const { genre, inbound, outbound, ref } = useMemo(() => parse(location.search), [
    location.search,
  ]);

  const { savedEmail, savePresignupInDb } = usePresignup();

  const defaultOutboundCampaign: OutboundCampaign | undefined = useMemo(
    () => get(data, 'allStrapiOutboundcampaign.edges[0].node'),
    [data]
  );

  const onOutboundSubmit = useCallback(
    async (email: string) => {
      await savePresignupInDb(email);
      navigate(stringifyUrl({ url: '/register', query: { src: 'presignup' } }));
    },
    [savePresignupInDb]
  );

  useEffect(() => {
    if (genre) {
      navigate(`/genre/${genre}`, { replace: true });
    } else if (inbound) {
      navigate(`/inbound/${inbound}`, { replace: true });
    } else if (outbound) {
      navigate(`/outbound/${outbound}`, { replace: true });
    } else if (isAuthenticated) {
      navigate('/events', { replace: true });
    }
  }, [isAuthenticated, genre, inbound, outbound, ref]);

  return (
    <>
      <Header isTransparent />
      {ref && <ReferralSuperHeroSection referralCode={ref as string} />}
      {!ref && defaultOutboundCampaign && (
        <OutboundSuperHeroSection
          outboundCampaign={defaultOutboundCampaign}
          email={savedEmail || ''}
          onSubmit={onOutboundSubmit}
        />
      )}
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

export default Page;

//
// Utils
//

export const homepageQuery = graphql`
  query Homepage {
    allStrapiOutboundcampaign(filter: { isActive: { eq: true }, isDefault: { eq: true } }) {
      edges {
        node {
          campaign_id
          cta_button_label
          headline
          headline_2
          subtitle
          body_content
          hero_image {
            childCloudinaryAsset {
              fluid {
                ...CloudinaryAssetFluid
              }
            }
          }
        }
      }
    }
    ...LocaleQuery
  }
`;
