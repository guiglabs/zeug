const BASE_URL = 'http://localhost:3001';

const api = store => next => (action) => {
  const { call } = action;
  if (!call) return next(action);
  const defaultHeaders = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  };

  const state = store.getState();
  if (state.authentication && state.authentication.accessToken) {
    defaultHeaders.Authorization = `Bearer ${state.authentication.accessToken}`;
  }

  // THE FETCH
  next({
    type: `${action.type}_PENDING`,
  });

  fetch(`${BASE_URL}/${call.url}`, {
    method: call.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...action.headers,
    },
  })
    .then(response => response.json())
    .then((result) => {
      store.dispatch({
        type: `${action.type}_SUCCESS`,
        result,
      });
    })
    .catch(error => store.dispatch({
      type: `${action.type}_FAILURE`,
      error,
    }));
};

// ACTION PROTOTYPE
// {
//   type: 'GET_JOKE',
//   api: {
//     url: '/jokes/random',
//     method: 'GET',
//     headers: {
//        …
//     }
//   }
// }

export default api;
