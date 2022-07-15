import { getAsyncActionTypes } from '../utils';

export const TYPE_SET_USER = getAsyncActionTypes('SET_USER');
export const TYPE_SET_TOKEN = getAsyncActionTypes('SET_TOKEN');
export const TYPE_SET_LOADING = getAsyncActionTypes('SET_LOADING');
export const TYPE_SET_FACEBOOK = getAsyncActionTypes('SET_FACEBOOK');

export const setUserRequest = (user) => ({
  type: TYPE_SET_USER.REQUEST,
  payload: { user },
});

export const setTokenRequest = (token) => ({
  type: TYPE_SET_TOKEN.REQUEST,
  payload: { token },
});

export const setLoadingRequest = (loading) => ({
  type: TYPE_SET_LOADING.REQUEST,
  payload: { loading },
});

export const setFacebookRequest = (facebook) => ({
  type: TYPE_SET_FACEBOOK.REQUEST,
  payload: { facebook },
});
