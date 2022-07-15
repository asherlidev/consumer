import * as actions from '../actions/user.action';

const initialState = {
  user: {},
  token: false,
  facebook: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.TYPE_SET_USER.REQUEST:
      return {
        ...state,
        user: action.payload.user,
      };
    case actions.TYPE_SET_TOKEN.REQUEST:
      return {
        ...state,
        token: action.payload.token,
      };
    case actions.TYPE_SET_LOADING.REQUEST:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case actions.TYPE_SET_FACEBOOK.REQUEST:
      return {
        ...state,
        facebook: action.payload.facebook,
      };
    default:
      return state;
  }
};
