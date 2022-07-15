import React from 'react';
import { Link } from 'gatsby';
import EventCardsNearby from '../../../../../Elements/EventCardsNearby';
import EventCardsRecentlyAdded from '../../../../../Elements/EventCardsRecentlyAdded';
import IntroSection from './IntroSection';
import LatestPodcastEpisode from './LatestPodcastEpisode';
import OfferOfTheWeekSection from './OfferOfTheWeekSection';
import { ViewAllSection } from '../common/styles';

interface Props {}

const NewsletterPreview: React.FC<Props> = () => (
  <>
    <IntroSection />
    <EventCardsNearby withoutPadding type="grid" hitsPerPage={4} />
    <ViewAllSection>
      <Link to="/events#nearby-events">View All</Link>
    </ViewAllSection>
    <EventCardsRecentlyAdded withoutPadding type="grid" hitsPerPage={4} />
    <ViewAllSection>
      <Link to="/events#recent-events">View All</Link>
    </ViewAllSection>
    <LatestPodcastEpisode isMock />
    <OfferOfTheWeekSection />
  </>
);

export default NewsletterPreview;
