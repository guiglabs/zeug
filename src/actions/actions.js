export const getCurrentSession = (words) => {
  return {
    type: 'GET_CURRENT_SESSION',
    words
  };
};

export const toggleVoice = () => {
  return {
    type: 'TOGGLE_VOICE'
  };
};

export const shouldAnimateUnmount = (unmountingInputMethod) => {
  if (typeof(unmountingInputMethod) !== 'boolean') throw new Error('unmountingInputMethod should be a boolean');
  return {
    type: 'TRIGGER_UNMOUNT_ANIMATION',
    data: {unmountingInputMethod}
  };
};
