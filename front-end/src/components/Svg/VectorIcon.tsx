import React from 'react';
import { memo, SVGProps } from 'react';

const VectorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="30" height="37" viewBox="0 0 30 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path id="Vector" d="M6.80491 6.3082L27.925 9.31716M12.1772 1.68639L24.0572 3.37894M5.39267 11.4942L27.8327 14.6912C28.5618 14.7951 29.0405 15.6673 28.902 16.6393L26.3945 34.2393C26.256 35.2114 25.5528 35.9151 24.8238 35.8113L2.38371 32.6143C1.65469 32.5104 1.17597 31.6382 1.31445 30.6662L3.82192 13.0661C3.9604 12.0941 4.66365 11.3903 5.39267 11.4942Z" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>


);
const Memo = memo(VectorIcon);
export { Memo as VectorIcon };
