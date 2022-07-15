import React, { useContext, useMemo } from 'react';
import { useSessionStorage } from '../../utils/storage';

export interface GiftPlan {
  id: number;
  interval: 'month' | 'year';
  bonus_tickets: boolean;
  display_price: string;
  credits_awarded: number;
  referral_multiplier: number;
  stripe_plan_id: string;
}

type ContextValue = {
  giftPlan: GiftPlan | undefined;
  setGiftPlan: (giftPlan: GiftPlan) => void;
};

const GiftingContext = React.createContext<ContextValue | undefined>(undefined);

const GiftingProvider: React.FC<{}> = (props) => {
  const [giftPlan, setGiftPlan] = useSessionStorage<GiftPlan>('fp__GiftingProvider_giftPlan');

  const value = useMemo(
    () => ({
      giftPlan,
      setGiftPlan,
    }),
    [giftPlan, setGiftPlan]
  );

  return <GiftingContext.Provider value={value} {...props} />;
};

const useGifting = (): ContextValue => {
  const context = useContext(GiftingContext);
  if (context === undefined) {
    throw new Error('useGifting must be used within an GiftingProvider');
  }
  return context;
};

export { useGifting, GiftingProvider };
