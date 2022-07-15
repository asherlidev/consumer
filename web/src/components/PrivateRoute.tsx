import { Redirect, RouteComponentProps, useLocation } from '@reach/router';
import { stringifyUrl } from 'query-string';
import React, { ComponentType } from 'react';
import { useAuth } from '../context/auth';
import { useUser } from '../context/user';
import { User } from '../context/user/UserProvider';
import { CenteredLoading } from './Elements';

export interface PrivateRouteProps extends RouteComponentProps {
  user: User;
}

interface Props extends RouteComponentProps {
  component: ComponentType<PrivateRouteProps>;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...otherProps }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { user } = useUser();

  if (!isAuthenticated) {
    return (
      <Redirect
        noThrow
        to={stringifyUrl({ url: '/login', query: { from: location.pathname + location.search } })}
      />
    );
  }

  return user ? <Component user={user} {...otherProps} /> : <CenteredLoading />;
};

export default PrivateRoute;
