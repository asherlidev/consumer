import { stringifyUrl } from 'query-string';
import { useEffect } from 'react';

const IncludeGtm = () => {
  useEffect(() => {
    if (process.env.GATSBY_GTM_ID && window && document && !window.dataLayer) {
      window.dataLayer = [{ 'gtm.start': new Date().getTime(), event: 'gtm.js' }];

      const query = { id: process.env.GATSBY_GTM_ID };
      if (process.env.GATSBY_GTM_AUTH && process.env.GATSBY_GTM_PREVIEW) {
        query.gtm_auth = process.env.GATSBY_GTM_AUTH;
        query.gtm_preview = process.env.GATSBY_GTM_PREVIEW;
        query.gtm_cookies_win = 'x';
      }

      const gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.src = stringifyUrl({ url: 'https://www.googletagmanager.com/gtm.js', query });

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(gtmScript, firstScript);
    }
  }, []);

  return null;
};

export default IncludeGtm;
