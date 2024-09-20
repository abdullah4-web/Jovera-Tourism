import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// Persist Configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

// Combine All Reducers
const rootReducer = combineReducers({
    userLogin: loginSlice,
    // Add other slices here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    // Add middleware and devTools if needed
});

export const persistor = persistStore(store);
export default store;