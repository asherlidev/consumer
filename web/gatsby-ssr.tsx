import { GatsbySSR } from 'gatsby';
import React from 'react';
import AppContext from './src/context';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }): any => {
  return <AppContext>{element}</AppContext>;
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }): any => {
  setHeadComponents([
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.js" />,
    <script type="text/javascript" src="https://mapwidget3.seatics.com/Api/framework" />,
    <script type="text/javascript" id="mapWidget" />,
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
                      !function (w, d, t) {
                        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                      
                        ttq.load('${process.env.TIKTOK_PIXEL_ID}');
                        ttq.page(); 
                      }(window, document, 'ttq');
                    `,
      }}
    />,
  ]);
};
