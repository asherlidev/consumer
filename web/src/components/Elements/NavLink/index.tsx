import { GatsbyLinkProps, Link } from 'gatsby';
import React from 'react';

const NavLink: React.FC<GatsbyLinkProps<any>> = (props) => (
  <Link activeClassName="active" partiallyActive={true} {...props} />
);

export default NavLink;
