import { combineReducers } from 'redux';

const defaultState = {
  words: {
    currentSession: [],
    graduatedWords: [],
    loading: false,
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
  const { type, data } = action;
  switch (type) {
    case 'GET_USER_DETAILS_PENDING':
      return {
        ...state,
        loading: true,
      };
    case 'GET_USER_DETAILS_SUCCESS':
      return {
        ...state,
        user: data,
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

const words = (state = defaultState.words, action) => {
  const { type, data, word } = action;
  switch (type) {
    case 'GET_SESSION_PENDING':
      return {
        ...state,
        loading: true,
      };
    case 'GET_SESSION_SUCCESS':
      return {
        ...state, currentSession: data, loading: false,
      };
    case 'GET_SESSION_FAILURE':
      return {
        ...state, loading: false,
      };
    case 'GRADUATE_WORD':
      return {
        ...state,
        graduatedWords: state.graduatedWords.concat(word),
        currentSession: state.currentSession.filter(card => card.cardId !== word.cardId),
      };
    case 'MOVE_TO_THE_BACK': {
      return {
        ...state,
        currentSession: [...state.currentSession.slice(1), state.currentSession[0]],
      };
    }
    case 'UPDATE_CARD_PENDING': {
      return state;
    }
    default:
      return state;
  }
};

const appState = (state = defaultState.appState, { type, data }) => {
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
