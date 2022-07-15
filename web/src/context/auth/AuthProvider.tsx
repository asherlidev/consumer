import decode from 'jwt-decode';
import { get } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as http from '../../utils/httpClient';
import * as storage from '../../utils/storage';

export interface Geolocation {
  lat?: number;
  lng?: number;
}

export interface AllRegistrationFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gift_code?: string;
  username: string;
  zipcode?: string;
  referredBy?: number;
  personalized_newsletter_optIn?: boolean;
  geolocation?: {
    [key: number]: Geolocation;
  };
  ip_address?: string;
  country_code?: string;
}

type JwtDecoded = {
  id: number;
  iat: number; // seconds
  exp: number; // seconds
};

type AuthResponse = {
  jwt: string;
  user: any;
};

type AuthData = {
  userId: number;
  jwt: string;
  jwtExpiry: number; // seconds
};

type ContextValue = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authData: AuthData | undefined;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; errorMessage: string | undefined }>;
  register: (
    allRegistrationFormValues: AllRegistrationFormValues
  ) => Promise<{ success: boolean; errorMessage: string | undefined }>;
  logout: () => void;
  resetHttpAuthHeader: () => void;
};

const storageKey = 'fp__AuthProvider_authData';

const AuthContext = React.createContext<ContextValue | undefined>(undefined);

const AuthProvider: React.FC<{}> = (props) => {
  const [authData, setAuthData] = useState<AuthData | undefined>(() => {
    const persistedAuthData = storage.loadFromLocalStorage<AuthData>(storageKey);
    updateHttpAuthHeader(persistedAuthData);
    return persistedAuthData;
  });
  const isAuthenticating = useRef(false);

  const updateAuthData = (newAuthData?: AuthData) => {
    storage.saveInLocalStorage(storageKey, newAuthData);
    updateHttpAuthHeader(newAuthData);
    setAuthData(newAuthData);
  };

  const handleAuthFetch = useCallback(async (endpoint: string, options: RequestInit): Promise<{
    success: boolean;
    errorMessage: string | undefined;
  }> => {
    try {
      isAuthenticating.current = true;

      const { promise } = http.customFetch<AuthResponse>(endpoint, options);

      const { jwt } = await promise;

      const { id: userId, exp: jwtExpiry } = decode(jwt) as JwtDecoded;

      const newAuthData: AuthData = {
        userId,
        jwt,
        jwtExpiry,
      };

      isAuthenticating.current = false;

      updateAuthData(newAuthData);

      return { success: newAuthData != null, errorMessage: undefined };
    } catch (e) {
      isAuthenticating.current = false;

      return { success: false, errorMessage: get(e, 'errorData.message[0].messages[0].message') };
    }
  }, []);

  const login = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ success: boolean; errorMessage: string | undefined }> =>
      handleAuthFetch(`${process.env.GATSBY_STRAPI_API_URL}/auth/local`, {
        method: 'POST',
        body: http.json({
          identifier: email,
          password,
        }),
      }),
    [handleAuthFetch]
  );

  const register = useCallback(
    async (
      allRegistrationFormValues: AllRegistrationFormValues
    ): Promise<{ success: boolean; errorMessage: string | undefined }> =>
      handleAuthFetch(`${process.env.GATSBY_STRAPI_API_URL}/auth/local/register`, {
        method: 'POST',
        body: http.json(allRegistrationFormValues),
      }),
    [handleAuthFetch]
  );

  const logout = useCallback(() => {
    if (authData != null) {
      updateAuthData();
    }
  }, [authData]);

  const refreshJwt = useCallback(() => {
    isAuthenticating.current = true;

    try {
      if (authData != null) {
        logout(); // Temporary instead of what's below

        // TODO: implement backend endpoint: https://www.youtube.com/watch?v=0hAmccuaK5Q
        // const newAuthData = await requestNewToken();
        // updateAuthData(newAuthData);
      }
    } catch (e) {
      logout();
      throw e;
    } finally {
      isAuthenticating.current = false;
    }
  }, [authData, logout]);

  // this effect is responsible for refreshing the jwt before it expires
  useEffect(() => {
    let timer: number;

    if (authData != null) {
      const millisecondsToExpiry = authData.jwtExpiry * 1000 - Date.now();
      const millisecondsToRefresh = millisecondsToExpiry - 30000;

      // The setTimeout delay is a 32 bit integer, so the callback runs immediately if the delay overflows 24.855 days.
      var maxAllowedSetTimeoutDelay = Math.pow(2, 31) - 1;

      if (millisecondsToRefresh <= 0) {
        refreshJwt();
      } else if (millisecondsToRefresh < maxAllowedSetTimeoutDelay) {
        timer = setTimeout(() => {
          refreshJwt();
        }, millisecondsToRefresh);
      }
    }

    return () => {
      if (timer != null) {
        clearTimeout(timer);
      }
    };
  }, [authData, refreshJwt]);

  // Listen to changes in local storage in order to adapt to actions from other browser tabs
  useEffect(() => {
    const handleChange = () => {
      updateAuthData(storage.loadFromLocalStorage(storageKey));
    };
    window.addEventListener('storage', handleChange, false);
    return () => {
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  const resetHttpAuthHeader = useCallback(() => {
    updateHttpAuthHeader(authData);
  }, [authData]);

  const isAuthenticated = authData != null;
  const value = useMemo(
    () => ({
      isAuthenticated,
      isAuthenticating: isAuthenticating.current,
      authData: isAuthenticated ? authData : undefined,
      login,
      register,
      logout,
      resetHttpAuthHeader,
    }),
    [authData, isAuthenticated, isAuthenticating, login, register, logout, resetHttpAuthHeader]
  );

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = (): ContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };

//
// Utils
//

const updateHttpAuthHeader = (authData: AuthData | undefined) => {
  if (authData != null) {
    http.setDefaultHeader('Authorization', `Bearer ${authData.jwt}`);
  } else {
    http.clearDefaultHeader('Authorization');
  }
};
