import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, AnyAction } from "redux";
import loginReducer, { LoginState } from "./login";
import count from './kit'
const rootReduce = combineReducers<{
    loginReducer: LoginState;
    count: number;
}, AnyAction>({
    loginReducer,
    count
});

const store = configureStore({
    reducer: rootReduce
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;