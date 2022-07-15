import React, { useEffect } from 'react';

interface Props {}

const ScrollToTop: React.FC<Props> = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
};

export default ScrollToTop;
