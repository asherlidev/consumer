import { GatsbyBrowser } from 'gatsby';
import React from 'react';
import AppContext from './src/context';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return <AppContext>{element}</AppContext>;
};

export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import('intersection-observer');
    console.log(`# IntersectionObserver is polyfilled!`);
  }
  (function () {
    var a = document.createElement('script');
    (a.type = 'text/javascript'),
      (a.src = 'https://global.ketchcdn.com/web/v1/config/festivalpass/festpassweb/boot.js'),
      (a.defer = a.async = !0),
      document.getElementsByTagName('head')[0].appendChild(a),
      (window.semaphore = window.semaphore || []);
  })();

  // DEV Note: Add third party tracking tags here as a backup if React Helmet causes bugs
};

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = () => {
  ttq.track('ViewContent');
};
