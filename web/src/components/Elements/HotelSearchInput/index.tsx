import React, { useEffect, useState } from 'react';
import { addDays, format, getTime } from 'date-fns';

import * as S from './styles';
import SearchIcon from '../../Icons/SearchIcon';
import DropDownModal from '../DropDownModal';
import DateRangeSelector from '../DateRangeSelector';
import Locations from '../../../utils/cities';
import { navigate } from 'gatsby-link';
import GuestSelectorPopover from './GuestSelectorPopover';
import axios from 'axios';

export type QueryType = {
  location?: string;
  inDate?: number;
  outDate?: number;
  guests?: { adults?: number; children?: number; rooms?: number };
  page?: number;
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  query?: QueryType;
  onQueryChange: (q: QueryType) => void;
  onSearchClick?: (q: QueryType) => void;
  disabled?: boolean;
  darkMode?: boolean;
  boldLabel?: boolean;
  containerProps?: any;
  textArea?: boolean;
  listName?: string;
  options?: Option[];
  errorMessage?: string | undefined | boolean;
}

type CitySearchResult = {
  LocationId: number;
  Name: string;
  NumberOfHotels: number;
};

const HotelSearchInput: React.FC<Props> = ({
  label,
  query,
  onQueryChange,
  onSearchClick,
  disabled = false,
  darkMode = false,
  boldLabel = false,
  containerProps,
}) => {
  const [isCitiesOpen, setIsCitiesOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const [locations, setLocations] = useState<CitySearchResult[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.GATSBY_STRAPI_API_URL}/hotels/city-search?city=${query?.location}`)
      .then(({ data }) => {
        console.log({ data });
        setLocations(data);
      })
      .catch((error) => {
        setLocations([]);
        console.error(error);
      });
  }, [query?.location]);

  const incrementAdults = (amount: number) =>
    onQueryChange({
      ...query,
      guests: {
        ...query?.guests,
        adults: amount + (query?.guests?.adults || 1),
      },
    });

  const incrementChildren = (amount: number) =>
    onQueryChange({
      ...query,
      guests: {
        adults: query?.guests?.adults || 1,
        children: amount + (query?.guests?.children || 0),
      },
    });

  // Not implemented right now
  const incrementRooms = (amount: number) =>
    onQueryChange({
      ...query,
      guests: {
        ...query?.guests,
        rooms: amount + (query?.guests?.rooms || 1),
      },
    });

  return (
    <S.Container style={{ ...containerProps }}>
      {label && (
        <S.Label bold={boldLabel} darkMode={darkMode}>
          {label}
        </S.Label>
      )}
      <S.SearchBar>
        <S.InputContainer>
          <S.Input
            disabled={disabled}
            value={query?.location}
            onChange={(e) => {
              onQueryChange({ ...query, location: e.target.value });
              if (!isCitiesOpen) setIsCitiesOpen(true);
            }}
            onFocus={() => setIsCitiesOpen(true)}
            placeholder="Location"
          />
          <DropDownModal
            isOpen={isCitiesOpen}
            setIsOpen={setIsCitiesOpen}
            position={{ top: '70px', left: '0px' }}
          >
            <div
              style={{
                width: '310px',
                display: 'flex',
                flexDirection: 'column',
                gridGap: '12px',
              }}
            >
              {locations &&
                locations.slice(0, 7).map((location) => (
                  <S.CityLink
                    onClick={() => {
                      setIsCitiesOpen(false);
                      onQueryChange({
                        ...query,
                        location: location.Name,
                      });
                    }}
                  >
                    {location.Name}
                  </S.CityLink>
                ))}
            </div>
          </DropDownModal>
        </S.InputContainer>
        <S.Divider />
        <div style={{ width: '100%', height: '100%' }}>
          <S.InputButton
            onClick={() => setIsDateOpen(true)}
            // Must be done this way for Typescript ¯\_(ツ)_/¯
            hasValue={query?.inDate || query?.outDate ? true : false}
            focused={isDateOpen}
          >
            {query?.inDate && query?.outDate
              ? `${query?.inDate ? format(query?.inDate, 'MMM dd') : 'N/A'} - ${
                  query?.outDate ? format(query?.outDate, 'MMM dd') : 'N/A'
                }`
              : 'Select dates'}
          </S.InputButton>
          <DateRangeSelector
            isOpen={isDateOpen}
            setIsOpen={setIsDateOpen}
            ranges={[
              {
                startDate: query?.inDate ? new Date(query.inDate) : undefined,
                endDate: query?.outDate ? new Date(query.outDate) : undefined,
                key: 'selection',
              },
            ]}
            onChange={(range: any) =>
              onQueryChange({
                ...query,
                inDate: range.selection.startDate.getTime(),
                outDate: range.selection.endDate.getTime(),
              })
            }
            top="30px"
            minDate={addDays(Date.now(), -1)}
          />
        </div>
        <S.Divider />
        <S.InputButton
          onClick={() => setIsGuestsOpen(true)}
          hasValue={
            !!query?.guests?.adults || !!query?.guests?.children || !!query?.guests?.rooms
              ? true
              : false
          }
          focused={isGuestsOpen}
        >
          {query?.guests?.rooms && `${query?.guests?.rooms} room${query?.guests?.rooms && 's'}`}
          {query?.guests?.rooms && (query?.guests?.adults || query?.guests?.children) && ' for '}
          {query?.guests?.adults || query?.guests?.children
            ? `${
                query?.guests?.adults
                  ? query?.guests?.adults + ` adult${query?.guests?.adults > 1 ? 's' : ''}`
                  : ''
              }${query?.guests?.adults && query?.guests?.children ? ', ' : ''} ${
                query?.guests?.children
                  ? query?.guests?.children + ` child${query?.guests?.children > 1 ? 'ren' : ''}`
                  : ''
              }`
            : 'Guests'}
          <GuestSelectorPopover
            guests={query?.guests}
            isGuestsOpen={isGuestsOpen}
            setIsGuestsOpen={setIsGuestsOpen}
            incrementAdults={incrementAdults}
            incrementChildren={incrementChildren}
            // incrementRooms={incrementRooms}
          />
        </S.InputButton>
        <S.SearchButton
          aria-label="Search"
          onClick={() => {
            if (!query) return;
            if (onSearchClick && query) onSearchClick(query);
            const searchParams: { [key: string]: any } = {
              location: query.location,
              start: query.inDate,
              end: query.outDate,
              adults: query.guests?.adults,
              children: query.guests?.children,
              rooms: query.guests?.rooms,
              page: 1,
            };

            navigate(
              `/hotels/search?${Object.keys(searchParams)
                .filter((key) => !!searchParams[key])
                .map((key) => `${key}=${searchParams[key]}`)
                .join('&')}`
            );
          }}
        >
          <SearchIcon />
        </S.SearchButton>
      </S.SearchBar>
    </S.Container>
  );
};

export default HotelSearchInput;

//
// Utils
//

interface Option {
  id: string;
  slug_name: string;
  name: string;
}
