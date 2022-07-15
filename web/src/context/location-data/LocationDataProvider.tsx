import React, { useContext, useEffect, useMemo, useState } from 'react';
import * as http from '../../utils/httpClient';
import { useSessionStorage } from '../../utils/storage';

interface IpLocationResponse {
  ip: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip_code: string;
  time_zone: string;
  latitude: number;
  longitude: number;
  metro_code: number;
}

type ContextValue = {
  ipLocationData: IpLocationResponse | undefined;
  browserLocationData: Position | undefined;
  loadingBrowserLocation: boolean;
};

const LocationContext = React.createContext<ContextValue | undefined>(undefined);

const LocationDataProvider: React.FC<{}> = (props) => {
  const [ipLocationData, setIpLocationData] = useSessionStorage<IpLocationResponse | undefined>(
    'fp__LocationDataProvider_ipLocationData'
  );
  const [browserLocationData, setBrowserLocationData] = useState<Position | undefined>();
  const [loadingBrowserLocation, setLoadingBrowserLocation] = useState(true);

  useEffect(() => {
    let abortFn: Function | undefined;

    const fetchIpLocationData = async () => {
      try {
        const { promise, abort } = http.customFetch<IpLocationResponse>(
          'https://freegeoip.app/json/',
          {
            headers: { 'Content-Type': 'text/plain' },
          }
        );

        abortFn = abort;

        const ipData = await promise;

        setIpLocationData(ipData);
      } catch (e) {
        console.error(e);
      }
    };

    const getBrowserLocationData = () => {
      setLoadingBrowserLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setBrowserLocationData(position);
          setLoadingBrowserLocation(false);
        },
        () => {
          setLoadingBrowserLocation(false);
        }
      );
    };

    fetchIpLocationData();
    getBrowserLocationData();

    return () => {
      if (abortFn != null) {
        abortFn();
      }
    };
  }, [setIpLocationData]);

  const value = useMemo(() => ({ ipLocationData, browserLocationData, loadingBrowserLocation }), [
    ipLocationData,
    browserLocationData,
    loadingBrowserLocation,
  ]);

  return <LocationContext.Provider value={value} {...props} />;
};

const useLocationData = (): ContextValue => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationData must be used within an LocationDataProvider');
  }
  return context;
};

export { useLocationData, LocationDataProvider };
