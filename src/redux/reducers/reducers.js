import { combineReducers } from 'redux';

const initial = {
  words: {
    currentSession: {},
  },
  appState: {
    options: {
      voiceInput: false,
    },
    events: {
      unmountingInputMethod: false,
    },
  },
  userDetails: {
    loading: false,
    user: 'anonymous',
  },
};

const userDetails = (state = { user: {}, loading: false }, action) => {
  const { type, result } = action;
  switch (type) {
    case 'GET_USER_DETAILS_PENDING':
      return {
        ...state,
        loading: true,
      };
    case 'GET_USER_DETAILS_SUCCESS':
      return {
        ...state,
        user: { ...result },
        loading: false,
      };
    case 'GET_USER_DETAILS_FAILURE':
      return {
        ...state, loading: false,
      };
    default:
      return state;
  }
};

const words = (state = initial.words, { type, words }) => {
  switch (type) {
    case 'GET_SESSION_PENDING':
      return {
        ...state,
        loading: true,
      };
    case 'GET_SESSION_SUCCESS':
      return {
        ...state, words, loading: false,
      };
    case 'GET_SESSION_FAILURE':
      return {
        ...state, loading: false,
      };
    default:
      return state;
  }
};

const appState = (state = initial.appState, { type, data }) => {
  switch (type) {
    case 'TOGGLE_VOICE':
      return {
        ...state, options: { voiceInput: !state.options.voiceInput },
      };
    case 'TRIGGER_UNMOUNT_ANIMATION':
      return {
        ...state, events: { unmountingInputMethod: data.unmountingInputMethod },
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  userDetails,
  words,
  appState,
});

export default reducers;
