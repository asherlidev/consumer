import React from 'react';
import SvgIcon from './SvgIcon';

const CallMissedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19.59 7L12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9z" />
  </SvgIcon>
);

export default CallMissedIcon;
