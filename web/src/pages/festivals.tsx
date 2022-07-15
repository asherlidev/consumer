import { Redirect } from '@reach/router';
import { PageProps } from 'gatsby';
import React from 'react';

const Page: React.FC<PageProps> = () => <Redirect noThrow replace from="/festivals" to="/events" />;

export default Page;
