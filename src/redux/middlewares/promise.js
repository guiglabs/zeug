export const promiseAction = (promise, type) => {
  promise.type = type;
  return promise;
};

export const promiseMiddleware = store => next => (action) => {
  const isPromise = typeof action.then === 'function';
  if (!isPromise) return next(action);

  next({
    type: `${action.type}_PENDING`,
  });

  setTimeout(() => {
    action
      .then((result) => {
        store.dispatch({
          type: `${action.type}_SUCCESS`,
          result,
        });
      })
      .catch((error) => {
        store.dispatch({
          type: `${action.type}_FAILURE`,
          error,
        });
      });
  }, 2000);
};
