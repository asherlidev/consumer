import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PreviewEvent } from '../../../../EventDetailPage/EventDetailPageContent';
import { useEventForm } from './FormProvider';

interface ContextValue {
  eventPreview: PreviewEvent;
  setEventPreview: (newEventPreview: PreviewEvent) => void;
}

const EventPreviewContext = createContext<ContextValue | undefined>(undefined);

interface Props {}

const EventPreviewProvider: React.FC<Props> = (props) => {
  const { fetchedEvent } = useEventForm();
  const [eventPreview, setEventPreview] = useState<PreviewEvent>({});

  useEffect(() => {
    if (fetchedEvent) {
      setEventPreview(fetchedEvent);
    }
  }, [fetchedEvent]);

  const contextValue = useMemo(
    () => ({
      eventPreview,
      setEventPreview,
    }),
    [eventPreview]
  );

  return <EventPreviewContext.Provider value={contextValue} {...props} />;
};

export const useEventPreview = () => {
  const value = useContext(EventPreviewContext);
  if (value === undefined) {
    throw new Error('useEventPreview must be used inside a EventPreviewProvider');
  }
  return value;
};

export default EventPreviewProvider;
