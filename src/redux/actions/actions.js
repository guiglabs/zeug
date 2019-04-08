export const getUserDetails = () => ({
  type: 'GET_USER_DETAILS',
});

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTU1Mjg0MDQ0NSwiZXhwIjoxNTg0Mzc2NDQ1fQ.GurD54Myontk9eb7nk7AKwIh2p2xXsX0I-92w4YpORg';

export const getSession = () => ({
  type: 'GET_SESSION',
  call: {
    url: 'cards',
  },
  headers: {
    Authorization: TOKEN,
  },
});

export const updateCard = card => ({
  type: 'UPDATE_CARD',
  call: {
    url: `cards/${card.id}/answer`,
    method: 'PUT',
    body: JSON.stringify(card),
  },
  headers: {
    Authorization: TOKEN,
  },
});

export const moveToTheBack = word => ({
  type: 'MOVE_TO_THE_BACK',
  word,
});

export const graduateWord = word => ({
  type: 'GRADUATE_WORD',
  word,
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
