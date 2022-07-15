import React from 'react';
import SvgIcon from './SvgIcon';

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
  </SvgIcon>
);

export default PlayIcon;
