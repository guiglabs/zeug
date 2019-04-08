const BASE_URL = 'http://localhost:3001';
// console.log('hi');

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

  next({
    type: `${action.type}_PENDING`,
  });

  fetch(`${BASE_URL}/${call.url}`, {
    method: call.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...action.headers,
    },
    body: call.body,
  })
    .then(response => response.json())
    .then((data) => {
      store.dispatch({
        type: `${action.type}_SUCCESS`,
        data,
      });
    })
    .catch(error => store.dispatch({
      type: `${action.type}_FAILURE`,
      error,
    }));
};

export default api;
