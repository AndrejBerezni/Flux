import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './authentication'
import modalReducer from './modal'
import vehicleRentReducer from './vehicleRent'
import vehicleSearchReducer from './vehicleSearch'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authentication'],
}

const reducers = combineReducers({
  authentication: authReducer,
  modal: modalReducer,
  vehicleSearch: vehicleSearchReducer,
  vehicleRent: vehicleRentReducer,
})

const persistedReducers = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  devTools: true,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
