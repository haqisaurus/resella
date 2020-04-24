import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from 'redux';
import { accountReducer } from './accountReducer';
import { storeReducer } from './storeReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['account']
};

const rootReducer = combineReducers({
    account: accountReducer,
    store: storeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
export { store, persistor };
