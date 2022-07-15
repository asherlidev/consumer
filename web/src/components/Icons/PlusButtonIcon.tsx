import React from 'react';
import SvgIcon from './SvgIcon';

const PlusButtonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
  </SvgIcon>
);

export default PlusButtonIcon;
