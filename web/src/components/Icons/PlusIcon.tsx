import React from 'react';
import SvgIcon from './SvgIcon';

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon viewBox="0 0 33 33" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.64703 7.58498L13.1373 4.41517L17.5524 12.0623L25.1997 7.64718L28.3695 13.1375L20.7222 17.5526L25.1373 25.1998L19.647 28.3696L15.2319 20.7224L7.58491 25.1375L4.4151 19.6472L12.0621 15.2322L7.64703 7.58498Z"
      fill="currentColor"
    />
  </SvgIcon>
);

export default PlusIcon;
