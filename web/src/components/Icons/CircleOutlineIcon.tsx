import React from 'react';
import SvgIcon from './SvgIcon';

interface Props extends React.SVGProps<SVGSVGElement> {
  r?: number;
  stroke?: string;
}

const CircleOutlineIcon: React.FC<Props> = ({ r = 50, stroke = 1, ...otherProps }) => (
  <SvgIcon viewBox={`0 0 ${r * 2} ${r * 2}`} fill="none" {...otherProps}>
    <circle cx={r} cy={r} r={r} stroke="currentColor" strokeWidth={stroke} fill="none" />
  </SvgIcon>
);

export default CircleOutlineIcon;
