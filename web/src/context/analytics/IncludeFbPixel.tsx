import { useEffect } from 'react';

const IncludeFbPixel = () => {
  useEffect(() => {
    if (process.env.GATSBY_FACEBOOK_PIXEL_ID && window && document && !window.fbq) {
      const fbq = (window.fbq = function () {
        fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
      });

      if (!window._fbq) {
        window._fbq = fbq;
      }

      fbq.push = fbq;
      fbq.loaded = !0;
      fbq.version = '2.0';
      fbq.queue = [];

      const fbPixelScript = document.createElement('script');
      fbPixelScript.async = true;
      fbPixelScript.src = 'https://connect.facebook.net/en_US/fbevents.js';

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(fbPixelScript, firstScript);

      fbq('init', process.env.GATSBY_FACEBOOK_PIXEL_ID);
      fbq('track', 'PageView');
    }
  }, []);

  return null;
};

export default IncludeFbPixel;
