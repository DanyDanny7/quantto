import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducers';

const persistConfig = {
  key: 'quanto',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store)




// export default store;




// import { createStore } from 'redux'

// import rootReducer from './reducers'



