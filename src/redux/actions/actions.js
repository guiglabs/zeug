export const getUserDetails = () => ({
  type: 'GET_USER_DETAILS',
});

export const toggleVoice = () => ({
  type: 'TOGGLE_VOICE',
});

export const shouldAnimateUnmount = (unmountingInputMethod) => {
  if (typeof (unmountingInputMethod) !== 'boolean') throw new Error('unmountingInputMethod should be a boolean');
  return {
    type: 'TRIGGER_UNMOUNT_ANIMATION',
    data: { unmountingInputMethod },
  };
};
