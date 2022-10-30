import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducers';

const store = configureStore({
    reducer: {
      todos: rootReducer,
    }
  })


export default store;
