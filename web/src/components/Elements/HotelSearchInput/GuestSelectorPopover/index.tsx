import React, { useMemo } from 'react';

import { QueryType } from '..';
import DropDownModal from '../../DropDownModal';
import * as S from '../styles';

interface GuestSelectorPopoverProps {
  guests?: { adults?: number; children?: number; rooms?: number };
  isGuestsOpen: boolean;
  setIsGuestsOpen: (val: boolean) => void;
  // incrementRooms: (val: number) => void;
  incrementAdults: (val: number) => void;
  incrementChildren: (val: number) => void;
}

const GuestSelectorPopover: React.FC<GuestSelectorPopoverProps> = ({
  guests,
  isGuestsOpen,
  setIsGuestsOpen,
  // incrementRooms,
  incrementAdults,
  incrementChildren,
}) => {
  return (
    <>
      <DropDownModal
        isOpen={isGuestsOpen}
        setIsOpen={setIsGuestsOpen}
        position={{ top: '70px', right: '0px' }}
      >
        <div
          style={{
            width: '310px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gridGap: '12px',
          }}
        >
          {/* <Incrementor
            placeholder="Number of rooms"
            label={'Rooms'}
            currentValue={guests?.rooms || 1}
            minValue={1}
            maxValue={9}
            onClick={(val) => incrementRooms(val)}
          />
          <div style={{ width: '100%', height: '1px', background: '#ddd' }} /> */}
          <Incrementor
            placeholder="Ages 13 or above"
            label={'Adults'}
            currentValue={guests?.adults || 1}
            minValue={1}
            maxValue={8}
            onClick={(val) => incrementAdults(val)}
          />
          <div style={{ width: '100%', height: '1px', background: '#ddd' }} />
          <Incrementor
            placeholder="Ages 12 or below"
            label={'Children'}
            currentValue={guests?.children || 0}
            minValue={0}
            maxValue={8}
            onClick={(val) => incrementChildren(val)}
          />
        </div>
      </DropDownModal>
    </>
  );
};

export default GuestSelectorPopover;

/**
 * This component is really complicated, probably could do for just
 * being refactored into two separate blocks for adults and children.
 */
const Incrementor: React.FC<{
  label: string;
  placeholder?: string;
  currentValue: number;
  onClick: (val: number) => void;
  minValue: number;
  maxValue: number;
}> = ({ currentValue, placeholder, onClick, minValue, maxValue, label }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'black' }}>
      <div style={{ textTransform: 'capitalize' }}>
        {label}
        <div style={{ color: '#999', textTransform: 'none' }}>{placeholder}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gridGap: '10px' }}>
        <S.GuestsChangeButton disabled={currentValue <= minValue} onClick={() => onClick(-1)}>
          <div
            style={{
              width: '12px',
              height: '3px',
              background: currentValue <= minValue ? 'gray' : 'black',
            }}
          />
        </S.GuestsChangeButton>
        <div>{currentValue}</div>
        <S.GuestsChangeButton disabled={currentValue >= maxValue} onClick={() => onClick(1)}>
          +
        </S.GuestsChangeButton>
      </div>
    </div>
  );
};
