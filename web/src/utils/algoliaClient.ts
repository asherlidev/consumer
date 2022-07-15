import algolia from 'algoliasearch';
import { SearchOptions } from '@algolia/client-search';

export const searchIndexes = {
  events: process.env.GATSBY_ALGOLIA_EVENTS_INDEX as string,
  venues: process.env.GATSBY_ALGOLIA_VENUES_INDEX as string,
  talent: process.env.GATSBY_ALGOLIA_TALENT_INDEX as string,
  movies: process.env.GATSBY_ALGOLIA_MOVIES_INDEX as string,
  organizers: process.env.GATSBY_ALGOLIA_ORGANIZERS_INDEX as string,
};

export const client = algolia(
  process.env.GATSBY_ALGOLIA_ID as string,
  process.env.GATSBY_ALGOLIA_KEY as string
);

export const events = client.initIndex(process.env.GATSBY_ALGOLIA_EVENTS_INDEX as string);
export const venues = client.initIndex(process.env.GATSBY_ALGOLIA_VENUES_INDEX as string);
export const talent = client.initIndex(process.env.GATSBY_ALGOLIA_TALENT_INDEX as string);

export default { events, venues, client, talent, searchIndexes };
