const api = store => next => (action) => {
  const { apiCall } = action;
  if (!apiCall) return next(action);

  const defaultHeaders = {
    Accept: 'application/json',
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

  fetch(`http://localhost:3000/${apiCall.url}`, {
    method: apiCall.method || 'GET',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      ...defaultHeaders,
      ...action.headers,
    },
  })
    .then(r => r.json())
    .then((data) => {
      console.log('hahahaha so funny', data);
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
