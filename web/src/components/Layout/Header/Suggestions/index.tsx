import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as S from './styles';
import SuggestionItem from '../SuggestionItem';
import moment from 'moment';
import { searchIndexes } from '../../../../utils/algoliaClient';
import { RestEvent } from '../../../../context/user/UserProvider';
import { Talent } from '../../../Pages/TalentDetailPage';
import { Venue } from '../../../Pages/VenueDetailPage';

interface Props {
  query: string;
  setEmptySuggestion: (p: boolean) => void;
  type?: string[] | null;
}

type resp = Venue | RestEvent | Talent;

const Suggestions: React.FC<Props> = ({ query, setEmptySuggestion, type = null }) => {
  const [events, setEvents] = useState<RestEvent[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [talent, setTalent] = useState<Talent[]>([]);
  const [movies, setMovies] = useState<Venue[]>([]);
  const [organizers, setOrganizers] = useState<Venue[]>([]);

  const [fetchingResults, setFetchingResults] = useState<boolean>(false);

  const [allResp, setAllResp] = useState<resp[]>([]);

  const prevSearch = useRef<{ query?: string }>();

  useEffect(() => {
    setAllResp([...events, ...venues, ...talent, ...movies, ...organizers]);
    return () => setAllResp([]);
  }, [events, venues, talent, movies, organizers]);

  useEffect(() => {
    if (allResp.length === 0) {
      setEmptySuggestion(true);
    } else {
      setEmptySuggestion(false);
    }
  }, [allResp]);

  const fetchSearchResults = useCallback(async () => {
    if (query.length === 0) {
      setEvents([]);
      setVenues([]);
      setTalent([]);
      setMovies([]);
      setOrganizers([]);
    }
    if (prevSearch.current?.query !== query) {
      var d = new Date();
      var nd = Math.floor(d.getTime() / 1000);

      try {
        const algolia = await import('../../../../utils/algoliaClient');
        const indexes = algolia.searchIndexes;
        setFetchingResults(true);

        const multiQuery = algolia.client.multipleQueries([
          {
            indexName: indexes.events,
            query: query as string,
            params: {
              distinct: 1,
              facetFilters: ['isParent:true'],
              filters: `start_timestamp >= ${nd} `,
            },
          },
          {
            indexName: indexes.venues,
            query: query as string,
            params: {
              distinct: false,
            },
          },
          {
            indexName: indexes.talent,
            query: query as string,
            params: {
              distinct: false,
            },
          },
          {
            indexName: indexes.movies,
            query: query as string,
            params: {
              facetFilters: ['isActive:true'],
            },
          },
          {
            indexName: indexes.organizers,
            query: query as string,
            params: {
              facetFilters: ['isActive:true'],
            },
          },
        ]);

        const resp = (await multiQuery).results;

        for (const indexResp of resp) {
          if (
            indexResp.index === searchIndexes.events &&
            (!type || (type && type.includes('events')))
          ) {
            setEvents((indexResp.hits as any) as RestEvent[]);
          }
          if (
            indexResp.index === searchIndexes.venues &&
            (!type || (type && type.includes('venues')))
          ) {
            setVenues((indexResp.hits as any) as Venue[]);
          }
          if (
            indexResp.index === searchIndexes.talent &&
            (!type || (type && type.includes('talent')))
          ) {
            setTalent((indexResp.hits as any) as Talent[]);
          }
          if (
            indexResp.index === searchIndexes.movies &&
            (!type || (type && type.includes('movies')))
          ) {
            setMovies((indexResp.hits as any) as Venue[]);
          }
          if (
            indexResp.index === searchIndexes.organizers &&
            (!type || (type && type.includes('organizers')))
          ) {
            setOrganizers((indexResp.hits as any) as Venue[]);
          }
        }
      } catch (error) {
        console.error(error);
      }
      prevSearch.current = {
        query: query as string,
      };
      setFetchingResults(false);
    }
  }, [query]);

  useEffect(() => {
    fetchSearchResults();
  }, [query, fetchSearchResults]);

  if (allResp.length === 0) {
    return null;
  }

  return (
    <S.SuggestionsBox>
      {events.map((event) => (
        <SuggestionItem key={event.id} suggestion={event} type="event" />
      ))}
      {talent.length > 0 && <S.Divider />}
      {talent.map((talent) => (
        <SuggestionItem key={talent.id} suggestion={talent} type="talent" />
      ))}
      {movies.length > 0 && <S.Divider />}
      {movies.map((movie) => (
        <SuggestionItem key={movie.id} suggestion={movie} type="movie" />
      ))}
      {venues.length > 0 && <S.Divider />}
      {venues.map((venue) => (
        <SuggestionItem key={venue.id} suggestion={venue} type="venue" />
      ))}
    </S.SuggestionsBox>
  );
};

export default Suggestions;
