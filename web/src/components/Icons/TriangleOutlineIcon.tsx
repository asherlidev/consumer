import React from 'react';
import SvgIcon from './SvgIcon';

const TriangleOutlineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon viewBox="0 0 59 60" {...props}>
    <path
      d="M12.2916 2.80665C13.0708 1.52651 14.9292 1.52651 15.7084 2.80665L26.1496 19.9601C26.9609 21.2929 26.0015 23 24.4412 23H3.55877C1.99848 23 1.03911 21.2929 1.85037 19.9601L12.2916 2.80665Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </SvgIcon>
);

export default TriangleOutlineIcon;
