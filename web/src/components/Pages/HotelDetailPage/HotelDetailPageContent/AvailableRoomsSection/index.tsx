import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client/react/hooks';
import { addDays, differenceInDays, format } from 'date-fns';
import axios from 'axios';
import { useLocation } from '@reach/router';
import { parse } from 'query-string';

import { useHotelCreditConversion } from '../hotel-utils';
import { Hotel, Room } from '../..';
import { searchHotels } from '../../../../../utils/gqlQueries';
import DateRangeSelector from '../../../../Elements/DateRangeSelector';
import GuestSelectorPopover from '../../../../Elements/HotelSearchInput/GuestSelectorPopover';
import * as S from './styles';
import Skeleton from 'react-loading-skeleton';
import SearchIcon from './search.svg';

interface AvailableRoomsSectionProps {
  hotel: Hotel;
  onSelectClick: (room: Room) => void;
}

const AvailableRoomsSection: React.FC<AvailableRoomsSectionProps> = ({ hotel, onSelectClick }) => {
  const location = useLocation();
  const search = location.search;
  const { start, end, adults, children } = parse(search);

  const query = {
    inDate: Array.isArray(start) || !start ? undefined : parseInt(start),
    outDate: Array.isArray(end) || !end ? undefined : parseInt(end),
    guests: {
      adults: Array.isArray(adults) || !adults ? undefined : parseInt(adults),
      children: Array.isArray(children) || !children ? undefined : parseInt(children),
    },
  };

  const [range, setRange] = useState({
    startDate: new Date(query.inDate || Date.now()),
    endDate: query.outDate ? new Date(query.outDate) : addDays(Date.now(), 1),
  });
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [roomsNum, setRoomsNum] = useState(1);
  const [adultsNum, setAdults] = useState(query.guests.adults || 2);
  const [childrenNum, setChildren] = useState(query.guests.children || 0);

  const [maxRoomsViewable, setMaxRooms] = useState(5);

  const [rooms, setRooms] = useState<Room[]>(hotel.rooms || []);
  const [roomsLoading, setRoomsLoading] = useState(false);

  const [searchParams, setSearchParams] = useState({
    hotelIds: `${hotel?.id}`,
    inDate: range.startDate.getTime(),
    outDate: range.endDate.getTime(),
    rooms: roomsNum,
    adults: adultsNum,
    children: childrenNum,
  });

  useEffect(() => {
    if (searchParams.inDate === searchParams.outDate) return;

    let url = `${process.env.GATSBY_STRAPI_API_URL}/hotels/rooms?`;
    const editedParams = {
      ...searchParams,
      outDate: format(searchParams.outDate, 'yyyy-MM-dd'),
      inDate: format(searchParams.inDate, 'yyyy-MM-dd'),
    };

    for (var key in editedParams) {
      const paramKey = key as keyof typeof editedParams;
      url += editedParams[paramKey] ? key + '=' + editedParams[paramKey] + '&' : '';
    }
    setRoomsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setRoomsLoading(false);
        setRooms(response.data);
      })
      .catch((err) => {
        setRoomsLoading(false);
        console.error('Failed to reserve room: ', err);
      });
  }, [searchParams]);

  return (
    <S.Root>
      <S.RoomsHeader>
        Available Rooms&nbsp;
        <span style={{ fontSize: 12, color: 'gray' }}>({rooms ? rooms.length : 0} total)</span>
      </S.RoomsHeader>
      <h6 style={{ margin: 0 }}>Dates</h6>
      <S.InputButton onClick={() => setIsDateOpen(true)}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
          <div>
            <p style={{ margin: 0, fontSize: '12px' }}>
              <b>Check In</b>
            </p>
            <p>{format(range.startDate, 'MMM d, yyyy')}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '12px' }}>
              <b>Check Out</b>
            </p>
            <p>{format(range.endDate, 'MMM d, yyyy')}</p>
          </div>
        </div>
        <DateRangeSelector
          isOpen={isDateOpen}
          setIsOpen={setIsDateOpen}
          ranges={[
            {
              startDate: range.startDate,
              endDate: range.endDate,
              key: 'selection',
            },
          ]}
          onChange={(range: any) => {
            setRange({
              startDate: range.selection.startDate,
              endDate: range.selection.endDate,
            });
          }}
          top="30px"
          minDate={addDays(Date.now(), -1)}
        />
      </S.InputButton>
      <h6 style={{ margin: 0 }}>Guests</h6>
      <S.InputButton onClick={() => setIsGuestsOpen(true)}>
        {roomsNum} room{roomsNum !== 1 && 's'} for {adultsNum} adult{adultsNum !== 1 && 's'}
        {childrenNum > 0 && ' and ' + childrenNum + ' child'}
        {childrenNum > 1 && 'ren'}
        <GuestSelectorPopover
          guests={{ adults: adultsNum, rooms: roomsNum, children: childrenNum }}
          isGuestsOpen={isGuestsOpen}
          setIsGuestsOpen={setIsGuestsOpen}
          incrementAdults={(val) => setAdults(adultsNum + val)}
          incrementChildren={(val) => setChildren(childrenNum + val)}
          // incrementRooms={(val) => setRoomsNum(roomsNum + val)}
        />
      </S.InputButton>
      <S.SearchButton
        onClick={() =>
          setSearchParams({
            hotelIds: `${hotel?.id}`,
            inDate: range.startDate.getTime(),
            outDate: range.endDate.getTime(),
            rooms: roomsNum,
            adults: adultsNum,
            children: childrenNum,
          })
        }
      >
        <img src={SearchIcon} style={{ paddingRight: '8px' }} />
        Search Rooms
      </S.SearchButton>
      <S.RoomList>
        {roomsLoading &&
          [...Array(5)].map((_, index) => (
            <div key={index}>
              <Skeleton style={{ width: '180px', height: '24px', marginBottom: '12px' }} />
              <Skeleton style={{ width: '100%', height: '130px', marginBottom: '12px' }} />
            </div>
          ))}
        {!roomsLoading &&
          rooms &&
          rooms.map((room: Room, index: number) => {
            if (!room.name) return;
            if (index > maxRoomsViewable) return;
            return (
              <RoomItem
                room={room}
                onSelectClick={onSelectClick}
                key={room.code + room.inDate + room.outDate}
              />
            );
          })}
        {!roomsLoading && rooms.length === 0 && (
          <>
            <h3 style={{ marginBottom: '24px', marginTop: '36px' }}>Uh Oh!</h3>
            <S.NoRoomsTitle>No rooms found with this search.</S.NoRoomsTitle>
            <S.NoRoomsContent>
              Try changing or expanding your search to find more results!
            </S.NoRoomsContent>
          </>
        )}
      </S.RoomList>
      <S.ShowMoreButton
        disabled={rooms.length <= 5}
        onClick={() => {
          maxRoomsViewable >= rooms.length - 1 ? setMaxRooms(5) : setMaxRooms(maxRoomsViewable + 5);
        }}
      >
        {maxRoomsViewable >= rooms.length - 1 ? (
          <div style={{ padding: '8px' }}>
            <div>
              <i>Showing All Rooms</i>
            </div>
            <div>{rooms.length > 5 && <b>Show Less</b>}</div>
          </div>
        ) : (
          `Show More Rooms (Showing ${maxRoomsViewable + ''})`
        )}
      </S.ShowMoreButton>
    </S.Root>
  );
};

