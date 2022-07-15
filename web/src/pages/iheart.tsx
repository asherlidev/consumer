import { Redirect } from '@reach/router';
import { PageProps } from 'gatsby';
import React from 'react';

const Page: React.FC<PageProps> = () => (
  <Redirect noThrow replace from="/iheart" to="/outbound/PT-b5zZ98eT_HjNBDAZCE" />
);

export default Page;
