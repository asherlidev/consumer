import React, { createContext, useContext } from 'react';
import IncludeFbPixel from './IncludeFbPixel';
import IncludeGtm from './IncludeGtm';
import Cookies from 'js-cookie';

let withGTM = !!process.env.GATSBY_GTM_ID;
let withFbPixel = !!process.env.GATSBY_FACEBOOK_PIXEL_ID;

type ContextValue = {
  trackWithFbPixel: () => void;
  addToGtmDatalayer: (customDataLayer: Object) => void;
};

export const AnalyticsContext = createContext<ContextValue | undefined>(undefined);

const AnalyticsProvider: React.FC<{}> = (props) => (
  <>
    {withGTM && <IncludeGtm />}
    {withFbPixel && <IncludeFbPixel />}
    <AnalyticsContext.Provider
      value={{
        trackWithFbPixel: (...args) => {
          if (withFbPixel && typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', ...args);
          } else {
            console.log("Fb Pixel can't can't be tracked because Fb Pixel is not initialized");
          }
        },
        addToGtmDatalayer: (customDatalayer) => {
          if (withGTM && typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push(customDatalayer);
          } else {
            console.log("Datalayer can't be added to GTM because it is not initialized");
          }
        },
      }}
      {...props}
    />
  </>
);

const useAnalytics = () => {
  const value = useContext(AnalyticsContext);
  if (value === undefined) {
    throw new Error('useAnalytics must be used inside a AnalyticsProvider');
  }
  return value;
};

export { AnalyticsProvider, useAnalytics };