export default AvailableRoomsSection;

const RoomItem: React.FC<{ room: Room; onSelectClick: (room: Room) => void }> = ({
  room,
  onSelectClick,
}) => {
  const { creditCost, loading, error } = useHotelCreditConversion(room.total.amount);

  return (
    <div>
      <S.RoomContainer>
        <div>
          <S.RoomName>{room.name}</S.RoomName>
          <div
            style={{
              width: '60px',
              height: '1px',
              marginTop: '12px',
              marginBottom: '12px',
              background: 'rgba(170,170,170,0.7)',
            }}
          />
          <S.RoomSubtitle>{room.description}</S.RoomSubtitle>
          <S.Info>
            <i>{!room.bookingFee && 'This booking does not charge a booking fee.'}</i>
          </S.Info>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: 'gray', textAlign: 'end' }}>Credit Cost</div>
            <S.RoomPrice>{creditCost || <Skeleton width="61px" height="22px" />}</S.RoomPrice>
            <div style={{ fontSize: '12px', color: 'gray', textAlign: 'end' }}>
              <i>total</i>
            </div>
          </div>
          <S.ReserveButton
            onClick={() => {
              onSelectClick(room);
              if (document) {
                document
                  .getElementById('sticky-info-box')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
              }
            }}
          >
            Select
          </S.ReserveButton>
        </div>
      </S.RoomContainer>
      <div
        style={{
          width: '100%',
          height: '1px',
          marginTop: '12px',
          marginBottom: '12px',
          background: 'rgba(170,170,170,0.2)',
        }}
      />
    </div>
  );
};
