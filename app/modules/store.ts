"use client"

import { combineReducers } from "@reduxjs/toolkit"
import { createStore } from 'redux'
import counterReducer from './slice'
import storage from "./storage"
import {persistReducer, persistStore} from "redux-persist"

const rootReducer = combineReducers({
  counter: counterReducer,
})

const persistConfig = { 
  key: "root",
  storage,
}

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);