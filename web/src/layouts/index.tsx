import React from 'react';

import Navbar from '../components/Layout/Navbar';
import { useIntercomLauncher } from '../utils/intercom';
import { SEO } from '../components/Elements';
import '../../assets/css/style.css';

const Layout: React.FC = ({ children }) => {
  useIntercomLauncher();

  return (
    <>
      <SEO />
      {children}
      <Navbar />
    </>
  );
};

export default Layout;
