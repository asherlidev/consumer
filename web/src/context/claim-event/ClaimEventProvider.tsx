import React, { useContext, useMemo } from 'react';
import { GatsbyEvent } from '../../components/EventDetailPage/EventDetailPageContent';
import { useSessionStorage } from '../../utils/storage';

type ContextValue = {
  claimedEvent: GatsbyEvent | undefined;
  setClaimedEvent: (claimedEvent: GatsbyEvent | undefined) => void;
};

const ClaimEventContext = React.createContext<ContextValue | undefined>(undefined);

const ClaimEventProvider: React.FC<{}> = (props) => {
  const [claimedEvent, setClaimedEvent] = useSessionStorage<GatsbyEvent | undefined>(
    'fp__ClaimEventProvider_claimedEvent'
  );

  const value = useMemo(
    () => ({
      claimedEvent,
      setClaimedEvent,
    }),
    [claimedEvent, setClaimedEvent]
  );

  return <ClaimEventContext.Provider value={value} {...props} />;
};

const useClaimEvent = (): ContextValue => {
  const context = useContext(ClaimEventContext);
  if (context === undefined) {
    throw new Error('useClaimEvent must be used within an ClaimEventProvider');
  }
  return context;
};

export { useClaimEvent, ClaimEventProvider };
