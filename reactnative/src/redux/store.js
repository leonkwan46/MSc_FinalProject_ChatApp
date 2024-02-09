import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
import storage from 'redux-persist/lib/storage/session'
import { createTransform, persistReducer, persistStore } from 'redux-persist'
import sessionSlice from './reducer/sessionSlice'

// Define a transform
const subsetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // Return the state slice or null if not found
    return inboundState && inboundState.session.user ? inboundState.session.user : null;
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // Return state with rehydrated slice
    return { ...outboundState, user: outboundState };
  },
  // define which reducers this transform gets called for.
  { whitelist: ['sessionSlice'] }
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [subsetTransform],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)
export default store