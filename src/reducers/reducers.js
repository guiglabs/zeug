import { combineReducers } from 'redux';

const initial = {
  words: {
    currentSession: {},
  },
  appState: {
    options: {
      voiceInput: false
    },
    events: {
      unmountingInputMethod: false
    }
  }
};

const words = (state = initial.words, {type, words}) => {
  switch (type) {
  case 'GET_CURRENT_SESSION':
    return Object.assign({}, state, {words});
  default:
    return state;
  }
};

const appState = (state = initial.appState, {type, data}) => {
  switch (type) {
  case 'TOGGLE_VOICE':
  console.log('toggling voice', !state.options.voiceInput);
    return {
      ...state, options: {voiceInput: !state.options.voiceInput},
    };
  case 'TRIGGER_UNMOUNT_ANIMATION':
  console.log('triggering animation', data.unmountingInputMethod);
    return {
      ...state, events: {unmountingInputMethod: data.unmountingInputMethod},
    };
  default:
    return state;
  }
};

const reducers = combineReducers({
  words,
  appState,
});

export default reducers;
