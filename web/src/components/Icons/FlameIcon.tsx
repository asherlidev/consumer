import React from 'react';
import SvgIcon from './SvgIcon';

const FlameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon viewBox="0 0 384 512" {...props}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill="#FFFFFF" fillRule="nonzero">
        <path
          d="M382.906,299.769 C377.041,223.41 341.489,175.559 310.125,133.333 C281.083,94.241 256,60.483 256,10.685 C256,6.685 253.76,3.029 250.208,1.196 C246.645,-0.648 242.364,-0.346 239.125,2.008 C192.021,35.714 152.719,92.523 138.99,146.727 C129.459,184.464 128.198,226.888 128.021,254.907 C84.521,245.616 74.667,180.548 74.563,179.839 C74.073,176.464 72.011,173.527 69.011,171.923 C65.98,170.34 62.417,170.225 59.344,171.746 C57.063,172.85 3.354,200.14 0.229,309.101 C0.01,312.726 0,316.362 0,319.997 C0,425.854 86.135,511.984 192,511.984 C192.146,511.994 192.302,512.015 192.427,511.984 C192.469,511.984 192.51,511.984 192.562,511.984 C298.167,511.681 384,425.667 384,319.997 C384,314.674 382.906,299.769 382.906,299.769 Z M192,490.652 C156.708,490.652 128,460.071 128,422.48 C128,421.199 127.99,419.907 128.083,418.324 C128.51,402.471 131.521,391.649 134.823,384.451 C141.011,397.742 152.073,409.96 170.042,409.96 C175.938,409.96 180.709,405.189 180.709,399.294 C180.709,384.108 181.022,366.588 184.803,350.776 C188.168,336.756 196.209,321.84 206.397,309.883 C210.928,325.403 219.762,337.964 228.387,350.224 C240.731,367.764 253.491,385.899 255.731,416.824 C255.866,418.657 256.002,420.501 256.002,422.48 C256,460.07 227.292,490.652 192,490.652 Z"
          id="Shape"
        ></path>
      </g>
    </g>
  </SvgIcon>
);

export default FlameIcon;
