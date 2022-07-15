import React from 'react';
import SvgIcon from './SvgIcon';

const StopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path d="M18,18H6V6H18V18Z" />
  </SvgIcon>
);

export default StopIcon;
