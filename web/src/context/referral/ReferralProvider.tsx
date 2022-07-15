import React, { useContext, useEffect, useMemo } from 'react';
import * as http from '../../utils/httpClient';
import { useSessionStorage } from '../../utils/storage';

interface ReferralUser {
  first_name: string;
  id: number;
  last_name: string;
  referral_code: string;
}

type ContextValue = {
  referralCode: string | undefined;
  setReferralCode: (referralCode: string) => void;
  referralUser: ReferralUser | undefined;
  referralUserDisplayName: string;
};

const ReferralContext = React.createContext<ContextValue | undefined>(undefined);

const ReferralProvider: React.FC<{}> = (props) => {
  const [referralCode, setReferralCode] = useSessionStorage<string | undefined>(
    'fp__ReferralProvider_referralCode'
  );
  const [referralUser, setReferralUser] = useSessionStorage<ReferralUser | undefined>(
    'fp__ReferralProvider_referralUser'
  );

  useEffect(() => {
    const fetchReferralUser = async () => {
      try {
        const { promise } = http.customFetch<ReferralUser>(
          `${process.env.GATSBY_STRAPI_API_URL}/referral/${referralCode}`
        );

        const referralUser = await promise;

        setReferralUser(referralUser);
      } catch (e) {
        console.error(e);
      }
    };

    if (referralCode) {
      fetchReferralUser();
    }
  }, [referralCode, setReferralUser]);

  const referralUserDisplayName = useMemo(() => {
    if (referralUser) {
      return referralUser.first_name;
    } else if (referralCode) {
      const regexMatch = referralCode.match(/([\D]*)[0-9]*/);
      return regexMatch && regexMatch.length > 1 ? regexMatch[1] : '';
    }
    return '';
  }, [referralCode, referralUser]);

  const value = useMemo(
    () => ({
      referralCode,
      setReferralCode,
      referralUser,
      referralUserDisplayName,
    }),
    [referralCode, referralUser, referralUserDisplayName, setReferralCode]
  );

  return <ReferralContext.Provider value={value} {...props} />;
};

const useReferral = (): ContextValue => {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error('useReferral must be used within an ReferralProvider');
  }
  return context;
};

export { useReferral, ReferralProvider };
