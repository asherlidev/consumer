import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Maybe } from '../../../graphql-types';
import * as http from '../../utils/httpClient';
import { useSessionStorage } from '../../utils/storage';
import { useLocationData } from '../location-data';

type ContextValue = {
  savedEmail: string | undefined;
  savePresignupInDb: (email: string) => Promise<void>;
};

const PresignupContext = React.createContext<ContextValue | undefined>(undefined);

const PresignupProvider: React.FC<{}> = (props) => {
  const { ipLocationData } = useLocationData();
  const [sourceUrl, setSourceUrl] = useSessionStorage<string>('fp__PresignupProvider_sourceUrl');
  const [savedEmail, setSavedEmail] = useSessionStorage<string | undefined>(
    'fp__PresignupProvider_savedEmail'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Can't use `useLocation` of `@reach/router` because it's not available in this part of the code
      setSourceUrl(window.location.href);
    }
  }, [setSourceUrl]);

  const savePresignupInDb = useCallback(
    async (email: string) => {
      console.log('savePresignupInDb');
      console.log(email);
      if (!savedEmail || email !== savedEmail) {
        console.log('set savedEmail');
        setSavedEmail(email);

        try {
          const payload: {
            email: string;
            zipcode?: string;
            ip_address?: string;
            source_url?: string;
          } = { email };

          if (ipLocationData) {
            payload.zipcode = ipLocationData.zip_code;
            payload.ip_address = ipLocationData.ip;
          }

          if (sourceUrl) {
            // TODO: this field is not correctly persisted in the backend because the endpoint returns a null value
            payload.source_url = sourceUrl;
          }

          const { promise } = http.customFetch<{
            createdAt: string;
            email: string;
            id: number;
            ip_address: Maybe<string>;
            source_url: Maybe<string>;
            updatedAt: string;
            zipcode: Maybe<string>;
          }>(`${process.env.GATSBY_STRAPI_API_URL}/presignups`, {
            method: 'POST',
            body: http.json(payload),
          });

          await promise;
        } catch (e) {
          console.error(e);
        }
      }
    },
    [ipLocationData, savedEmail, setSavedEmail, sourceUrl]
  );

  const value = useMemo(
    () => ({
      savedEmail,
      savePresignupInDb,
    }),
    [savePresignupInDb, savedEmail]
  );

  return <PresignupContext.Provider value={value} {...props} />;
};

const usePresignup = (): ContextValue => {
  const context = useContext(PresignupContext);
  if (context === undefined) {
    throw new Error('usePresignup must be used within an PresignupProvider');
  }
  return context;
};

export { usePresignup, PresignupProvider };
