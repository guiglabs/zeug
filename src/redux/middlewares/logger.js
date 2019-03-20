/* eslint-disable no-console */
const logger = store => next => (action) => {
  console.log('previous state', store.getState());
  console.log(action);

  next(action);
  console.log('current state', store.getState());
  console.log('===========');
};

export default logger;
