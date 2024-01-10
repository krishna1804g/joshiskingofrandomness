import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'
import utilsSlice from "./slices/utilsSlice";


const persistConfig = {
    key: 'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        persistedReducer,
        utils: utilsSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store)
