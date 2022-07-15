import { useEffect } from 'react';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { getTime } from 'date-fns';

import { useUser } from '../context/user';

export const useIntercomLauncher = () => {
  const { user } = useUser();
  const breakpoints = useBreakpoint();

  useEffect(() => {
    if (window && window.Intercom) {
      const userInfo = user
        ? {
            user_id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            created_at: getTime(new Date(user.created_at)),
          }
        : {};

      window.Intercom('update', {
        custom_launcher_selector: '#intercom-navbar-launcher',
        hide_default_launcher: breakpoints.xsDown ? true : false,
        vertical_padding: breakpoints.smDown ? 75 : 20,
        ...userInfo,
      });
    }
  }, [breakpoints, user]);
};
