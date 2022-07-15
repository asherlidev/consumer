import React from 'react';
import SvgIcon from './SvgIcon';

const ArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon
    width="16"
    height="9"
    viewBox="0 0 16 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 8L8 1L15 8"
      stroke="#091D2C"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </SvgIcon>
);

export default ArrowDownIcon;
